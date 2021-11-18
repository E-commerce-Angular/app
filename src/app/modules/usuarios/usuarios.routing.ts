import { Routes } from "@angular/router";

import { CrearUsuarioComponent } from "./usuario/crear-usuario.component";
import { ConsultarUsuarioComponent } from "./consulta-usuario/consulta-usuario.component";

export const UsuariosRoutes: Routes = [
  {
    path: 'crearUsuario',
    component: CrearUsuarioComponent,
    data: { title: "", breadcrumb: "USUARIO" },
  },
  {
    path: 'consultarUsuario',
    component: ConsultarUsuarioComponent,
    data: { title: "", breadcrumb: "USUARIO" },
  },
];
