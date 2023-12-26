import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';
import { EndpointsService } from '../../services/endpoints.service';
import { EndpointGenerico, EndpointPantalla } from '../../models/endpoint.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-p005-proyecto',
  templateUrl: './p005-proyecto.component.html',
  styleUrls: ['./p005-proyecto.component.scss']
})
export class P005ProyectoComponent implements OnInit{
  idProyecto:string = ''
  proyecto:Proyecto | null = null
  usuario!:Usuario 
  genericos:EndpointGenerico[] = []
  pantallas:EndpointPantalla[] = []
  mostrarParticipantes:boolean = false
  participantes:Usuario[] = []
  participantesForm:FormGroup

  constructor(
    private aRouter:ActivatedRoute,
    private proyectoService:ProyectoService,
    private toast:ToastService,
    private usuarioService:UserService,
    private endpointService:EndpointsService,
    private fb:FormBuilder
  ){
    this.usuario = this.usuarioService.getUserValue() as Usuario
    this.participantesForm = this.fb.group({
      mail: ['', Validators.required]
    })
  }

  async ngOnInit(): Promise<void> {
    this.idProyecto = this.aRouter.snapshot.params['id']
    this.proyecto = await this.proyectoService.obtenerProyectoPorId(this.idProyecto) as Proyecto

    await Promise.all([
      this.getProyecto(),
      this.getEndpoints()
    ])

    const usuariosPromise = this.proyecto.usuarios.map(u => 
      this.usuarioService.obtenerUsuarioPorId(u)
    )

    this.participantes = await Promise.all(usuariosPromise)
  }

  async getProyecto(){
    const proyecto = await this.proyectoService.obtenerProyectoPorId(this.idProyecto)

    if (proyecto === null){
      this.toast.error('Error al obtener el proyecto', 'Ha ocurrido un error inesperado al obtener el proyecto')
      return
    }

    if (!proyecto.usuarios.includes(this.usuario.uid)){
      this.toast.warning('Sin permisos', 'No tienes permisos para acceder a este proyecto')
      return
    }

    this.proyecto = proyecto
  }

  async getEndpoints(){
    this.genericos = await this.endpointService
      .obtenerGenericosProyecto(this.idProyecto) as EndpointGenerico[]
    this.pantallas = await this.endpointService
      .obtenerPantallasProyecto(this.idProyecto) as EndpointPantalla[]
  }

  getGenericoDropDown(){
    return this.genericos.map(g => {
      return {
        titulo: g.metodo + ' - ' +g.nombre,
        hasLink:  true,
        link: '/generico/' + g.id
      }
    })
  }

  getPantallaDropDown(){
    return this.pantallas.map(p => {
      return {
        titulo: p.metodo + ' - ' + p.nombre,
        hasLink:  true,
        link: '/pantalla/' + p.id
      }
    })
  }

  async aniadirUsuario(){
    try {
      if (!this.participantesForm.valid){
        this.toast.info('Email no introducido', 'No has introducido un Email')
        return
      }
      await this.proyectoService.aniadirUsuario(this.idProyecto, this.participantesForm.get('mail')!.value)
    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al añadir al usuario')
    }
  }
}
