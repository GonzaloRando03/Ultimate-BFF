import { Injectable } from '@angular/core';
import { EndpointsDatabaseService } from 'src/app/server/endpoints/endpoints-database.service';
import { EndpointGenerico } from '../models/endpoint.model';

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
}
