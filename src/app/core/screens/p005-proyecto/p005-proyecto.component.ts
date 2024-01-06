import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';
import { EndpointsService } from '../../services/endpoints.service';
import { ComponenteVisual, EndpointGenerico, EndpointPantalla } from '../../models/endpoint.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generarBFFtoPDF } from 'src/app/shared/utils/pdf/pdfGenerator';
import { CarpetaConEndpoints } from '../../models/carpeta.model';
import { CarpetaService } from '../../services/carpeta.service';

@Component({
  selector: 'app-p005-proyecto',
  templateUrl: './p005-proyecto.component.html',
  styleUrls: ['./p005-proyecto.component.scss']
})
export class P005ProyectoComponent implements OnInit{
  idProyecto:string = ''
  proyecto:Proyecto | null = null
  usuario!:Usuario 
  genericos:CarpetaConEndpoints[] = []
  pantallas:CarpetaConEndpoints[] = []
  visuales:ComponenteVisual[] = []
  mostrarParticipantes:boolean = false
  participantes:Usuario[] = []
  participantesForm:FormGroup
  selectedOption:number = 0

  constructor(
    private aRouter:ActivatedRoute,
    private proyectoService:ProyectoService,
    private toast:ToastService,
    private usuarioService:UserService,
    private endpointService:EndpointsService,
    private carpetaService:CarpetaService,
    private fb:FormBuilder
  ){
    this.usuario = this.usuarioService.getUserValue() as Usuario
    this.participantesForm = this.fb.group({
      mail: ['', Validators.required]
    })
  }

  async ngOnInit(): Promise<void> {
    this.idProyecto = this.aRouter.snapshot.params['id']
    await this.cargarProyecto()
  }

  async cargarProyecto() {
    await Promise.all([
      this.getProyecto(),
      this.getEndpoints()
    ])

    const usuariosPromise = this.proyecto!.usuarios.map(u => 
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
    await Promise.all([
      this.carpetaService.obtenerCarpetaEndpointsGenericoProyecto(this.idProyecto)
        .then((genericos: CarpetaConEndpoints[]) => {
          this.genericos = genericos;
        }),
      this.carpetaService.obtenerCarpetaEndpointsPantallaProyecto(this.idProyecto)
        .then((pantallas: CarpetaConEndpoints[]) => {
          this.pantallas = pantallas;
        }),
      this.endpointService.obtenerVisualesProyecto(this.idProyecto)
        .then((visuales: ComponenteVisual[] | null) => {
          this.visuales = visuales as ComponenteVisual[];
        })
    ]);
  }

  getVisualDropDown(){
    return this.visuales.map(p => {
      return {
        titulo: p.nombre,
        hasLink:  true,
        link: '/visual/' + p.id
      }
    })
  }

  async exportarPDF(){
    const genericos = await this.endpointService.obtenerGenericosProyecto(this.idProyecto) as EndpointGenerico[]
    const pantallas = await this.endpointService.obtenerPantallasProyecto(this.idProyecto) as EndpointPantalla[]
    await generarBFFtoPDF(this.proyecto!,genericos,pantallas,this.visuales)
  }

  selectOption(i:number){
    this.selectedOption = i
  }
}
