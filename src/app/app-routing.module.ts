import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P001HomeComponent } from './core/screens/p001-home/p001-home.component';
import { P002LoginComponent } from './core/screens/p002-login/p002-login.component';
import { P003RegistroComponent } from './core/screens/p003-registro/p003-registro.component';

const routes: Routes = [
  { path: '', component: P001HomeComponent },
  { path: 'login', component: P002LoginComponent },
  { path: 'registro', component: P003RegistroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
