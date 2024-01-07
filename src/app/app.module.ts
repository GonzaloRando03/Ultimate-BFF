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
import { P007CrearPantallaComponent } from './core/screens/p007-crear-pantalla/p007-crear-pantalla.component';
import { P008CrearVisualComponent } from './core/screens/p008-crear-visual/p008-crear-visual.component';
import { P009VerGenericoComponent } from './core/screens/p009-ver-generico/p009-ver-generico.component';
import { P010VerPantallaComponent } from './core/screens/p010-ver-pantalla/p010-ver-pantalla.component';
import { P011VerVisualComponent } from './core/screens/p011-ver-visual/p011-ver-visual.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import hljs  from 'highlight.js';
import { CodeComponent } from './shared/components/code/code.component';
import { InputImageComponent } from './shared/components/input-image/input-image.component';
import { AngularFireModule } from "@angular/fire/compat";
import { FooterComponent } from './shared/components/footer/footer.component';
import { P100DocsComponent } from './core/screens/p100-docs/p100-docs.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { EndpointsGenericosComponent } from './core/screens/p005-proyecto/endpoints-genericos/endpoints-genericos.component';
import { EndpointsPantallaComponent } from './core/screens/p005-proyecto/endpoints-pantalla/endpoints-pantalla.component';
import { ComponentesVisualesComponent } from './core/screens/p005-proyecto/componentes-visuales/componentes-visuales.component';
import { ParticipantesComponent } from './core/screens/p005-proyecto/participantes/participantes.component';
import { InputCheckComponent } from './shared/components/input-check/input-check.component';

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
    P007CrearPantallaComponent,
    P008CrearVisualComponent,
    P009VerGenericoComponent,
    P010VerPantallaComponent,
    P011VerVisualComponent,
    CodeComponent,
    InputImageComponent,
    FooterComponent,
    P100DocsComponent,
    TabsComponent,
    EndpointsGenericosComponent,
    EndpointsPantallaComponent,
    ComponentesVisualesComponent,
    ParticipantesComponent,
    InputCheckComponent,
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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,
    BrowserAnimationsModule,
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          javascript: () => import('highlight.js/lib/languages/javascript'),
          json: () => import('highlight.js/lib/languages/json'),
        },
        themePath: "assets/styles/obsidian.css"
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
