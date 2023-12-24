import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent {
  @Input() titulo:string = ''
  @Input() id:string = ''
  @Input() elements:DropDownElement[] = []
}

export interface DropDownElement {
  titulo:string
  hasLink:boolean
  link?:string
}
