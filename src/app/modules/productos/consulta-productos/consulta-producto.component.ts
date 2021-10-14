import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductoService } from "../services/productos.service";
@Component({
  selector: "app-consulta-producto",
  templateUrl: "consulta-producto.component.html",
  styleUrls: ["consulta-producto.component.css"],
})

export class ConsultarProductoComponent implements OnInit, OnDestroy {
  constructor(private usuarioService: ProductoService) {}

  ngOnInit() {
    this.getProductos();
  }
  getProductos() {
    this.usuarioService.getProductos().subscribe(data => {
      //debugger;
    })
  }

  ngOnDestroy() {}
  
}