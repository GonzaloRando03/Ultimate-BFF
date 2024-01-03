import { Injectable } from '@angular/core';
import { EndpointsDatabaseService } from 'src/app/server/endpoints/endpoints-database.service';
import { ComponenteVisual, EndpointGenerico, EndpointPantalla } from '../models/endpoint.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(private endpointDatabase:EndpointsDatabaseService, private toast:ToastService) { }

  async obtenerGenericosProyecto(idProyecto: string) {
    const genericos = await this.endpointDatabase.obtenerGenericosProyecto(idProyecto)
    return genericos
  }

  async obtenerPantallasProyecto(idProyecto: string) {
    const pantallas = await this.endpointDatabase.obtenerPantallasProyecto(idProyecto)
    return pantallas
  }

  async obtenerVisualesProyecto(idProyecto: string) {
    const visuales = await this.endpointDatabase.obtenerVisualesProyecto(idProyecto)
    return visuales
  }

  async crearEndpointGenerico(endpoint:EndpointGenerico){
    await this.endpointDatabase.crearEndpointGenerico(endpoint)
  }

  async crearEndpointPantalla(endpoint:EndpointPantalla){
    await this.endpointDatabase.crearEndpointPantalla(endpoint)
  }

  async crearVisualPantalla(visual:ComponenteVisual){
    await this.endpointDatabase.crearVisualPantalla(visual)
  }

  async obtenerEndpointGenericoPorId(id:string){
    return await this.endpointDatabase.obtenerGenericoPorId(id)
  }

  async obtenerEndpointPantallaPorId(id:string){
    return await this.endpointDatabase.obtenerPantallaPorId(id)
  }

  async obtenerVisualPorId(id:string){
    return await this.endpointDatabase.obtenerVisualPorId(id)
  }

  async actualizarGenerico(id:string, endpoint:EndpointGenerico){
    await this.endpointDatabase.actualizarEndpointGenerico(id, endpoint)
  }

  async actualizarPantalla(id:string, endpoint:EndpointPantalla){
    await this.endpointDatabase.actualizarEndpointPantalla(id, endpoint)
  }

  async actualizarVisual(id:string, visual:ComponenteVisual){
    await this.endpointDatabase.actualizarVisualPantalla(id, visual)
  }

  async eliminarEndpointGenerico(id:string){
    await this.endpointDatabase.eliminarEndpointGenerico(id)
  }

  async eliminarEndpointPantalla(id:string){
    await this.endpointDatabase.eliminarEndpointPantalla(id)
  }

  async eliminarVisualPantalla(id:string){
    await this.endpointDatabase.eliminarVisualPantalla(id)
  }

  async revisarEndpointPantalla(id:string, uid:string){
    try {
      await this.endpointDatabase.revisarEndpointPantalla(id, uid)
      this.toast.success('Endpoint Validado', 'Has validado el endpoint')
    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al validar el endpoint')
    }
  }

  async revisarEndpointGenerico(id:string, uid:string){
    try {
      await this.endpointDatabase.revisarEndpointGenerico(id, uid)
      this.toast.success('Endpoint Validado', 'Has validado el endpoint')
    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al validar el endpoint')
    }
  }
}
