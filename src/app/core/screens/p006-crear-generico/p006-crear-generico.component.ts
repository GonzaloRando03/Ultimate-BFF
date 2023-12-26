import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { METHODS } from '../../constants/selectValues';
import { ToastService } from '../../services/toast.service';
import { EndpointGenerico, ObjectCell } from '../../models/endpoint.model';
import { EndpointsService } from '../../services/endpoints.service';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';
import { ProyectoService } from '../../services/proyecto.service';
import { obtenerObjetoFormGroup, obtenerParamsFormGroup } from 'src/app/shared/utils/codeFormater';

@Component({
  selector: 'app-p006-crear-generico',
  templateUrl: './p006-crear-generico.component.html',
  styleUrls: ['./p006-crear-generico.component.scss']
})
export class P006CrearGenericoComponent implements OnInit, AfterViewInit{
  idProyecto:string = ''
  idEndpoint:string = ''
  genericoForm:FormGroup
  methodsValues = METHODS
  loading:boolean = false
  editar:boolean = false
  endpoint!:EndpointGenerico
  usuario:Usuario | null = null

  constructor(
    private aRouter:ActivatedRoute,
    private fb:FormBuilder,
    private toast:ToastService,
    private endpointService:EndpointsService,
    private usuarioService:UserService,
    private proyectoService:ProyectoService,
    private router:Router
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
    this.editar = window.location.href.includes('editarGenerico')
    this.usuario = this.usuarioService.getUserValue()

    if (this.editar){
      this.loading = true

      this.idEndpoint = this.aRouter.snapshot.params['id']
      this.endpoint = 
        await this.endpointService.obtenerEndpointGenericoPorId(this.idEndpoint) as EndpointGenerico

      this.idProyecto = this.endpoint.idProyecto
    
      this.rellenarFormulario()
      this.loading = false

    } else {
      this.idProyecto = this.aRouter.snapshot.params['id']
    }

    const permisos = 
      await this.proyectoService.getPermisosProyecto(this.usuario?.uid!, this.idProyecto)

    if (!permisos){
      this.toast.warning('Sin permisos', 'No tienes permisos para acceder a este proyecto')
      this.router.navigate(['/'])
    }
  }

  ngAfterViewInit(): void {
    if (this.editar){
      const bodyFormArray = this.genericoForm.get('body') as FormArray
      this.eliminarCamposInecesarios(bodyFormArray, 'body')
  
      const responseFormArray = this.genericoForm.get('response') as FormArray
      this.eliminarCamposInecesarios(responseFormArray, 'response')
    }
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

      this.loading = true
  
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
  
      if (this.editar){
        await this.endpointService.actualizarGenerico(this.idEndpoint, endpoint)
        this.toast.success('Endpoint actualizado', 'El endpoint se ha actualizado correctamente')
      
      } else {
        await this.endpointService.crearEndpointGenerico(endpoint)
        this.toast.success('Endpoint añadido', 'El endpoint se ha añadido correctamente')
      }
  
      this.loading = false
      this.router.navigate(['/proyecto/' + this.idProyecto])

    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al añadir el endpoint')
      this.loading = false
    }
  }

  rellenarFormulario(){
    this.genericoForm.get('metodo')!.setValue(this.endpoint.metodo)
    this.genericoForm.get('nombre')!.setValue(this.endpoint.nombre)
    this.genericoForm.get('url')!.setValue(this.endpoint.url)
    this.genericoForm.get('consulta')!.setValue(this.endpoint.consultaDB)
    this.genericoForm.get('descipcion')!.setValue(this.endpoint.descripcion)

    const paramsFormArray = this.genericoForm.get('params') as FormArray

    this.endpoint.requestParams.forEach(p => {
      const fGroup = this.fb.group({
        nombre: new FormControl(p.nombre),
        type: new FormControl(p.type),
      })

      paramsFormArray.push(fGroup)
    })

    const bodyFormArray = this.genericoForm.get('body') as FormArray
    this.rellenarBody(this.endpoint.requestBody, bodyFormArray, 'body')

    const responseFormArray = this.genericoForm.get('response') as FormArray
    this.rellenarBody(this.endpoint.response, responseFormArray, 'response')
  }

  rellenarBody(cells:ObjectCell[], fArray:FormArray, fArrayName:string){
    cells.forEach(c => {
      const fGroup:any = {
        nombre: new FormControl(c.nombre),
        type: new FormControl(c.type),
      }

      fGroup[fArrayName] = this.fb.array([])

      if (c.type === 'Array' && c.content && typeof c.content === 'string'){
        fGroup.arrayValue = new FormControl(c.content)
      
      } else if (c.type === 'Array' && c.content && typeof c.content !== 'string'){
        fGroup.arrayValue = new FormControl('Object')
        this.rellenarBody(c.content, fGroup[fArrayName], fArrayName)
      
      } else if (c.type === 'Object' && c.content && typeof c.content !== 'string'){
        fGroup.arrayValue = new FormControl('')
        this.rellenarBody(c.content, fGroup[fArrayName], fArrayName)
      
      } else fGroup.arrayValue = new FormControl('')

      const body = this.fb.group(fGroup)

      fArray.push(body)
    })
  }


  eliminarCamposInecesarios(fArray:FormArray, fArrayName:string){
    setTimeout(() => {
      fArray.controls.forEach(c => {
        const fArrayChild = c.get(fArrayName) as FormArray
        console.log('mondongo: ', fArrayChild.controls.length)
        if (fArrayChild.controls.length > 1) this.eliminarUltimoFormArray(fArrayChild, fArrayName)
      })
    }, 1000)
  }

  eliminarUltimoFormArray(fArray:FormArray, fArrayName:string){
    fArray.removeAt(fArray.length - 1);

    fArray.controls.forEach(c => {
      const fArrayChild = c.get(fArrayName) as FormArray
      if (fArrayChild.controls.length > 1) this.eliminarUltimoFormArray(fArrayChild, fArrayName)
    })
  }

}
