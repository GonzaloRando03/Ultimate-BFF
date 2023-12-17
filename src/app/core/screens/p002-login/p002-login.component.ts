import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FormValidationError, loginValidationSchema } from 'src/app/shared/utils/validators';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-p002-login',
  templateUrl: './p002-login.component.html',
  styleUrls: ['./p002-login.component.scss'],
})
export class P002LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService:UserService,
    private router: Router,
    private toast:ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async loginEmail(){
    try {
      const data = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      }

      await loginValidationSchema.validate(data)

      const response = await this.userService.loginEmailContrasena(
        data.email, 
        data.password, 
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


  async loginGoogle(){
    await this.userService.loginGoogle()
    this.router.navigate(['/'])
  }
}
