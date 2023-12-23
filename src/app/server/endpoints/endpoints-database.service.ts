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
import { EndpointGenerico, EndpointPantalla } from 'src/app/core/models/endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointsDatabaseService {
  genericosCollection = 'EndpointsGenericos'
  pantallasCollection = 'EndpointsPantallas'

  constructor(private firestore: Firestore) {}

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
}
