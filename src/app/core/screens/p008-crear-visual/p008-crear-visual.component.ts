import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponenteVisual, EndpointPantalla, ObjectCell } from '../../models/endpoint.model';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { EndpointsService } from '../../services/endpoints.service';
import { UserService } from '../../services/user.service';
import { ProyectoService } from '../../services/proyecto.service';
import { obtenerObjetoFormGroup, obtenerParamsFormGroup } from 'src/app/shared/utils/codeFormater';

@Component({
  selector: 'app-p008-crear-visual',
  templateUrl: './p008-crear-visual.component.html',
  styleUrls: ['./p008-crear-visual.component.scss']
})
export class P008CrearVisualComponent implements OnInit{
  idProyecto:string = ''
  idVisual:string = ''
  visualForm:FormGroup
  pantallasValues:any
  loading:boolean = false
  editar:boolean = false
  visual!:ComponenteVisual
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
    this.visualForm = this.fb.group({
      nombre: ['', Validators.required],
      componentes: this.fb.array([]),
    })
  }

  async ngOnInit(): Promise<void> {
    this.editar = window.location.href.includes('editarVisual')
    this.usuario = this.usuarioService.getUserValue()

    if (this.editar){
      this.loading = true

      this.idVisual = this.aRouter.snapshot.params['id']
      this.visual = 
        await this.endpointService.obtenerVisualPorId(this.idVisual) as ComponenteVisual

      this.idProyecto = this.visual.idProyecto
    
      this.rellenarFormulario()

    } else {
      this.aniadirComponenteFormArray()
      this.aniadirLlamadaFormArray(0)
      this.idProyecto = this.aRouter.snapshot.params['id']
    }

    const pantallas = await this.endpointService.obtenerPantallasProyecto(this.idProyecto)
    this.pantallasValues = pantallas?.map(g => {
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

  get componentesFormArray(): FormArray {
    return this.visualForm.get('componentes') as FormArray
  }

  getComponenteFormGroup(i:number){
    return this.componentesFormArray.controls[i] as FormGroup
  }

  getLlamadasFormArray(i:number){
    return this.componentesFormArray.controls[i].get('llamadas') as FormArray
  }

  aniadirComponenteFormArray() {
    const componente = this.fb.group({
      image: ['', Validators.required],
      llamadas: this.fb.array([]),
      descripcion: ['']
    })

    this.componentesFormArray.push(componente)
  }

  aniadirLlamadaFormArray(i:number){
    const llamada = this.fb.group({
      idEndpoint: ['', Validators.required],
      nombre: ['', Validators.required],
    })

    this.getLlamadasFormArray(i).push(llamada)
  }

  eliminarComponente(i:number) {
    this.componentesFormArray.controls.splice(i, 1)
  }

  eliminarLlamada(iComponente:number, iLlamada:number){
    this.getLlamadasFormArray(iComponente).controls.splice(iLlamada, 1)
  }

  obtenerFormGroupComponentes(i:number){
    return this.componentesFormArray.at(i) as FormGroup
  }

  async aniadirComponenteVisual(){
    try {
      if (!this.visualForm.valid){
        this.toast.info('Faltan datos', 'Debes rellenar todos los campos obligatorios')
        return
      }

      this.loading = true
  
      const endpoint: EndpointPantalla = {
        idProyecto: this.idProyecto,
        nombre: this.visualForm.get('nombre')!.value,
        url: this.visualForm.get('url')!.value,
        metodo: this.visualForm.get('metodo')!.value,
        descripcion: this.visualForm.get('descipcion')!.value,
        idEndpointGenerico: this.visualForm.get('generico')!.value,
        requestBody: obtenerObjetoFormGroup(this.visualForm, 'body'),
        response: obtenerObjetoFormGroup(this.visualForm, 'response'),
        requestParams: obtenerParamsFormGroup(this.visualForm, 'params')
      }
  
      if (this.editar){
        await this.endpointService.actualizarPantalla(this.idVisual, endpoint)
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
