import { Component } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  login: boolean = false;
  user: Usuario | null = null

  constructor(private userService:UserService){
    this.userService.getUser().subscribe(data => {
      this.user = data
      this.login = this.user !== null
    })
  }
}
