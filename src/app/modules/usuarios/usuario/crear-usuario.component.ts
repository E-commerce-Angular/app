import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-usuario",
  templateUrl: "crear-usuario.component.html",
  styleUrls: ["crear-usuario.component.css"],
})
export class CrearUsuarioComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      dni: ["", Validators.required],
    });
  }

  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    this.firstFormGroup.setValue({ //SET DE VALORES 1st FORM
      nombre: "",
      apellido: "",
    });
    this.secondFormGroup.setValue({ //SET DE VALORES 2st FORM
      dni: "",
    });
    alert("Envio de Datos exitoso!") //CONFIRMACION DE ENVIO DE DATOS
    location.reload(); //REFRESH DE PANTALLA
  }
}
