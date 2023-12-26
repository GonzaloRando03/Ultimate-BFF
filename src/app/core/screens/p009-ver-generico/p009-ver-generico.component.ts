import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { UserService } from '../../services/user.service';
import { EndpointsService } from '../../services/endpoints.service';
import { EndpointGenerico } from '../../models/endpoint.model';
import { ToastService } from '../../services/toast.service';
import { getObjectFromObjectCell, getObjectFromParams } from 'src/app/shared/utils/codeFormater';

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
}
