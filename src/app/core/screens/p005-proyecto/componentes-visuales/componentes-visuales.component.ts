import { Component, Input } from '@angular/core';
import { DropDownElement } from 'src/app/shared/components/drop-down/drop-down.component';

@Component({
  selector: 'app-componentes-visuales',
  templateUrl: './componentes-visuales.component.html',
  styleUrls: ['./componentes-visuales.component.scss']
})
export class ComponentesVisualesComponent {
  @Input() elements:DropDownElement[] = []
  @Input() idProyecto:string = ''
}
