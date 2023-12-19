import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/core/models/usuario.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  login: boolean = false;
  user: Usuario | null = null
  @Input() header1:boolean = true

  constructor(private userService:UserService, private location: Location){
    this.userService.getUser().subscribe(data => {
      this.user = data
      this.login = this.user !== null
    })
  }

  ngOnInit(): void {}

  async logout(){
    await this.userService.desloguearUsuario()
  }
}
