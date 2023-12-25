import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { P001HomeComponent } from './core/screens/p001-home/p001-home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { firebaseConfig } from 'src/environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { P002LoginComponent } from './core/screens/p002-login/p002-login.component';
import { InputTextComponent } from './shared/components/input-text/input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputPasswordComponent } from './shared/components/input-password/input-password.component';
import { P003RegistroComponent } from './core/screens/p003-registro/p003-registro.component';
import { P004DashboardComponent } from './core/screens/p004-dashboard/p004-dashboard.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { P005ProyectoComponent } from './core/screens/p005-proyecto/p005-proyecto.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { DropDownComponent } from './shared/components/drop-down/drop-down.component';
import { P006CrearGenericoComponent } from './core/screens/p006-crear-generico/p006-crear-generico.component';
import { InputSelectComponent } from './shared/components/input-select/input-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FormObjectComponent } from './shared/components/form-object/form-object.component';
import { InputTextareaComponent } from './shared/components/input-textarea/input-textarea.component';
import { FormParamsComponent } from './shared/components/form-params/form-params.component';

@NgModule({
  declarations: [
    AppComponent,
    P001HomeComponent,
    HeaderComponent,
    SidebarComponent,
    P002LoginComponent,
    InputTextComponent,
    InputPasswordComponent,
    P003RegistroComponent,
    P004DashboardComponent,
    ModalComponent,
    P005ProyectoComponent,
    LoaderComponent,
    DropDownComponent,
    P006CrearGenericoComponent,
    InputSelectComponent,
    FormObjectComponent,
    InputTextareaComponent,
    FormParamsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore(initializeApp(firebaseConfig))),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
