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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore(initializeApp(firebaseConfig))),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
