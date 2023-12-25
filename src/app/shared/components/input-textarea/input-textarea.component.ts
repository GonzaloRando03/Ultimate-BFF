import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent {
  @Input() control: string = '';
  @Input() placeholder: string = '';
  @Input() group!: FormGroup;
}
