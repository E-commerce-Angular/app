import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment'
@Injectable()
export class UsuarioService {
  private usuarioUrl = environment.API + '/modules/usuarios' //VA HASTA LA RUTA DEL MODULO, SE CONCANTENA EL RESTO

  constructor(private http: HttpClient) {}

  guardarUsuario(usuario: any) {
    debugger
    return this.http.post(this.usuarioUrl + '/usuario', usuario)
  }

  getUsuario(idUsuario) {
    return this.http.get(this.usuarioUrl + '/usuario/' + idUsuario)
  }

  getUsuarios() {
    return this.http.get(this.usuarioUrl + '/usuarios')
  }

  editarUsuario(idUsuario, usuario) {
    return this.http.put(this.usuarioUrl + '/usuario/' + idUsuario, usuario)
  }

  borrarUsuario(idUsuario, usuario) {
    return this.http.delete(this.usuarioUrl + '/usuario/' + idUsuario, usuario)
  }
}
