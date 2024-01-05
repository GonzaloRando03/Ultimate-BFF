import { Injectable } from '@angular/core';
import { CarpetasDatabaseService } from 'src/app/server/carpetas/carpetas-database.service';
import { ToastService } from './toast.service';
import { Carpeta } from '../models/carpeta.model';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {

  constructor(private carpetaDatabase:CarpetasDatabaseService, private toast:ToastService) { }

  async crearCarpetasIniciales(idProyecto:string){
    await this.carpetaDatabase.crearCarpetasIniciales(idProyecto)
  }

  async crearCarpetaGenerico(nombre: string, idProyecto:string) {
    return await this.carpetaDatabase.crearCarpetaGenerico(nombre, idProyecto)
  }

  async crearCarpetaPantalla(nombre: string, idProyecto:string) {
    return await this.carpetaDatabase.crearCarpetaPantalla(nombre, idProyecto)
  }

  async obtenerCarpetasGenericasProyecto(idProyecto:string){
    return await this.carpetaDatabase.obtenerCarpetasGenericasProyecto(idProyecto)
  }

  async obtenerCarpetasPantallaProyecto(idProyecto:string){
    return await this.carpetaDatabase.obtenerCarpetasPantallaProyecto(idProyecto)
  }

  async obtenerCarpetaGenericoPorId(id:string){
    return await this.carpetaDatabase.obtenerCarpetaGenericoPorId(id)
  }

  async obtenerCarpetaPantallaPorId(idProyecto:string){
    return await this.carpetaDatabase.obtenerCarpetaPantallaPorId(idProyecto)
  }

  async aniadirEndpointACarpetaGenerica(idCarpeta:string, idEndpoint:string){
    const carpetas = await this.carpetaDatabase.obtenerCarpetasEndpointGenerico(idEndpoint)

    if (carpetas && carpetas.length > 0){
      const carpetasPromise = carpetas.map(async c => {
        c.endpoints = c.endpoints.filter(e => e !== idEndpoint)
        await this.carpetaDatabase.actualizarCarpetaGenerica(c.id!, c)
      })

      await Promise.all(carpetasPromise)
    }

    const carpeta = await this.carpetaDatabase.obtenerCarpetaGenericoPorId(idCarpeta) as Carpeta
    carpeta.endpoints.push(idEndpoint)
    await this.carpetaDatabase.actualizarCarpetaGenerica(idCarpeta, carpeta)
  }

  async aniadirEndpointACarpetaPantalla(idCarpeta:string, idEndpoint:string){
    const carpetas = await this.carpetaDatabase.obtenerCarpetasEndpointPantalla(idEndpoint)

    if (carpetas && carpetas.length > 0){
      const carpetasPromise = carpetas.map(async c => {
        c.endpoints = c.endpoints.filter(e => e !== idEndpoint)
        await this.carpetaDatabase.actualizarCarpetaPantalla(c.id!, c)
      })

      await Promise.all(carpetasPromise)
    }

    const carpeta = await this.carpetaDatabase.obtenerCarpetaPantallaPorId(idCarpeta) as Carpeta
    carpeta.endpoints.push(idEndpoint)
    await this.carpetaDatabase.actualizarCarpetaPantalla(idCarpeta, carpeta)
  }
}

