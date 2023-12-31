import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { METHODS } from '../../constants/selectValues';
import { ToastService } from '../../services/toast.service';
import { EndpointGenerico, ObjectCell, RevisorValue } from '../../models/endpoint.model';
import { EndpointsService } from '../../services/endpoints.service';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';
import { ProyectoService } from '../../services/proyecto.service';
import { obtenerObjetoFormGroup, obtenerParamsFormGroup } from 'src/app/shared/utils/codeFormater';
import { Carpeta, CarpetaValue } from '../../models/carpeta.model';
import { CarpetaService } from '../../services/carpeta.service';

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
  revisoresValues: RevisorValue[] = []
  loading:boolean = false
  editar:boolean = false
  endpoint!:EndpointGenerico
  usuario:Usuario | null = null
  carpetasValues:CarpetaValue[] = []

  constructor(
    private aRouter:ActivatedRoute,
    private fb:FormBuilder,
    private toast:ToastService,
    private endpointService:EndpointsService,
    private usuarioService:UserService,
    private proyectoService:ProyectoService,
    private carpetaService:CarpetaService,
    private router:Router
  ){
    this.genericoForm = this.fb.group({
      carpeta: ['', Validators.required],
      metodo: ['', Validators.required],
      url: ['', Validators.required],
      nombre: ['', Validators.required],
      consulta: [''],
      descipcion: [''],
      body: this.fb.array([]),
      params: this.fb.array([]),
      response: this.fb.array([]),
      revisores: this.fb.array([]),
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
    
      await this.rellenarFormulario()
      this.loading = false

    } else {
      this.idProyecto = this.aRouter.snapshot.params['id']
    }

    this.revisoresValues = await this.proyectoService.obtenerUsuariosRevisores(this.idProyecto)
    const carpetas = await this.carpetaService.obtenerCarpetasGenericasProyecto(this.idProyecto) as Carpeta[]
    this.carpetasValues = carpetas.map(c => {
      return {
        name: c.nombre,
        value: c.id!
      }
    })

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
        requestParams: obtenerParamsFormGroup(this.genericoForm, 'params'),
        revisores: this.revisoresFormArray.controls.map(c => {
          return {
            uid: c.get('uid')!.value,
            revisado: false
          }
        })
      }

  
      if (this.editar){
        await this.endpointService.actualizarGenerico(this.idEndpoint, endpoint)
        this.toast.success('Endpoint actualizado', 'El endpoint se ha actualizado correctamente')
      
      } else {
        this.idEndpoint = await this.endpointService.crearEndpointGenerico(endpoint) as string
        this.toast.success('Endpoint añadido', 'El endpoint se ha añadido correctamente')
      }

      await this.carpetaService.aniadirEndpointACarpetaGenerica(
        this.genericoForm.get('carpeta')!.value,
        this.idEndpoint 
      )
  
      this.loading = false
      this.router.navigate(['/proyecto/' + this.idProyecto])

    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al añadir el endpoint')
      this.loading = false
    }
  }

  async rellenarFormulario(){
    this.genericoForm.get('metodo')!.setValue(this.endpoint.metodo)
    this.genericoForm.get('nombre')!.setValue(this.endpoint.nombre)
    this.genericoForm.get('url')!.setValue(this.endpoint.url)
    this.genericoForm.get('consulta')!.setValue(this.endpoint.consultaDB)
    this.genericoForm.get('descipcion')!.setValue(this.endpoint.descripcion)

    const carpeta = await this.carpetaService.obtenerCarpetasEndpointGenerico(this.idEndpoint) as Carpeta[]
    this.genericoForm.get('carpeta')!.setValue(carpeta[0].id)

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

    this.endpoint.revisores?.forEach(r => {
      const fGroup = this.fb.group({
        uid: [r.uid, Validators.required]
      })

      this.revisoresFormArray.push(fGroup)
    })
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

  get revisoresFormArray(): FormArray {
    return this.genericoForm.get('revisores') as FormArray
  }

  getRevisoresFormGroup(i:number){
    return this.revisoresFormArray.controls[i] as FormGroup
  }

  aniadirRevisorFormArray() {
    const componente = this.fb.group({
      uid: ['', Validators.required],
    })

    this.revisoresFormArray.push(componente)
  }

  eliminarRevisor(i:number) {
    this.revisoresFormArray.controls.splice(i, 1)
  }

}
