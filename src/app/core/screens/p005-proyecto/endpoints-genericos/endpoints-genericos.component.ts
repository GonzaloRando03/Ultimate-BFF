import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarpetaConEndpoints, EndpointCarpeta } from 'src/app/core/models/carpeta.model';
import { Usuario } from 'src/app/core/models/usuario.model';
import { CarpetaService } from 'src/app/core/services/carpeta.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-endpoints-genericos',
  templateUrl: './endpoints-genericos.component.html',
  styleUrls: ['./endpoints-genericos.component.scss']
})
export class EndpointsGenericosComponent {
  @Input() carpetas:CarpetaConEndpoints[] = []
  @Input() idProyecto:string = ''
  
  usuario:Usuario
  mostrarCrearCarpeta:boolean = false
  mostrarMoverEndpoint:boolean = false
  carpetaForm:FormGroup

  constructor(
    private userService:UserService,
    private carpetaService: CarpetaService,
    private fb:FormBuilder
  ){
    this.usuario = this.userService.getUserValue() as Usuario
    this.carpetaForm = this.fb.group({
      nombre: ['', Validators.required]
    })
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

  crearCarpeta(){

  }
}
