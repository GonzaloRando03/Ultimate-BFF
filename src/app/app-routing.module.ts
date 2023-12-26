import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P001HomeComponent } from './core/screens/p001-home/p001-home.component';
import { P002LoginComponent } from './core/screens/p002-login/p002-login.component';
import { P003RegistroComponent } from './core/screens/p003-registro/p003-registro.component';
import { P004DashboardComponent } from './core/screens/p004-dashboard/p004-dashboard.component';
import { CanActivateUser } from './shared/security/CanActivateUser';
import { CanActivateNoUser } from './shared/security/CanActivateNoUser';
import { P005ProyectoComponent } from './core/screens/p005-proyecto/p005-proyecto.component';
import { P006CrearGenericoComponent } from './core/screens/p006-crear-generico/p006-crear-generico.component';
import { P007CrearPantallaComponent } from './core/screens/p007-crear-pantalla/p007-crear-pantalla.component';
import { P008CrearVisualComponent } from './core/screens/p008-crear-visual/p008-crear-visual.component';
import { P009VerGenericoComponent } from './core/screens/p009-ver-generico/p009-ver-generico.component';
import { P010VerPantallaComponent } from './core/screens/p010-ver-pantalla/p010-ver-pantalla.component';
import { P011VerVisualComponent } from './core/screens/p011-ver-visual/p011-ver-visual.component';

const routes: Routes = [
  { path: '', component: P001HomeComponent },
  { path: 'login', component: P002LoginComponent, canActivate: [CanActivateNoUser] },
  { path: 'registro', component: P003RegistroComponent, canActivate: [CanActivateNoUser] },
  { path: 'dashboard', component: P004DashboardComponent, canActivate: [CanActivateUser] },
  { path: 'proyecto/:id', component: P005ProyectoComponent, canActivate: [CanActivateUser] },
  { path: 'nuevoGenerico/:id', component: P006CrearGenericoComponent, canActivate: [CanActivateUser] },
  { path: 'nuevaPantalla/:id', component: P007CrearPantallaComponent, canActivate: [CanActivateUser] },
  { path: 'nuevoVisual/:id', component: P008CrearVisualComponent, canActivate: [CanActivateUser] },
  { path: 'generico/:id', component: P009VerGenericoComponent, canActivate: [CanActivateUser] },
  { path: 'pantalla/:id', component: P010VerPantallaComponent, canActivate: [CanActivateUser] },
  { path: 'visual/:id', component: P011VerVisualComponent, canActivate: [CanActivateUser] },
  { path: '**', component: P001HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
