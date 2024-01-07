import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carpeta, CarpetaConEndpoints, CarpetaValue, EndpointCarpeta } from 'src/app/core/models/carpeta.model';
import { EndpointGenerico } from 'src/app/core/models/endpoint.model';
import { Usuario } from 'src/app/core/models/usuario.model';
import { CarpetaService } from 'src/app/core/services/carpeta.service';
import { EndpointsService } from 'src/app/core/services/endpoints.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-endpoints-genericos',
  templateUrl: './endpoints-genericos.component.html',
  styleUrls: ['./endpoints-genericos.component.scss']
})
export class EndpointsGenericosComponent  implements OnInit{
  @Input() carpetas:CarpetaConEndpoints[] = []
  @Input() idProyecto:string = ''
  @Output() recargar = new EventEmitter<void>();
  
  usuario:Usuario
  mostrarCrearCarpeta:boolean = false
  mostrarMoverEndpoint:boolean = false
  carpetasValues:CarpetaValue[] = []
  checkOptions:CheckOption[] = []
  carpetaForm:FormGroup
  moverForm:FormGroup

  constructor(
    private userService:UserService,
    private carpetaService: CarpetaService,
    private toast:ToastService,
    private endpointService:EndpointsService,
    private fb:FormBuilder
  ){
    this.usuario = this.userService.getUserValue() as Usuario
    this.carpetaForm = this.fb.group({
      nombre: ['', Validators.required]
    })
    this.moverForm = this.fb.group({
      carpeta: ['', Validators.required],
    })
  }

  async ngOnInit(): Promise<void> {
    await this.pedirCarpetas()
    await this.pedirEndpoints()
  }

  getDropDown(c:CarpetaConEndpoints){
    return c.endpoints.map(g => {
      return {
        titulo: g.metodo + ' - ' +g.nombre,
        hasLink:  true,
        link: '/generico/' + g.id,
        ready: this.getReadyForDev(g),
        revisar: this.getRevisar(g)
      }
    })
  }

  getReadyForDev(p: EndpointCarpeta){
    let ready = true
    p.revisores?.forEach(r => {
      if (!r.revisado){
        ready = false
      }
    })
    return ready
  }

  getRevisar(p: EndpointCarpeta){
    const revision = p.revisores?.find(r => r.uid === this.usuario.uid)
    return revision && !revision.revisado
  }

  async crearCarpeta(){
    if (this.carpetaForm.valid){
      await this.carpetaService.crearCarpetaGenerico(
        this.carpetaForm.get('nombre')!.value,
        this.idProyecto
      )
      await this.recargarComponente()
      this.mostrarCrearCarpeta = false
    }else this.toast.info('Indica el nombre de la carpeta', 'Debes indicar el nombre de la carpeta a crear')
  }

  async pedirCarpetas(){
    const carpetas = await this.carpetaService.obtenerCarpetasGenericasProyecto(this.idProyecto) as Carpeta[]
    this.carpetasValues = carpetas.map(c => {
      return {
        name: c.nombre,
        value: c.id!
      }
    })
  }

  async pedirEndpoints(){
    const endpoints = await this.endpointService.obtenerGenericosProyecto(this.idProyecto) as EndpointGenerico[]
    endpoints.forEach(e => {
      this.checkOptions.push({
        checked: false,
        id: e.id!,
        nombre: e.nombre
      })
    })
  }

  async recargarComponente(){
    await this.pedirCarpetas()
    this.recargar.emit()
  }

  selectCheck(e:any){
    console.log(this.checkOptions)
  }
}

interface CheckOption {
  checked:boolean,
  id: string
  nombre:string
}
