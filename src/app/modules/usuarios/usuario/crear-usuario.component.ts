import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: 'crear-usuario.component.html',
  styleUrls: []
})
export class CrearUsuarioComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      dni: ['', Validators.required]
    });
  }
  
  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }
}