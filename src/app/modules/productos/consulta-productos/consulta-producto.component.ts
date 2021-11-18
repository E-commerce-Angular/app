import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ProductoService } from "../services/productos.service";
import { CrearProductoComponent } from "../producto/crear-producto.component";

import { io } from "socket.io-client";
import { environment } from "./../../../../environments/environment";
import { Observable } from "rxjs";

@Component({
    selector: "app-consulta-producto",
    templateUrl: "consulta-producto.component.html",
    styleUrls: ["consulta-producto.component.css"],
    providers: [ProductoService]
})
export class ConsultarProductoComponent implements OnInit, OnDestroy {
    private socket;
    productos: any[] = [];
    public data$:any;
    public keyword = ["nombreProducto"];//Palabra clave para el autocompletado
    
    constructor(private usuarioService: ProductoService, private router:Router) {
        this.socket = io(environment.WS).on("connect", () => { //Coneccion con socket
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
                this.data$ = data.data;
            }
        });   
  
    }

    registro() {
        this.router.navigate(["auth/registro"]);
    }

    ngOnDestroy() {}

}
