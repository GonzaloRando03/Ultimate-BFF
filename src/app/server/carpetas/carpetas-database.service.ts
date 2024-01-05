import { Injectable } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { EndpointsDatabaseService } from '../endpoints/endpoints-database.service';
import { UserDatabaseService } from '../user/user-database.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Carpeta } from 'src/app/core/models/carpeta.model';

@Injectable({
  providedIn: 'root'
})
export class CarpetasDatabaseService {
  carpetasGenericos = 'CarpetasGenericos'
  carpetasPantalla = 'CarpetasPantalla'

  constructor(
    private firestore: Firestore, 
    private endpointDatabase: EndpointsDatabaseService,
    private userDatabase:UserDatabaseService,
    private toast:ToastService
  ) {}

  async crearCarpetasIniciales(idProyecto:string){
    await this.crearCarpetaGenerico('/', idProyecto)
    await this.crearCarpetaPantalla('/', idProyecto)
  }

  async crearCarpetaGenerico(nombre: string, idProyecto:string) {
    try {
      const carpetaDoc = {nombre:nombre, idProyecto:idProyecto, endpoints:[]} as Carpeta
      const doc = await addDoc(collection(this.firestore, this.carpetasGenericos), carpetaDoc);
      return doc.id
    } catch (error) {
      return null
    }
  }

  async crearCarpetaPantalla(nombre: string, idProyecto:string) {
    try {
      const carpetaDoc = {nombre:nombre, idProyecto:idProyecto, endpoints:[]} as Carpeta
      const doc = await addDoc(collection(this.firestore, this.carpetasPantalla), carpetaDoc);
      return doc.id
    } catch (error) {
      return null
    }
  }

  async obtenerCarpetasGenericasProyecto(idProyecto:string){
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, this.carpetasGenericos), where('idProyecto', '==', idProyecto))
      );

      if (querySnapshot.docs.length === 0) return []

      const endpoints = querySnapshot.docs.map(e => { 
        return {
          ...e.data(), 
          id: e.id
        }
      })
      
      return endpoints as Carpeta[];
    } catch (error) {
      return null;
    }
  }

  async obtenerCarpetasPantallaProyecto(idProyecto:string){
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, this.carpetasPantalla), where('idProyecto', '==', idProyecto))
      );

      if (querySnapshot.docs.length === 0) return []

      const endpoints = querySnapshot.docs.map(e => { 
        return {
          ...e.data(), 
          id: e.id
        }
      })
      
      return endpoints as Carpeta[];
    } catch (error) {
      return null;
    }
  }

  async obtenerCarpetaGenericoPorId(id:string){
    try {
      const querySnapshot = await getDoc(doc(this.firestore, this.carpetasGenericos, id));
      return {
        ...querySnapshot.data(), 
        id:querySnapshot.id
      } as Carpeta;
    } catch (error) {
      return null;
    }
  }

  async obtenerCarpetaPantallaPorId(id:string){
    try {
      const querySnapshot = await getDoc(doc(this.firestore, this.carpetasPantalla, id));
      return {
        ...querySnapshot.data(), 
        id:querySnapshot.id
      } as Carpeta;
    } catch (error) {
      return null;
    }
  }

  async obtenerCarpetasEndpointGenerico(id: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, this.carpetasGenericos), where('endpoints', 'array-contains', id))
      );

      if (querySnapshot.docs.length === 0) {
        throw new Error('El endpoint no tiene carpetas');
      }

      const carpetasPromise = querySnapshot.docs.map( async p => { 
        return {
          ...p.data(), 
          id: p.id,
        } as Carpeta
      })

      const carpetas = await Promise.all(carpetasPromise)

      return carpetas;
    } catch (error) {
      return null;
    }
  }

  async obtenerCarpetasEndpointPantalla(id: string) {
    try {
      const querySnapshot = await getDocs(
        query(collection(this.firestore, this.carpetasPantalla), where('endpoints', 'array-contains', id))
      );

      if (querySnapshot.docs.length === 0) {
        throw new Error('El endpoint no tiene carpetas');
      }

      const carpetasPromise = querySnapshot.docs.map( async p => { 
        return {
          ...p.data(), 
          id: p.id,
        } as Carpeta
      })

      const carpetas = await Promise.all(carpetasPromise)

      return carpetas;
    } catch (error) {
      return null;
    }
  }

  async actualizarCarpetaGenerica(id:string, carpeta:Carpeta){
    await updateDoc(doc(this.firestore, this.carpetasGenericos, id), {...carpeta});
  }

  async eliminarCarpetaGenerica(id:string){
    await deleteDoc(doc(this.firestore, this.carpetasGenericos, id));
  }

  async actualizarCarpetaPantalla(id:string, carpeta:Carpeta){
    await updateDoc(doc(this.firestore, this.carpetasPantalla, id), {...carpeta});
  }

  async eliminarCarpetaPantalla(id:string){
    await deleteDoc(doc(this.firestore, this.carpetasPantalla, id));
  }
}
