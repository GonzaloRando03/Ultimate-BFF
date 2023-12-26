import { Component } from '@angular/core';
import { getObjectFromObjectCell, getObjectFromParams } from 'src/app/shared/utils/codeFormater';
import { EndpointGenerico, EndpointPantalla } from '../../models/endpoint.model';
import { ToastService } from '../../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointsService } from '../../services/endpoints.service';
import { UserService } from '../../services/user.service';
import { ProyectoService } from '../../services/proyecto.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-p010-ver-pantalla',
  templateUrl: './p010-ver-pantalla.component.html',
  styleUrls: ['./p010-ver-pantalla.component.scss']
})
export class P010VerPantallaComponent {
  idProyecto:string = ''
  idEndpoint:string = ''
  loading:boolean = true
  usuario:Usuario | null = null
  endpoint!:EndpointPantalla
  generico!:EndpointGenerico
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
      await this.endpointService.obtenerEndpointPantallaPorId(this.idEndpoint) as EndpointPantalla

    this.generico = 
      await this.endpointService.obtenerEndpointGenericoPorId(this.endpoint.idEndpointGenerico) as EndpointGenerico

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
      await this.endpointService.eliminarEndpointPantalla(this.idEndpoint)
      this.router.navigate(['/proyecto/' + this.idProyecto])
      this.toast.success('Endpoint eliminado', 'El endpoint se ha eliminado con éxito')
      
    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al eliminar el endpoint')
    }
  }
}
