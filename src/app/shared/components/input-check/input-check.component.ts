import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-check',
  templateUrl: './input-check.component.html',
  styleUrls: ['./input-check.component.scss']
})
export class InputCheckComponent {
  @Input() text: string = '';
  @Input() model: boolean = false;
  @Output() modelChange = new EventEmitter<boolean>();


  onCheckboxChange(event: any) {
    this.model = event.target.checked;
    this.modelChange.emit(this.model);
  }
}
