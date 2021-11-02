import { Routes } from "@angular/router";


import { AdminLayoutComponent } from "./shared/components/layouts/admin-layout/admin-layout.component";
import { ConsultarProductoComponent } from "./modules/productos/consulta-productos/consulta-producto.component";

export const rootRouterConfig: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: ConsultarProductoComponent,
  },
 
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "auth",
        loadChildren: () =>
          import("./modules/autenticaciones/autenticaciones.module").then(
            (m) => m.AutenticacionesModule
          ),
        data: { title: "" },
      },
  { 
    path: "producto",
    loadChildren: () =>
      import("./modules/productos/productos.module").then(
        (m) => m.ProductosModule
      ),
    data: { title: "Producto" },
  },  
        {
        path: "usuario",
        loadChildren: () =>
          import("./modules/usuarios/usuarios.module").then(
            m => m.UsuariosModule
          ),
        data: { title: "Usuario" }
      }
    ],
  },
  // {
  //   path: "",
  //   component: AuthLayoutComponent,
  //   children: [
  //     {
  //       path: "sessions",
  //       loadChildren: () =>
  //         import("./views/sessions/sessions.module").then(
  //           m => m.SessionsModule
  //         ),
  //       data: { title: "Session" }
  //     }
  //   ]
  // },
  // {
  //   path: "",
  //   component: AdminLayoutComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: "others",
  //       loadChildren: () =>
  //         import("./views/others/others.module").then(m => m.OthersModule),
  //       data: { title: "Others", breadcrumb: "OTHERS" }
  //     }
  //   ]
  // },
  {
    path: "**",
    redirectTo: "sessions/404",
  },
];
