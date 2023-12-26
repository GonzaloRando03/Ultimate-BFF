import { Injectable } from '@angular/core';
import { EndpointsDatabaseService } from 'src/app/server/endpoints/endpoints-database.service';
import { EndpointGenerico, EndpointPantalla } from '../models/endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(private endpointDatabase:EndpointsDatabaseService) { }

  async obtenerGenericosProyecto(idProyecto: string) {
    const genericos = await this.endpointDatabase.obtenerGenericosProyecto(idProyecto)
    return genericos
  }


  async obtenerPantallasProyecto(idProyecto: string) {
    const pantallas = await this.endpointDatabase.obtenerPantallasProyecto(idProyecto)
    return pantallas
  }

  async crearEndpointGenerico(endpoint:EndpointGenerico){
    await this.endpointDatabase.crearEndpointGenerico(endpoint)
  }

  async crearEndpointPantalla(endpoint:EndpointPantalla){
    await this.endpointDatabase.crearEndpointPantalla(endpoint)
  }

  async obtenerEndpointGenericoPorId(id:string){
    return await this.endpointDatabase.obtenerGenericoPorId(id)
  }

  async obtenerEndpointPantallaPorId(id:string){
    return await this.endpointDatabase.obtenerPantallaPorId(id)
  }

  async actualizarGenerico(id:string, endpoint:EndpointGenerico){
    await this.endpointDatabase.actualizarEndpointGenerico(id, endpoint)
  }

  async actualizarPantalla(id:string, endpoint:EndpointPantalla){
    await this.endpointDatabase.actualizarEndpointPantalla(id, endpoint)
  }

  async eliminarEndpointGenerico(id:string){
    await this.endpointDatabase.eliminarEndpointGenerico(id)
  }

  async eliminarEndpointPantalla(id:string){
    await this.endpointDatabase.eliminarEndpointPantalla(id)
  }
}
