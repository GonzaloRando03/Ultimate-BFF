import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {
  @Input() control: string = '';
  @Input() group!: FormGroup;
  @Input() values: SelectValue[] = [];

}

export interface SelectValue {
  name:string
  value:any
}
