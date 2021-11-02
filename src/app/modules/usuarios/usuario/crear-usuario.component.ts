import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//import para que la foto sea segura
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuarios.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-usuario",
  templateUrl: "crear-usuario.component.html",
  styleUrls: ["crear-usuario.component.css"],
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  //creo un array para guardar los archivos file
  public archivos: any = [];
  public previsualizacion: string;
  newUser = true;
  router: any;

  constructor(
    private UsuarioService: UsuarioService,
    private Router: Router,
    private fb: FormBuilder,
    //instancia de DomSanitizer
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      usuario: ["", Validators.required],
      nombreUsuario: ["", Validators.required],
      apellidoUsuario: ["", Validators.required],
      //campo para alojar la imagen
      pics: ["", Validators.required],
      dni: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  submit() {
    this.guardarUsuario();
    Swal.fire({
      title: "El registro se creó correctamente!",
      icon: "success",
    });
  }

  guardarUsuario() {
    this.UsuarioService.guardarUsuario(this.usuarioForm.value).subscribe(
      (data) => this.Router.navigate(["/"])
    );
  }

  //funcion para capturar y previsualizar la imagen
  captura(event): any {
    let imagen = event.target.files[0];
    this.extraerBase64(imagen).then((archivo: any) => {
      this.previsualizacion = archivo.base;
      this.usuarioForm.value.pics = archivo.base;
    });
  }

  //funcion para pasar a string la imagen
  extraerBase64 = async ($event) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const archivo = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });
}
