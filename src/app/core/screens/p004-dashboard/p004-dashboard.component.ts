import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';
import { ToastService } from '../../services/toast.service';
import { Proyecto } from '../../models/proyecto.model';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-p004-dashboard',
  templateUrl: './p004-dashboard.component.html',
  styleUrls: ['./p004-dashboard.component.scss']
})
export class P004DashboardComponent implements OnInit{
  userForm:FormGroup
  nuevoProyectoForm:FormGroup
  user:Usuario | null = null

  mostrarNuevoProyecto:boolean = false
  proyectos:Proyecto[] = []

  constructor(
      private fb:FormBuilder, 
      private userService:UserService,
      private toast:ToastService,
      private proyectoService:ProyectoService
    ){
    this.user = this.userService.getUserValue()
    this.proyectos = this.proyectoService.getProyectosValue()

    this.userForm = this.fb.group({
      nombre: [this.user?.nombre || '', Validators.required],
      apellidos: [this.user?.apellidos || '', Validators.required],
    });

    this.nuevoProyectoForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(usuario => {
      this.user = usuario
    }) 

    this.proyectoService.getProyectos().subscribe(proyectos => {
      this.proyectos = proyectos
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

  setMostrarNuevoProyecto(b:boolean){
    this.mostrarNuevoProyecto = b
  }

  async crearProyecto(){
    const nombreProyecto:string = this.nuevoProyectoForm.get('nombre')!.value

    if (nombreProyecto.length === 0){
      this.toast.info('Proyecto sin nombre', 'No has introducido un nombre para tu proyecto')
      return
    }

    const nuevoProyecto:Proyecto = {
      nombre: nombreProyecto,
      fechaCreacion: new Date(),
      propietario: this.user?.uid!,
      usuarios: [this.user?.uid!]
    }

    await this.proyectoService.crearProyecto(nuevoProyecto)

    this.mostrarNuevoProyecto = false
  }
}
