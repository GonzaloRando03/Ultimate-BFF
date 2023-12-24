import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { METHODS } from '../../constants/selectValues';
import { ObjectCell } from '../../models/endpoint.model';

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
    private fb:FormBuilder
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

  obtenerObjetoFormGroup(formGroup:FormGroup){
    const bodyFormArray = formGroup.get('body') as FormArray
    const objectsCells:ObjectCell[] = bodyFormArray.controls.map(c => {
      const objectCell:ObjectCell = {
        type: c.get('type')!.value,
        nombre:  c.get('nombre')!.value
      }

      if (objectCell.type === 'Object'){     
        objectCell.content = this.obtenerObjetoFormGroup(c.get('body') as FormGroup)
        return objectCell
      } 

      if (objectCell.type === 'Array'){
        const arrayValue = c.get('arrayValue')!.value
        objectCell.content = arrayValue === 'Object'
          ? this.obtenerObjetoFormGroup(c.get('body') as FormGroup)
          : arrayValue

        return objectCell
      }


      return objectCell
    })

    return objectsCells
  }

}
