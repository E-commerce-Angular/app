import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductoService } from "../services/productos.service";
@Component({
    selector: 'app-producto',
    templateUrl: 'crear-producto.component.html',
    styleUrls: ['crear-producto.component.scss']
})

export class CrearProductoComponent implements OnInit, OnDestroy{
    constructor(private productoService: ProductoService){

    }
  
    ngOnInit(){
        this.getProductos(); 
    }
    getProductos(){
        this.productoService.getProductos().subscribe(data =>{
            debugger; 
        })
    }

    ngOnDestroy(){

    }
}
  

