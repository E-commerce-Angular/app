import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'

import { UsuarioService } from '../services/usuarios.service'

import { io } from 'socket.io-client'
import { environment } from './../../../../environments/environment'

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: 'consulta-usuario.component.html',
  styleUrls: ['consulta-usuario.component.css'],
})
export class ConsultarUsuarioComponent implements OnInit, OnDestroy {
  private socket
  usuarios: any[] = []

  constructor(private router: Router, private usuarioService: UsuarioService) {
    this.socket = io(environment.WS).on('connect', () => {
      console.log('Socket conectado en angular')
    })

    this.socket.on('crearUsuario', (usuario: any) => {})

    this.socket.emit('borrarUsuario', 'Usuario Borrado')
  }

  ngOnInit() {
    this.getUsuarios()
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data: any) => {
      if (data.status === 'success') {
        this.usuarios = data.data
      }
    })
  }

  editarUsuario(idUsuario) {
    debugger
    this.router.navigate(['/usuario/crearUsuario', idUsuario])
  }

  ngOnDestroy() {}
}
