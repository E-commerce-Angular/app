import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductoService } from "../services/productos.service";
import {Observable} from "rxjs";
import { io } from "socket.io-client";
import { environment } from "./../../../../environments/environment";

@Component({
    selector: "app-consulta-producto",
    templateUrl: "consulta-producto.component.html",
    styleUrls: ["consulta-producto.component.css"],
    providers:[ProductoService]
})
export class ConsultarProductoComponent implements OnInit, OnDestroy {
    private socket;
    productos: any[] = [];
    public data$: Observable<any[]>;
    public keyword = "productos";//Palabra clave para el autocompletado

    constructor(private usuarioService: ProductoService, private dataSvc:ProductoService) {
        this.socket = io(environment.WS).on("connect", () => { //Coneccion con socket
            console.log("Socket conectado en angular");
        });

        this.socket.on("crearProducto", (producto: any) => {}); //Llama a la api con la clave crearProducto. producto es lo que llega

        this.socket.emit("borrarProducto", "Producto Borrado"); //Primero el nombre, luego el objeto

        this.getProductos();
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

        this.data$ = this.dataSvc.getAllProductos();
    }

    ngOnDestroy() {}
}
