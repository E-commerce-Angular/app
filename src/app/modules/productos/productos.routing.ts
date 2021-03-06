import { Routes } from '@angular/router';

import { CrearProductoComponent } from './producto/crear-producto.component';
import { ConsultarProductoComponent } from './consulta-productos/consulta-producto.component';

export const ProductosRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'crearProducto',
      component: CrearProductoComponent,
      data: { title: '', breadcrumb: 'PRODUCTO' }
    }]
  },
  {
    path: 'producto',
    children: [{
      path: 'consultarProducto',
      component: ConsultarProductoComponent,
      data: { title: '', breadcrumb: 'PRODUCTO' }
    }]
  }
];