import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { MenuOperatorComponent } from './components/menu-operator/menu-operator.component';
import { AuthService } from './services/auth.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SensorDataService } from './services/sensor-data.service';
// import { SensorDataComponent } from './components/sensor-data/sensor-data.component';
import {SensordataComponent} from './components/sensordata/sensordata.component'
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menuAdmin', component: MenuAdminComponent, canActivate: [AuthService] },
  { path: 'editUser/:userId', component: RegisterComponent, canActivate: [AuthService] },
  { path: 'menuOperator', component: MenuOperatorComponent, canActivate: [AuthService] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthService] },
   { path: 'reporte', component: SensordataComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
