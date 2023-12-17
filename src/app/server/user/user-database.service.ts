import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Usuario } from 'src/app/core/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UserDatabaseService {
  constructor(private firestore: Firestore) {}

  async crearUsuario(usuario: Usuario) {
    try {
      await addDoc(collection(this.firestore, 'Usuarios'), usuario);
    } catch (error) {}
  }

  async obtenerUsuario(uid: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, 'Usuarios'), where('uid', '==', uid))
      );

      if (querySnapshot.docs.length === 0) {
        throw new Error('No existe el usuario');
      }

      return querySnapshot.docs[0].data() as Usuario;
    } catch (error) {
      return null;
    }
  }
}
