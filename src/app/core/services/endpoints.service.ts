import { Injectable } from '@angular/core';
import { EndpointsDatabaseService } from 'src/app/server/endpoints/endpoints-database.service';

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
}
