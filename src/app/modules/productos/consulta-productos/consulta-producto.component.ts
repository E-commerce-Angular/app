import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ProductoService } from "../services/productos.service";

import { io } from "socket.io-client";
import { environment } from "./../../../../environments/environment";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { MatTabBody } from "@angular/material/tabs";
pdfMake.vsf = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-consulta-producto",
  templateUrl: "consulta-producto.component.html",
  styleUrls: ["consulta-producto.component.css"],
})
export class ConsultarProductoComponent implements OnInit, OnDestroy {
  private socket;
  productos: any[] = [];
  pdfMake: any;

  constructor(private usuarioService: ProductoService, private router: Router) {
    this.socket = io(environment.WS).on("connect", () => {
      //Coneccion con socket
      console.log("Socket conectado en angular");
    });
    this.socket.on("crearProducto", (producto: any) => {}); //Llama a la api con la clave crearProducto. producto es lo que llega
    this.socket.emit("borrarProducto", "Producto Borrado"); //Primero el nombre, luego el objeto
  }

  ngOnInit() {
    this.getProductos();
  }
  getProductos() {
    this.usuarioService.getProductos().subscribe((data: any) => {
      if (data.status === "success") {
        this.productos = data.data;
      }
    });
  }

  registro() {
    this.router.navigate(["auth/registro"]);
  }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async generarPDF(){

    await this.loadPdfMaker();
    const def = { 
      content: [
        {
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                'NOMBRE DEL PRODUCTO',
                'PRECIO'
              ],
              [
                this.productos[0].nombreProducto,
                '$'+this.productos[0].precio
              ],
              [
                this.productos[1].nombreProducto,
                '$'+this.productos[1].precio
              ],
              [
                this.productos[2].nombreProducto,
                '$'+this.productos[2].precio
              ]
            ]
          }
        }
      ]
    };
    
    this.pdfMake.createPdf(def).open();
  }

  ngOnDestroy() {}
  
}
