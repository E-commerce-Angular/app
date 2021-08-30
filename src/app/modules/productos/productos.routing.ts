import { Routes } from '@angular/router';

import { CrearProductoComponent } from './producto/crear-producto.component';


export const ProductosRoutes: Routes = [
  {
    path: 'producto',
    children: [{
      path: 'crearProducto',
      component: CrearProductoComponent,
      data: { title: '', breadcrumb: 'PRODUCTO' }
    }]
  }
];