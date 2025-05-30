import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/models/login/login.component';
import { ClienteComponent } from './core/models/cliente/cliente.component';
import { ErrorComponent } from './core/models/error/error.component';
import { RegistroComponent } from './core/models/registro/registro.component';

// Definición de las rutas de la aplicación
const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: '', component: LoginComponent},

  {path: 'cliente', component: ClienteComponent},
  {path: 'registro', component:RegistroComponent},



//  // Rutas de error
  {path: 'error', component:ErrorComponent},
  {path:'**', redirectTo: 'error', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
