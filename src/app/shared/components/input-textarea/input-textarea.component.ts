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

  
  autoExpand(event: any): void {
    const textarea = event.target;
  
    textarea.style.height = 'auto'; // Restablece la altura a auto para obtener la altura deseada
    textarea.style.height = `${textarea.scrollHeight}px`; // Establece la altura según el contenido
  }
}
