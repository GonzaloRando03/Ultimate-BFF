import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PARAM_TYPES } from 'src/app/core/constants/selectValues';
import { RequestParam } from 'src/app/core/models/endpoint.model';

@Component({
  selector: 'app-form-params',
  templateUrl: './form-params.component.html',
  styleUrls: ['./form-params.component.scss']
})
export class FormParamsComponent {
  @Input() group!: FormGroup;
  @Input() init: boolean = false;
  @Input() fArrayName:string = ''
  objectValues = PARAM_TYPES

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
    const body = this.fb.group({
      nombre: new FormControl(''),
      type: new FormControl(''),
    })

    this.bodyFormArray.push(body)
  }

  eliminarBody(i:number) {
    this.bodyFormArray.controls.splice(i, 1)
  }

  obtenerFormGroupBody(i:number){
    return this.bodyFormArray.at(i) as FormGroup
  }

}