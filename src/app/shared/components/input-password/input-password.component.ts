import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent {
  @Input() control: string = '';
  @Input() group!: FormGroup;
  @Input() placeholder: string = '';
  mostrar: boolean = false;
}
