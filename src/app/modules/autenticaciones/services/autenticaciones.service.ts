import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable()
export class AutenticacionService {

  private usuarioUrl = environment.API + '/modules/autenticaciones';//VA HASTA LA RUTA DEL MODULO, SE CONCANTENA EL RESTO
  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any) {
    debugger
    return this.http.post(this.usuarioUrl + "/registro", usuario);
  }

  loguearUsuario(usuario: any) {
    debugger
    return this.http.post(this.usuarioUrl + "/login", usuario);
  }


}
