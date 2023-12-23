import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-p004-dashboard',
  templateUrl: './p004-dashboard.component.html',
  styleUrls: ['./p004-dashboard.component.scss']
})
export class P004DashboardComponent implements OnInit{
  userForm:FormGroup
  user:Usuario | null = null

  constructor(
      private fb:FormBuilder, 
      private userService:UserService,
      private toast:ToastService
    ){
    this.user = this.userService.getUserValue()

    this.userForm = this.fb.group({
      nombre: [this.user?.nombre || '', Validators.required],
      apellidos: [this.user?.apellidos || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(usuario => {
      this.user = usuario
    }) 
  }

  async logout(){
    await this.userService.desloguearUsuario()
  }

  async actualizarUsuario(){
    if (!this.userForm.valid){
      this.toast.info('Faltan datos', 'Faltan datos del usuario en el formulario')
      return
    }

    await this.userService.editarUsuario(
      this.userForm.get('nombre')!.value,
      this.userForm.get('apellidos')!.value
    )
  }

  cerrarNuevoProyecto(){
    console.log('cerrao')
  }
}
