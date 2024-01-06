import { Component, Input } from '@angular/core';
import { CarpetaConEndpoints, EndpointCarpeta } from 'src/app/core/models/carpeta.model';
import { Usuario } from 'src/app/core/models/usuario.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-endpoints-pantalla',
  templateUrl: './endpoints-pantalla.component.html',
  styleUrls: ['./endpoints-pantalla.component.scss']
})
export class EndpointsPantallaComponent {
  @Input() carpetas:CarpetaConEndpoints[] = []
  @Input() idProyecto:string = ''
  usuario:Usuario
  mostrarCrearCarpeta:boolean = false
  mostrarMoverEndpoint:boolean = false

  constructor(private userService:UserService){
    this.usuario = this.userService.getUserValue() as Usuario
  }

  getDropDown(c:CarpetaConEndpoints){
    return c.endpoints.map(g => {
      return {
        titulo: g.metodo + ' - ' +g.nombre,
        hasLink:  true,
        link: '/pantalla/' + g.id,
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
}