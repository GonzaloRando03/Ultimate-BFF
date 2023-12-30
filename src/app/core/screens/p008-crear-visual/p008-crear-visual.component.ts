import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponenteVisual, Visual } from '../../models/endpoint.model';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { EndpointsService } from '../../services/endpoints.service';
import { UserService } from '../../services/user.service';
import { ProyectoService } from '../../services/proyecto.service';
import { FireStorageService } from '../../services/fire-storage.service';

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
    private fireStorageService:FireStorageService,
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
    this.aniadirLlamadaFormArray(this.componentesFormArray.length - 1)
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

  obtenerFormGroupLlamada(iComponente:number, iLlamada:number) {
    return this.getLlamadasFormArray(iComponente).controls[iLlamada] as FormGroup
  }

  async aniadirComponenteVisual(){
    try {
      if (!this.visualForm.valid){
        this.toast.info('Faltan datos', 'Debes rellenar todos los campos obligatorios')
        return
      }

      this.loading = true
  
      const componenteVisual: ComponenteVisual = {
        idProyecto: this.idProyecto,
        nombre: this.visualForm.get('nombre')!.value,
        componentes: await this.obtenerComponentesFormGroup()
      }
  
      if (this.editar){
        await this.endpointService.actualizarVisual(this.idVisual, componenteVisual)
        this.toast.success('Componente visual actualizado', 'El componente visual se ha actualizado correctamente')
      
      } else {
        await this.endpointService.crearVisualPantalla(componenteVisual)
        this.toast.success('Componente visual añadido', 'El componente visual se ha añadido correctamente')
      }
  
      this.loading = false
      this.router.navigate(['/proyecto/' + this.idProyecto])

    } catch (error) {
      this.toast.error('Error inesperado', 'Ha ocurrido un error al añadir el componente')
      this.loading = false
    }
  }

  async rellenarFormulario(){
    this.visualForm.get('nombre')!.setValue(this.visual.nombre)

    this.visual.componentes.forEach(c => {
      const formComponente:any = {
        image: new FormControl(c.image),
        descripcion: new FormControl(c.descripcion),
      }

      formComponente.llamadas = this.fb.array([])

      c.llamadas.forEach(l => {
        formComponente.llamadas.push(
          this.fb.group({
            nombre: new FormControl(l.nombre),
            idEndpoint: new FormControl(l.idEndpoint),
          })
        )
      })

      const componentFormGroup = this.fb.group(formComponente)

      this.componentesFormArray.push(componentFormGroup)
    })
  }

 
  async obtenerComponentesFormGroup(){
    const objectsPromises: Promise<Visual>[] = this.componentesFormArray.controls.map( async (c, i) => {
      const llamadasFormArray = this.getLlamadasFormArray(i)

      const imageUrl = await this.fireStorageService.uploadImage(c.get('image')!.value, this.idProyecto)

      const objectCell:Visual = {
        image: imageUrl,
        descripcion: c.get('descripcion')!.value,
        llamadas: llamadasFormArray.controls.map(l => {
          return {
            idEndpoint: l.get('idEndpoint')!.value,
            nombre: l.get('nombre')!.value,
          }
        })
      }
      return objectCell
    })

    const objectsCells = await Promise.all(objectsPromises)
  
    return objectsCells
  }
}
