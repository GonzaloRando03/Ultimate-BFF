import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() options:string[] = []
  @Input() optionSelected:number = 0
  @Output() selectOption = new EventEmitter<number>();

  cambiarDeOpcion(i:number){
    this.selectOption.emit(i)
  }
}
