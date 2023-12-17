import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { getUsuarioStorage } from './shared/utils/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'UltimateBFF';

  constructor(private userService:UserService){}

  ngOnInit(): void {
    const usuario = getUsuarioStorage()
    this.userService.setUser(usuario)
  }
}
