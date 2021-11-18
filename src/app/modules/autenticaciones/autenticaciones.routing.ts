import { Routes } from '@angular/router';

import {RegistrarUsuarioComponent} from "./registro-usuario/registro-usuario.component"; 
import {LoginUsuarioComponent} from "./login-usuario/login-usuario.component"

export const AutenticacionesRoutes: Routes = [
  {
    path: 'login',
      component: LoginUsuarioComponent,
      data: { title: '', breadcrumb: 'AUTENTICACION' }
   
  },
  {
    path: 'registro',
      component: RegistrarUsuarioComponent,
      data: { title: '', breadcrumb: 'AUTENTICACION' }

  },

];