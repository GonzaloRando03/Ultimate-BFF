import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/core/models/usuario.model';
import { ProyectoService } from 'src/app/core/services/proyecto.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.scss']
})
export class ParticipantesComponent {
  usuario!:Usuario
  participantesForm:FormGroup
  @Input() participantes: Usuario[] = []
  @Input() idProyecto: string = ''
  @Output() recargar = new EventEmitter<void>();

  constructor(
    private proyectoService:ProyectoService,
    private toast:ToastService,
    private usuarioService:UserService,
    private fb:FormBuilder
  ){
    this.usuario = this.usuarioService.getUserValue() as Usuario
    this.participantesForm = this.fb.group({
      mail: ['', Validators.required]
    })
  }

  async aniadirUsuario(){
    try {
      if (!this.participantesForm.valid){
        this.toast.info('Email no introducido', 'No has introducido un Email')
        return
      }
      await this.proyectoService.aniadirUsuario(this.idProyecto, this.participantesForm.get('mail')!.value)
      this.toast.success('Usuario añadido', 'El usuario se ha añadido con éxito')
      this.participantesForm.get('mail')!.setValue('')
      this.recargar.emit()

    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al añadir al usuario')
    }
  }
}
