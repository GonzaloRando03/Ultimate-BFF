import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { UserService } from '../../services/user.service';
import { EndpointsService } from '../../services/endpoints.service';
import { EndpointGenerico } from '../../models/endpoint.model';
import { ToastService } from '../../services/toast.service';
import { getObjectFromObjectCell, getObjectFromParams } from 'src/app/shared/utils/codeFormater';
import { generarGenericoToPDF } from 'src/app/shared/utils/pdf/pdfGenerator';
import { generarCSV } from 'src/app/shared/utils/csvGenerator';

@Component({
  selector: 'app-p009-ver-generico',
  templateUrl: './p009-ver-generico.component.html',
  styleUrls: ['./p009-ver-generico.component.scss']
})
export class P009VerGenericoComponent implements OnInit{
  idProyecto:string = ''
  idEndpoint:string = ''
  loading:boolean = true
  usuario:Usuario | null = null
  endpoint!:EndpointGenerico
  mostrarEliminar:boolean = false

  constructor(
    private aRouter:ActivatedRoute,
    private proyectoService:ProyectoService,
    private usuarioService:UserService,
    private endpointService:EndpointsService,
    private router:Router,
    private toast:ToastService
  ){}

  async ngOnInit(): Promise<void> {
    this.idEndpoint = this.aRouter.snapshot.params['id']
    this.usuario = this.usuarioService.getUserValue()

    this.endpoint = 
      await this.endpointService.obtenerEndpointGenericoPorId(this.idEndpoint) as EndpointGenerico

    this.idProyecto = this.endpoint.idProyecto

    const permisos = 
      await this.proyectoService.getPermisosProyecto(this.usuario!.uid, this.idProyecto)

    if (!permisos){
      this.toast.warning('Sin permisos', 'No tienes permisos para acceder a este proyecto')
      this.router.navigate(['/'])
    }

    this.loading = false
  }

  getObjectCode(obj:any){
    const objectFormated = getObjectFromObjectCell(obj)
    return JSON.stringify(objectFormated, null, 2);
  }

  getParamCode(obj:any){
    const objectFormated = getObjectFromParams(obj)
    return JSON.stringify(objectFormated, null, 2);
  }

  async eliminarEndpoint(){
    try {
      await this.endpointService.eliminarEndpointGenerico(this.idEndpoint)
      this.router.navigate(['/proyecto/' + this.idProyecto])
      this.toast.success('Endpoint eliminado', 'El endpoint se ha eliminado con éxito')
      
    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al eliminar el endpoint')
    }
  }

  getRevisar(){
    const revision = this.endpoint.revisores?.find(r => r.uid === this.usuario!.uid)
    return revision && !revision.revisado
  }

  async revisarEndpoint(){
    await this.endpointService.revisarEndpointGenerico(this.idEndpoint, this.usuario!.uid)
  }

  async descargarPDF(){
    await generarGenericoToPDF(this.endpoint)
  }

  async descargarTareas(){
    const tareas = []
    tareas.push({
      asunto: 'Creación BFF ' + this.endpoint.nombre,
      descripcion: 'Creación del BFF para el endpoint ' + this.endpoint.nombre,
      asignado: '',
    }) 

    tareas.push({
      asunto: 'Desarrollo ' + this.endpoint.nombre,
      descripcion: 'Desarrollo del endpoint genérico ' + this.endpoint.nombre,
      asignado: '',
    })

    if (this.endpoint.revisores) {
      const revisionesPromise = this.endpoint.revisores.map(async r => {
        const usuario = await this.usuarioService.obtenerUsuarioPorId(r.uid)
        tareas.push({
          asunto: 'Validación BFF endpoint ' + this.endpoint.nombre +  ' - ' + this.usuario?.nombre,
          descripcion: 'Validación del documento BFF del endpoint genérico ' + this.endpoint.nombre,
          asignado: usuario.nombre + ' ' + usuario.apellidos,
        })
      })
      await Promise.all(revisionesPromise)
    }

    generarCSV('Tareas_' + this.endpoint.nombre, tareas)
  }
}
