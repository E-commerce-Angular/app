import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductoService } from "../services/productos.service";

import { io } from "socket.io-client";
import { environment } from "./../../../../environments/environment";

@Component({
    selector: "app-consulta-producto",
    templateUrl: "consulta-producto.component.html",
    styleUrls: ["consulta-producto.component.css"],
})
export class ConsultarProductoComponent implements OnInit, OnDestroy {
    private socket;
    productos: any[] = [];

    constructor(private usuarioService: ProductoService) {
        this.socket = io(environment.WS).on("connect", () => {
            console.log("Socket conectado en angular");
        });

        this.socket.on("crearProducto", (producto: any) => {});

        this.socket.emit("borrarProducto", "Producto Borrado");
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

    ngOnDestroy() {}
}
