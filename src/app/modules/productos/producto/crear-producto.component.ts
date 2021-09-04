import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-producto',
    templateUrl: 'crear-producto.component.html',
    styleUrls: ['crear-producto.component.scss']
})

export class CrearProductoComponent implements OnInit{

    productoFrom: FormGroup;//FormGroup del producto
    
    constructor(private fb: FormBuilder){}
  
    ngOnInit(){
        this.productoFrom = this.fb.group({
            nombreProducto:["", Validators.required],
            precio:["",Validators.required],
            detalle:["",Validators.required],
            imagen:[""],
            disponible:[""]
        });
    }
    //ESTO ACA NO VA
    // getProductos(){
    //     this.productoService.getProductos().subscribe(data =>{
    //         //debugger; 
    //     })

    
    submit(){
        console.log(this.productoFrom.value);
        this.productoFrom.setValue({
            nombreProducto:"",
            precio:"",
            detalle:"",
            imagen:"",
            disponible:""
        });

    }
}
  

