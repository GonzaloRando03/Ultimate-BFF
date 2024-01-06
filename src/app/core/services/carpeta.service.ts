import { Injectable } from '@angular/core';
import { CarpetasDatabaseService } from 'src/app/server/carpetas/carpetas-database.service';
import { ToastService } from './toast.service';
import { Carpeta, CarpetaConEndpoints, EndpointCarpeta } from '../models/carpeta.model';
import { EndpointsService } from './endpoints.service';
import { EndpointGenerico, EndpointPantalla } from '../models/endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {

  constructor(
      private carpetaDatabase:CarpetasDatabaseService, 
      private toast:ToastService,
      private endpointService:EndpointsService
  ) { }

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

  async obtenerCarpetaEndpointsGenericoProyecto(idProyecto:string){
    const carpetas = await this.carpetaDatabase.obtenerCarpetasGenericasProyecto(idProyecto) as Carpeta[]
    const carpetasEndpointPromise = carpetas.map(async c => {
      const endpointsPromise = c.endpoints.map(async e => {
        const endpoint = await this.endpointService.obtenerEndpointGenericoPorId(e) as EndpointGenerico
        return {
          id:endpoint.id!,
          idProyecto: endpoint.idProyecto,
          metodo: endpoint.metodo,
          nombre: endpoint.nombre,
          revisores: endpoint.revisores
        } as EndpointCarpeta
      })

      const endpoints = await Promise.all(endpointsPromise)

      return {
        ...c,
        id: c.id!,
        endpoints: endpoints
      } as CarpetaConEndpoints
    })

    return await Promise.all(carpetasEndpointPromise)
  }

  async obtenerCarpetaEndpointsPantallaProyecto(idProyecto:string){
    const carpetas = await this.carpetaDatabase.obtenerCarpetasPantallaProyecto(idProyecto) as Carpeta[]
    const carpetasEndpointPromise = carpetas.map(async c => {
      const endpointsPromise = c.endpoints.map(async e => {
        const endpoint = await this.endpointService.obtenerEndpointPantallaPorId(e) as EndpointPantalla
        return {
          id:endpoint.id!,
          idProyecto: endpoint.idProyecto,
          metodo: endpoint.metodo,
          nombre: endpoint.nombre,
          revisores: endpoint.revisores
        } as EndpointCarpeta
      })

      const endpoints = await Promise.all(endpointsPromise)

      return {
        ...c,
        id: c.id!,
        endpoints: endpoints
      } as CarpetaConEndpoints
    })

    return await Promise.all(carpetasEndpointPromise)
  }
}

