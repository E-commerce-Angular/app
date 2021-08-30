import { Routes } from '@angular/router';

import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';


export const UsuariosRoutes: Routes = [
  {
    path: 'usuario',
    children: [{
      path: 'crearUsuario',
      component: CrearUsuarioComponent,
      data: { title: '', breadcrumb: 'USUARIO' }
    }]
  }
];