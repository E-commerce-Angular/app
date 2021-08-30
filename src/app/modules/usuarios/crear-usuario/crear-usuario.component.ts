import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsuarioService } from "../services/usuarios.service";
@Component({
  selector: "app-usuario",
  templateUrl: "crear-usuario.component.html",
  styleUrls: ["crear-usuario.component.scss"],
})

export class CrearUsuarioComponent implements OnInit, OnDestroy {
  constructor(private usuarioService: UsuarioService) {}
  // ngOnInit(): void {
  //   throw new Error("Method not implemented.");
  // }
  //WTF
  ngOnInit() {
    this.getUsuarios();
  }
  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      debugger;
    })
  }

  ngOnDestroy() {}
}
