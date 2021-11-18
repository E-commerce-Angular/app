import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ProductoService } from "../services/productos.service";

import { io } from "socket.io-client";
import { environment } from "./../../../../environments/environment";

import * as XLSX from 'xlsx';

@Component({
  selector: "app-consulta-producto",
  templateUrl: "consulta-producto.component.html",
  styleUrls: ["consulta-producto.component.css"],
})
export class ConsultarProductoComponent implements OnInit, OnDestroy {
  private socket;
  productos: any[] = [];
  pdfMake: any;
  fileName = 'ExcelSheet.xlsx';

  constructor(private usuarioService: ProductoService, private router: Router) {
    this.socket = io(environment.WS).on("connect", () => {
      //Coneccion con socket
      console.log("Socket conectado en angular");
    });
    this.socket.on("crearProducto", (producto: any) => { }); //Llama a la api con la clave crearProducto. producto es lo que llega
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

  //Hace la importacion del pdfMake
  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async generarPDF() {

    await this.loadPdfMaker();

    //Crea un nuevo array mapeando los datos del array antiguo que queremos con el nuevo
    //Funciona como un for
    const registros = this.productos.map((data) => {
      return [
        data.nombreProducto,
        data.precio,
        data.disponible
      ]
    })

    //Crea la tabla
    const def = {
      content: [
        {
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                {
                  text: 'NOMBRE DEL PRODUCTO'
                },
                {
                  text: 'PRECIO'
                },
                {
                  text: 'DISPONIBLE'
                }
              ],
              ...registros
            ]
          }
        }]
    };

    //Crea el pdf y lo abre en una pestaña del navegador
    this.pdfMake.createPdf(def).open();

  }

  exportexcel(): void {
    //Aquí pasamos el Id de la tabla de la que tenemos que llevar los datos al archivo de Excel  
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    //generar libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //Guarda el archivo
    XLSX.writeFile(wb, this.fileName);

  }


  ngOnDestroy() { }

}
