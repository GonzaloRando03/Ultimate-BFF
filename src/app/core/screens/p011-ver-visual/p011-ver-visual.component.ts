import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { ComponenteVisual, EndpointPantalla } from '../../models/endpoint.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { UserService } from '../../services/user.service';
import { EndpointsService } from '../../services/endpoints.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-p011-ver-visual',
  templateUrl: './p011-ver-visual.component.html',
  styleUrls: ['./p011-ver-visual.component.scss']
})
export class P011VerVisualComponent {
  idProyecto:string = ''
  idVisual:string = ''
  loading:boolean = true
  usuario:Usuario | null = null
  endpoints:EndpointPantalla[] = []
  visual!:ComponenteVisual
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
    this.idVisual = this.aRouter.snapshot.params['id']
    this.usuario = this.usuarioService.getUserValue()

    this.visual = 
      await this.endpointService.obtenerVisualPorId(this.idVisual) as ComponenteVisual

    const endpointsPromise = this.visual.componentes.map(async c => 
      c.llamadas.map(async l => {
        this.endpoints.push( await this.endpointService
            .obtenerEndpointPantallaPorId(l.idEndpoint) as EndpointPantalla)
      })
    )

    await Promise.all(endpointsPromise)

    this.idProyecto = this.visual.idProyecto

    const permisos = 
      await this.proyectoService.getPermisosProyecto(this.usuario!.uid, this.idProyecto)

    if (!permisos){
      this.toast.warning('Sin permisos', 'No tienes permisos para acceder a este proyecto')
      this.router.navigate(['/'])
    }

    this.loading = false
  }



  async eliminarEndpoint(){
    try {
      await this.endpointService.eliminarVisualPantalla(this.idVisual)
      this.router.navigate(['/proyecto/' + this.idProyecto])
      this.toast.success('Componente visual eliminado', 'El componente visual se ha eliminado con éxito')
      
    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al eliminar el componente')
    }
  }

  obtenerEndpointLlamada(id:string){
    return this.endpoints.find(e => e.id === id)
  }
}
