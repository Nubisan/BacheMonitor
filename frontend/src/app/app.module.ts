import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { MenuOperatorComponent } from './components/menu-operator/menu-operator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { PerfilComponent } from './components/perfil/perfil.component';
// import { SensorDataComponent } from './components/sensor-data/sensor-data.component';
import {SensordataComponent} from './components/sensordata/sensordata.component';
import { FloatingWindowComponent } from './components/floating-window/floating-window.component';
import { MapaComponent } from './components/mapa/mapa.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    MenuAdminComponent,
    MenuOperatorComponent,
    PerfilComponent,
    FloatingWindowComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    SensordataComponent,
    MapaComponent
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
