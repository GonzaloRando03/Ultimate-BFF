import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { getUsuarioStorage } from './shared/utils/storage';
import { Toast, ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'UltimateBFF';
  toast:Toast | null = null
  salidaToast:boolean = false

  constructor(private userService:UserService, private toastService:ToastService){}

  async ngOnInit(): Promise<void> {
    const usuario = getUsuarioStorage()
    this.userService.setUser(usuario)

    this.initToast()
    await this.userService.inicializarUsuario()
  }

  initToast(){
    this.toastService.getToast().subscribe(data => {
      this.toast = data
      this.salidaToast = false
      setTimeout(()=>{
        this.salidaToast = true
      }, 4710)
      setTimeout(()=>{
        this.salidaToast = false
      }, 1000)
    })
  }
}
