import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuarios.service";

@Component({
  selector: "app-usuario",
  templateUrl: "crear-usuario.component.html",
  styleUrls: ["crear-usuario.component.css"],
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;

  constructor(private UsuarioService: UsuarioService, private Router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      usuario: ["", Validators.required],
      nombreUsuario: ["", Validators.required],
      apellidoUsuario: ["", Validators.required],
      dni: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  submit() {
    console.log(this.usuarioForm.value);
    this.guardarUsuario();

    alert("Envio de Datos exitoso!") //CONFIRMACION DE ENVIO DE DATOS
    // location.reload(); //REFRESH DE PANTALLA
  }

  guardarUsuario(){this.UsuarioService.guardarUsuario(this.usuarioForm.value).subscribe(
    data => this.Router.navigate(['/'])
  )}

}
