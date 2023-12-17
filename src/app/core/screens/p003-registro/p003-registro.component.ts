import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { FormValidationError, registroValidationSchema } from 'src/app/shared/utils/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p003-registro',
  templateUrl: './p003-registro.component.html',
  styleUrls: ['./p003-registro.component.scss'],
})
export class P003RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private toast: ToastService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  async registro() {
    try {
      const data = {
        nombre: this.registroForm.get('nombre')?.value,
        apellidos: this.registroForm.get('apellidos')?.value,
        email: this.registroForm.get('email')?.value,
        password: this.registroForm.get('password')?.value,
      }

      await registroValidationSchema.validate(data)

      if (this.registroForm.get('password')?.value !== this.registroForm.get('password2')?.value){
        this.toast.error('Error en el formulario', 'Las contraseñas no son iguales')
        return
      }

      const response = await this.userService.registroEmailContrasena(
        data.email, 
        data.password, 
        data.nombre, 
        data.apellidos
      )

      if (response === null) return 

      this.router.navigate(['/'])
      
    } catch (error: FormValidationError) {
      if (error.message){
        this.toast.error('Error en el formulario', error.message)
        return
      }
      
    }
  }
}
