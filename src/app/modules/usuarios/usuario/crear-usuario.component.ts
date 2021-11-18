import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { Router, ActivatedRoute } from '@angular/router'
import { UsuarioService } from '../services/usuarios.service'

@Component({
  selector: 'app-usuario',
  templateUrl: 'crear-usuario.component.html',
  styleUrls: ['crear-usuario.component.css'],
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm: FormGroup
  public archivos: []
  public previsualizacion: string
  param: any

  constructor(
    private UsuarioService: UsuarioService,
    private Router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.initForm()
    this.param = this.route.snapshot.params.id

    if (this.param) {
      this.getUsuario()
    }
  }

  getUsuario() {
    this.UsuarioService.getUsuario(this.param).subscribe((data: any) => {
      debugger
      this.usuarioForm.patchValue(data.data)
    })
  }

  initForm() {
    this.usuarioForm = this.fb.group({
      usuario: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', Validators.required],
      dni: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submit() {
    console.log(this.usuarioForm.value)
    if (this.param) {
      this.editarUsuario()
    } else {
      this.guardarUsuario()
    }

    alert('Envio de Datos exitoso!') //CONFIRMACION DE ENVIO DE DATOS
    // location.reload(); //REFRESH DE PANTALLA
  }

  editarUsuario() {
    this.UsuarioService.editarUsuario(
      this.param,
      this.usuarioForm.value,
    ).subscribe((data) => this.Router.navigate(['/']))
  }

  guardarUsuario() {
    this.UsuarioService.guardarUsuario(
      this.usuarioForm.value,
    ).subscribe((data) => this.Router.navigate(['/']))
  }
}
