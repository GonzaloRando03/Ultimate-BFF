import { Injectable } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Proyecto } from 'src/app/core/models/proyecto.model';
import { EndpointsDatabaseService } from '../endpoints/endpoints-database.service';
import { UserDatabaseService } from '../user/user-database.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Usuario } from 'src/app/core/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectDatabaseService {
  proyectosCollection = 'Proyectos'

  constructor(
    private firestore: Firestore, 
    private endpointDatabase: EndpointsDatabaseService,
    private userDatabase:UserDatabaseService,
    private toast:ToastService
  ) {}

  async crearProyecto(proyecto: Proyecto) {
    try {
      const proyectoDoc = {...proyecto, fechaCreacion: Timestamp.fromDate(proyecto.fechaCreacion as Date)}
      const doc = await addDoc(collection(this.firestore, this.proyectosCollection), proyectoDoc);
      return doc.id
    } catch (error) {
      return null
    }
  }

  async obtenerProyecto(id: string) {
    try {
      const querySnapshot = await getDoc(doc(this.firestore, this.proyectosCollection, id));
      return {
        ...querySnapshot.data(), 
        id:querySnapshot.id, 
        fechaCreacion: ((querySnapshot.data() as Proyecto)
          .fechaCreacion as Timestamp).toDate()
      } as Proyecto;
    } catch (error) {
      return null;
    }
  }

  async obtenerProyectosUsuario(uid: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, this.proyectosCollection), where('usuarios', 'array-contains', uid))
      );

      if (querySnapshot.docs.length === 0) {
        throw new Error('El usuario no tiene proyectos');
      }

      const proyectosPromise = querySnapshot.docs.map( async p => { 
        return {
          ...p.data(), 
          id: p.id,
          fechaCreacion: ((p.data() as Proyecto)
            .fechaCreacion as Timestamp).toDate(),
          numeroGenericos: await this.endpointDatabase.obtenerNumeroGenericosProyecto(p.id),
          numeroPantallas: await this.endpointDatabase.obtenerNumeroPantallasProyecto(p.id)
        } as Proyecto
      })

      const proyectos = await Promise.all(proyectosPromise)

      return proyectos;
    } catch (error) {
      return null;
    }
  }

  async aniadirUsuarioProyecto(idProyecto:string, mail:string){
    const proyecto = await this.obtenerProyecto(idProyecto)
    const usuario = await this.userDatabase.obtenerUsuarioPorMail(mail)

    if (usuario === null){
      this.toast.error('El usuario no existe', 'No existe ningún usuario con el correo ' + mail)
      return
    }

    if (proyecto?.usuarios.includes(usuario.uid)){
      this.toast.info('Usuario ya añadido', 'El usuario ya está en el proyecto ' + proyecto.nombre)
      return
    }

    proyecto?.usuarios.push(usuario?.uid!)
    await updateDoc(doc(this.firestore, this.proyectosCollection, idProyecto), {...proyecto});
  }

  async obtenerUsuariosProyecto(proyectoId:string){
    const proyecto = await this.obtenerProyecto(proyectoId) as Proyecto
    const usuariosPromise = proyecto.usuarios.map(async u => {
      const usuario = await this.userDatabase.obtenerUsuario(u)
      return usuario as Usuario
    })
    const usuarios = await Promise.all(usuariosPromise)
    return usuarios
  }
}
