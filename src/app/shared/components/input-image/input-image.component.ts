import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent {
  @Input() control: string = '';
  @Input() id: string = '';
  @Input() group!: FormGroup;
  image:string | null = null

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.convertirImagenABase64(file);
    }
  }

  convertirImagenABase64(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      // Asigna el valor en base64 al campo 'imagen' del formulario
      this.group.get(this.control)!.setValue(e.target.result);
      this.image = e.target.result
    };

    reader.readAsDataURL(file);
  }

  eliminarImagen(){
    this.group.get(this.control)!.setValue('');
    this.image = null
  }
}
