import { Injectable } from '@angular/core';
import { ProjectDatabaseService } from 'src/app/server/projects/project-database.service';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { Proyecto } from '../models/proyecto.model';
import { Observable, Subject } from 'rxjs';
import { CarpetaService } from './carpeta.service';
import { CarpetasDatabaseService } from 'src/app/server/carpetas/carpetas-database.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private proyectos: Proyecto[] = [];
  private proyectos$: Subject<Proyecto[]> = new Subject();

  constructor(
    private proyectoDatabase: ProjectDatabaseService,
    private carpetaService:CarpetasDatabaseService,
    private toast: ToastService,
    private router: Router
  ) { }

  setProyectos(u: Proyecto[]): void {
    this.proyectos = u;
    this.proyectos$.next(this.proyectos);
  }

  getProyectos(): Observable<Proyecto[]> {
    return this.proyectos$.asObservable();
  }

  getProyectosValue(): Proyecto[] {
    return this.proyectos;
  }

  async crearProyecto(proyecto:Proyecto){
    try {
      const proyectId = await this.proyectoDatabase.crearProyecto(proyecto)

      if (proyectId === null) throw new Error('Proyecto no creado');

      const proyectosArray = [...this.proyectos]
      proyectosArray.push({...proyecto, id:proyectId, numeroGenericos: 0, numeroPantallas: 0})
      this.setProyectos(proyectosArray)

      await this.carpetaService.crearCarpetasIniciales(proyectId)

      this.toast.success('Proyecto creado', 'El proyecto ' + proyecto.nombre + ' se ha creado correctamente')

    } catch (error) {
      this.toast.error('Error inesperado','Ha ocurrido un error al crear el proyecto')
    }
  }

  async obtenerProyectosUsuario(uid:string){
    const proyectos = await this.proyectoDatabase.obtenerProyectosUsuario(uid)

    if (proyectos === null ){
      this.setProyectos([])
      return
    }
    this.setProyectos(proyectos)
  }

  async obtenerProyectoPorId(projectId:string){
    const proyecto = await this.proyectoDatabase.obtenerProyecto(projectId)

    return proyecto
  }

  async getPermisosProyecto(uid:string, projectId:string){
    const proyecto = await this.proyectoDatabase.obtenerProyecto(projectId)
    return proyecto!.usuarios.includes(uid)
  }

  async aniadirUsuario(idProyecto:string, mail:string){
    await this.proyectoDatabase.aniadirUsuarioProyecto(idProyecto, mail)
  }

  async obtenerUsuariosRevisores(pId:string){
    const usuarios = await this.proyectoDatabase.obtenerUsuariosProyecto(pId)
    return usuarios.map(u => {
      return {
        name: u.nombre + ' ' + u.apellidos,
        value: u.uid
      }
    })
  }
}
