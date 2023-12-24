import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OBJECT_TYPES } from 'src/app/core/constants/selectValues';

@Component({
  selector: 'app-form-object',
  templateUrl: './form-object.component.html',
  styleUrls: ['./form-object.component.scss']
})
export class FormObjectComponent implements OnInit{
  @Input() group!: FormGroup;
  @Input() init: boolean = false;
  objectValues = OBJECT_TYPES

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    if (this.init){
      this.aniadirBody()
    }
  }

  get bodyFormArray(): FormArray {
    return this.group.get('body') as FormArray
  }

  aniadirBody() {
    const body = this.fb.group({
      nombre: new FormControl(''),
      type: new FormControl(''),
      body: this.fb.array([])
    })

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
    console.log(value, 'asdf')
    return value === 'Object'
  }
}
