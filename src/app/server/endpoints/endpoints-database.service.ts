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
import { deleteDoc } from 'firebase/firestore';
import { EndpointGenerico, EndpointPantalla } from 'src/app/core/models/endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointsDatabaseService {
  genericosCollection = 'EndpointsGenericos'
  pantallasCollection = 'EndpointsPantallas'

  constructor(private firestore: Firestore) {}

  async obtenerGenericoPorId(id:string){
    try {
      const querySnapshot = await getDoc(doc(this.firestore, this.genericosCollection, id));
      return {
        ...querySnapshot.data(), 
        id:querySnapshot.id
      } as EndpointGenerico;
    } catch (error) {
      return null;
    }
  }

  async obtenerPantallaPorId(id:string){
    try {
      const querySnapshot = await getDoc(doc(this.firestore, this.pantallasCollection, id));
      return {
        ...querySnapshot.data(), 
        id:querySnapshot.id
      } as EndpointPantalla;
    } catch (error) {
      return null;
    }
  }

  async obtenerGenericosProyecto(idProyecto: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, this.genericosCollection), where('idProyecto', '==', idProyecto))
      );

      if (querySnapshot.docs.length === 0) return []

      const endpoints = querySnapshot.docs.map(e => { 
        return {
          ...e.data(), 
          id: e.id
        }
      })
      
      return endpoints as EndpointGenerico[];
    } catch (error) {
      return null;
    }
  }


  async obtenerPantallasProyecto(idProyecto: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, this.pantallasCollection), where('idProyecto', '==', idProyecto))
      );

      if (querySnapshot.docs.length === 0) return []

      const endpoints = querySnapshot.docs.map(e => { 
        return {
          ...e.data(), 
          id: e.id
        }
      })
      
      return endpoints as EndpointPantalla[];
    } catch (error) {
      return null;
    }
  }

  async obtenerNumeroGenericosProyecto(idProyecto: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, this.genericosCollection), where('idProyecto', '==', idProyecto))
      );

      return querySnapshot.size
    } catch (error) {
      return 0;
    }
  }


  async obtenerNumeroPantallasProyecto(idProyecto: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, this.pantallasCollection), where('idProyecto', '==', idProyecto))
      );

      return querySnapshot.size
    } catch (error) {
      return 0;
    }
  }

  async crearEndpointGenerico(endpoint: EndpointGenerico) {
    try {
      await addDoc(collection(this.firestore, this.genericosCollection), endpoint);
    } catch (error) {}
  }

  async crearEndpointPantalla(endpoint: EndpointPantalla) {
    try {
      await addDoc(collection(this.firestore, this.pantallasCollection), endpoint);
    } catch (error) {}
  }

  async actualizarEndpointGenerico(id:string, endpoint:EndpointGenerico){
    await updateDoc(doc(this.firestore, this.genericosCollection, id), {...endpoint});
  }

  async actualizarEndpointPantalla(id:string, endpoint:EndpointPantalla){
    await updateDoc(doc(this.firestore, this.pantallasCollection, id), {...endpoint});
  }

  async eliminarEndpointGenerico(id:string){
    await deleteDoc(doc(this.firestore, this.genericosCollection, id));
  }

  async eliminarEndpointPantalla(id:string){
    await deleteDoc(doc(this.firestore, this.pantallasCollection, id));
  }
}
