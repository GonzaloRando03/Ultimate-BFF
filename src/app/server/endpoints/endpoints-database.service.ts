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
import { deleteDoc, orderBy } from 'firebase/firestore';
import { ComponenteVisual, EndpointGenerico, EndpointPantalla } from 'src/app/core/models/endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointsDatabaseService {
  genericosCollection = 'EndpointsGenericos'
  pantallasCollection = 'EndpointsPantallas'
  visualesCollection = 'ComponentesVisuales'

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

  async obtenerVisualPorId(id:string){
    try {
      const querySnapshot = await getDoc(doc(this.firestore, this.visualesCollection, id));
      return {
        ...querySnapshot.data(), 
        id:querySnapshot.id
      } as ComponenteVisual;
    } catch (error) {
      return null;
    }
  }

  async obtenerGenericosProyecto(idProyecto: string) {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(this.firestore, this.genericosCollection), 
          where('idProyecto', '==', idProyecto),
          orderBy('nombre'))
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
        query(
          collection(this.firestore, this.pantallasCollection), 
          where('idProyecto', '==', idProyecto),
          orderBy('nombre')
        )
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

  async obtenerVisualesProyecto(idProyecto: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, this.visualesCollection), where('idProyecto', '==', idProyecto))
      );

      if (querySnapshot.docs.length === 0) return []

      const endpoints = querySnapshot.docs.map(e => { 
        return {
          ...e.data(), 
          id: e.id
        }
      })
      
      return endpoints as ComponenteVisual[];
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
      const doc = await addDoc(collection(this.firestore, this.genericosCollection), endpoint);
      return doc.id
    } catch (error) {return null}
  }

  async crearEndpointPantalla(endpoint: EndpointPantalla) {
    try {
      const doc = await addDoc(collection(this.firestore, this.pantallasCollection), endpoint);
      return doc.id
    } catch (error) {return null}
  }

  async crearVisualPantalla(visual: ComponenteVisual) {
    try {
      await addDoc(collection(this.firestore, this.visualesCollection), visual);
    } catch (error) {}
  }

  async actualizarEndpointGenerico(id:string, endpoint:EndpointGenerico){
    await updateDoc(doc(this.firestore, this.genericosCollection, id), {...endpoint});
  }

  async actualizarEndpointPantalla(id:string, endpoint:EndpointPantalla){
    await updateDoc(doc(this.firestore, this.pantallasCollection, id), {...endpoint});
  }

  async actualizarVisualPantalla(id:string, visual:ComponenteVisual){
    await updateDoc(doc(this.firestore, this.visualesCollection, id), {...visual});
  }

  async eliminarEndpointGenerico(id:string){
    await deleteDoc(doc(this.firestore, this.genericosCollection, id));
  }

  async eliminarEndpointPantalla(id:string){
    await deleteDoc(doc(this.firestore, this.pantallasCollection, id));
  }

  async eliminarVisualPantalla(id:string){
    await deleteDoc(doc(this.firestore, this.visualesCollection, id));
  }

  async revisarEndpointGenerico(id:string, uid:string){
    const generico = await this.obtenerGenericoPorId(id) as EndpointGenerico
    generico!.revisores = generico!.revisores!.map(r => {
      if (r.uid === uid){
        r.revisado = true
      }
      return r
    })
    await this.actualizarEndpointGenerico(id, generico)
  }

  async revisarEndpointPantalla(id:string, uid:string){
    const pantalla = await this.obtenerPantallaPorId(id) as EndpointPantalla
    pantalla!.revisores = pantalla!.revisores!.map(r => {
      if (r.uid === uid){
        r.revisado = true
      }
      return r
    })
    await this.actualizarEndpointPantalla(id, pantalla)
  }
}
