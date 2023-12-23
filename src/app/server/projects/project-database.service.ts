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

@Injectable({
  providedIn: 'root'
})
export class ProjectDatabaseService {
  proyectosCollection = 'Proyectos'

  constructor(
    private firestore: Firestore, 
    private endpointDatabase: EndpointsDatabaseService
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
}
