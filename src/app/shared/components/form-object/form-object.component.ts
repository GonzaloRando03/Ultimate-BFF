import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ARRAY_TYPES, OBJECT_TYPES } from 'src/app/core/constants/selectValues';
import { ObjectCell } from 'src/app/core/models/endpoint.model';

@Component({
  selector: 'app-form-object',
  templateUrl: './form-object.component.html',
  styleUrls: ['./form-object.component.scss']
})
export class FormObjectComponent implements OnInit{
  @Input() group!: FormGroup;
  @Input() init: boolean = false;
  @Input() fArrayName:string = ''
  objectValues = OBJECT_TYPES
  arrayValues = ARRAY_TYPES

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    if (this.init){
      this.aniadirBody()
    }
  }

  get bodyFormArray(): FormArray {
    return this.group.get(this.fArrayName) as FormArray
  }

  aniadirBody() {
    const fGroup:any = {
      nombre: new FormControl(''),
      type: new FormControl(''),
      arrayValue: new FormControl(''),
    }
    fGroup[this.fArrayName] = this.fb.array([])

    console.log(fGroup)

    const body = this.fb.group(fGroup)

    this.bodyFormArray.push(body)
  }

  eliminarBody(i:number) {
    this.bodyFormArray.controls.splice(i, 1)
  }

  obtenerFormGroupBody(i:number){
    return this.bodyFormArray.at(i) as FormGroup
  }

  comprobarObject(i:number){
    const value = this.obtenerFormGroupBody(i).get('type')!.value
    const arrayValue = this.obtenerFormGroupBody(i).get('arrayValue')!.value
    return value === 'Object'  || arrayValue === 'Object'
  }

  comprobarArray(i:number){
    const value = this.obtenerFormGroupBody(i).get('type')!.value
    return value === 'Array'
  }
}
