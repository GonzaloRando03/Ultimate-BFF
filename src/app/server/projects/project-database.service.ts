import { Injectable } from '@angular/core';
import {
  Firestore,
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

@Injectable({
  providedIn: 'root'
})
export class ProjectDatabaseService {

  constructor(private firestore: Firestore) {}

  async crearProyecto(proyecto: Proyecto) {
    try {
      await addDoc(collection(this.firestore, 'Proyectos'), proyecto);
    } catch (error) {}
  }

  async obtenerProyecto(id: string) {
    try {
      const querySnapshot = await getDoc(doc(this.firestore, 'Proyectos', id));
      return {...querySnapshot.data(), id:querySnapshot.id} as Proyecto;
    } catch (error) {
      return null;
    }
  }

  async obtenerProyectosUsuario(uid: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, 'Proyectos'), where('usuarios', 'array-contains', uid))
      );

      if (querySnapshot.docs.length === 0) {
        throw new Error('El usuario no tiene proyectos');
      }

      const proyectos = querySnapshot.docs.map(p => { return {...p.data(), id: p.id}})
      return proyectos as Proyecto[];
    } catch (error) {
      return null;
    }
  }
}
