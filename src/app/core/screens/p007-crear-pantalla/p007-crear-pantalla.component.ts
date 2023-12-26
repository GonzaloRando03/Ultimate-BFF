import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { METHODS } from '../../constants/selectValues';
import { EndpointGenerico, EndpointPantalla, ObjectCell } from '../../models/endpoint.model';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { EndpointsService } from '../../services/endpoints.service';
import { UserService } from '../../services/user.service';
import { ProyectoService } from '../../services/proyecto.service';
import { obtenerObjetoFormGroup, obtenerParamsFormGroup } from 'src/app/shared/utils/codeFormater';

@Component({
  selector: 'app-p007-crear-pantalla',
  templateUrl: './p007-crear-pantalla.component.html',
  styleUrls: ['./p007-crear-pantalla.component.scss']
})
export class P007CrearPantallaComponent implements OnInit, AfterViewInit{
  idProyecto:string = ''
  idEndpoint:string = ''
  pantallaForm:FormGroup
  methodsValues = METHODS
  genericosValues:any
  loading:boolean = false
  editar:boolean = false
  endpoint!:EndpointPantalla
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
    this.pantallaForm = this.fb.group({
      metodo: ['', Validators.required],
      url: ['', Validators.required],
      nombre: ['', Validators.required],
      generico: ['', Validators.required],
      consulta: [''],
      descipcion: [''],
      body: this.fb.array([]),
      params: this.fb.array([]),
      response: this.fb.array([]),
    })
  }

  async ngOnInit(): Promise<void> {
    this.editar = window.location.href.includes('editarPantalla')
    this.usuario = this.usuarioService.getUserValue()

    if (this.editar){
      this.loading = true

      this.idEndpoint = this.aRouter.snapshot.params['id']
      this.endpoint = 
        await this.endpointService.obtenerEndpointPantallaPorId(this.idEndpoint) as EndpointPantalla

      this.idProyecto = this.endpoint.idProyecto
    
      this.rellenarFormulario()

    } else {
      this.idProyecto = this.aRouter.snapshot.params['id']
    }

    const genericos = await this.endpointService.obtenerGenericosProyecto(this.idProyecto)
    this.genericosValues = genericos?.map(g => {
      return {
        name: g.nombre,
        value: g.id
      }
    })

    const permisos = 
      await this.proyectoService.getPermisosProyecto(this.usuario?.uid!, this.idProyecto)

    if (!permisos){
      this.toast.warning('Sin permisos', 'No tienes permisos para acceder a este proyecto')
      this.router.navigate(['/'])
    }
    this.loading = false
  }

  ngAfterViewInit(): void {
    if (this.editar){
      const bodyFormArray = this.pantallaForm.get('body') as FormArray
      this.eliminarCamposInecesarios(bodyFormArray, 'body')
  
      const responseFormArray = this.pantallaForm.get('response') as FormArray
      this.eliminarCamposInecesarios(responseFormArray, 'response')
    }
  }

  obtenerFormArray(nombre:string){
    return this.pantallaForm.get(nombre) as FormArray
  }

  async aniadirEndpointPantalla(){
    try {
      if (!this.pantallaForm.valid){
        this.toast.info('Faltan datos', 'Debes rellenar todos los campos obligatorios')
        return
      }

      this.loading = true
  
      const endpoint: EndpointPantalla = {
        idProyecto: this.idProyecto,
        nombre: this.pantallaForm.get('nombre')!.value,
        url: this.pantallaForm.get('url')!.value,
        metodo: this.pantallaForm.get('metodo')!.value,
        descripcion: this.pantallaForm.get('descipcion')!.value,
        idEndpointGenerico: this.pantallaForm.get('generico')!.value,
        requestBody: obtenerObjetoFormGroup(this.pantallaForm, 'body'),
        response: obtenerObjetoFormGroup(this.pantallaForm, 'response'),
        requestParams: obtenerParamsFormGroup(this.pantallaForm, 'params')
      }
  
      if (this.editar){
        await this.endpointService.actualizarPantalla(this.idEndpoint, endpoint)
        this.toast.success('Endpoint actualizado', 'El endpoint se ha actualizado correctamente')
      
      } else {
        await this.endpointService.crearEndpointPantalla(endpoint)
        this.toast.success('Endpoint añadido', 'El endpoint se ha añadido correctamente')
      }
  
      this.loading = false
      this.router.navigate(['/proyecto/' + this.idProyecto])

    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al añadir el endpoint')
      this.loading = false
    }
  }

  async rellenarFormulario(){
    this.pantallaForm.get('metodo')!.setValue(this.endpoint.metodo)
    this.pantallaForm.get('nombre')!.setValue(this.endpoint.nombre)
    this.pantallaForm.get('url')!.setValue(this.endpoint.url)
    this.pantallaForm.get('descipcion')!.setValue(this.endpoint.descripcion)    
    this.pantallaForm.get('generico')!.setValue(this.endpoint.idEndpointGenerico)

    const paramsFormArray = this.pantallaForm.get('params') as FormArray

    this.endpoint.requestParams.forEach(p => {
      const fGroup = this.fb.group({
        nombre: new FormControl(p.nombre),
        type: new FormControl(p.type),
      })

      paramsFormArray.push(fGroup)
    })

    const bodyFormArray = this.pantallaForm.get('body') as FormArray
    this.rellenarBody(this.endpoint.requestBody, bodyFormArray, 'body')

    const responseFormArray = this.pantallaForm.get('response') as FormArray
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
