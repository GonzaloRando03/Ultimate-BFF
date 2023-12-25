import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { METHODS } from '../../constants/selectValues';
import { ToastService } from '../../services/toast.service';
import { EndpointGenerico } from '../../models/endpoint.model';
import { obtenerObjetoFormGroup } from 'src/app/shared/components/form-object/form-object.component';
import { obtenerParamsFormGroup } from 'src/app/shared/components/form-params/form-params.component';
import { EndpointsService } from '../../services/endpoints.service';

@Component({
  selector: 'app-p006-crear-generico',
  templateUrl: './p006-crear-generico.component.html',
  styleUrls: ['./p006-crear-generico.component.scss']
})
export class P006CrearGenericoComponent implements OnInit{
  idProyecto:string = ''
  genericoForm:FormGroup
  methodsValues = METHODS

  constructor(
    private aRouter:ActivatedRoute,
    private fb:FormBuilder,
    private toast:ToastService,
    private endpointService:EndpointsService
  ){
    this.genericoForm = this.fb.group({
      metodo: ['', Validators.required],
      url: ['', Validators.required],
      nombre: ['', Validators.required],
      consulta: [''],
      descipcion: [''],
      body: this.fb.array([]),
      params: this.fb.array([]),
      response: this.fb.array([]),
    })
  }

  async ngOnInit(): Promise<void> {
    this.idProyecto = this.aRouter.snapshot.params['id']
  }

  obtenerFormArray(nombre:string){
    return this.genericoForm.get(nombre) as FormArray
  }

  async aniadirEndpointGenerico(){
    try {
      if (!this.genericoForm.valid){
        this.toast.info('Faltan datos', 'Debes rellenar todos los campos obligatorios')
        return
      }
  
      const endpoint: EndpointGenerico = {
        idProyecto: this.idProyecto,
        nombre: this.genericoForm.get('nombre')!.value,
        url: this.genericoForm.get('url')!.value,
        metodo: this.genericoForm.get('metodo')!.value,
        descripcion: this.genericoForm.get('descipcion')!.value,
        consultaDB: this.genericoForm.get('consulta')!.value,
        requestBody: obtenerObjetoFormGroup(this.genericoForm, 'body'),
        response: obtenerObjetoFormGroup(this.genericoForm, 'response'),
        requestParams: obtenerParamsFormGroup(this.genericoForm, 'params')
      }
  
      await this.endpointService.crearEndpointGenerico(endpoint)
      this.toast.success('Endpoint añadido', 'El endpoint se ha añadido correctamente')

    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al añadir el endpoint')
    }
  }

}
