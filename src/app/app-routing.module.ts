import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P001HomeComponent } from './core/screens/p001-home/p001-home.component';
import { P002LoginComponent } from './core/screens/p002-login/p002-login.component';
import { P003RegistroComponent } from './core/screens/p003-registro/p003-registro.component';
import { P004DashboardComponent } from './core/screens/p004-dashboard/p004-dashboard.component';
import { CanActivateUser } from './shared/security/CanActivateUser';
import { CanActivateNoUser } from './shared/security/CanActivateNoUser';

const routes: Routes = [
  { path: '', component: P001HomeComponent },
  { path: 'login', component: P002LoginComponent, canActivate: [CanActivateNoUser] },
  { path: 'registro', component: P003RegistroComponent, canActivate: [CanActivateNoUser]},
  { path: 'dashboard', component: P004DashboardComponent, canActivate: [CanActivateUser] },
  { path: '**', component: P001HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
