import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-list.html',
  styleUrls: ['./usuarios-list.css']
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];
  isLoading: boolean = true;
  error: string = '';
  successMessage: string = '';
  
  // Variables para validación de correo
  correoInvalidoCrear: boolean = false;
  correoInvalidoEditar: boolean = false;
  
  // Variables para el modal de edición
  usuarioEditando: Usuario | null = null;
  mostrarModalEdicion: boolean = false;

  // Variables para el modal de creación
  mostrarModalCrear: boolean = false;
  nuevoUsuario: Omit<Usuario, 'id'> = {
    nombre: '',
    correo: '',
    edad: 0
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // Método para validar formato de correo electrónico
  private validarFormatoCorreo(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(correo);
  }

  validarCorreoCrear(): void {
    this.correoInvalidoCrear = !this.validarFormatoCorreo(this.nuevoUsuario.correo);
  }

  validarCorreoEditar(): void {
    if (this.usuarioEditando) {
      this.correoInvalidoEditar = !this.validarFormatoCorreo(this.usuarioEditando.correo);
    }
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.error = '';

    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
        this.error = 'Error al cargar los usuarios. Intenta nuevamente.';
        this.isLoading = false;
      }
    });
  }

  recargar(): void {
    this.cargarUsuarios();
  }

  // Métodos para crear usuario
  abrirModalCrear(): void {
    this.nuevoUsuario = {
      nombre: '',
      correo: '',
      edad: 0
    };
    this.correoInvalidoCrear = false;
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear(): void {
    this.mostrarModalCrear = false;
    this.correoInvalidoCrear = false;
    this.nuevoUsuario = {
      nombre: '',
      correo: '',
      edad: 0
    };
  }

  guardarNuevoUsuario(): void {
    // Validar que los campos no estén vacíos
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.edad) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    // Validar formato del correo
    if (!this.validarFormatoCorreo(this.nuevoUsuario.correo)) {
      this.correoInvalidoCrear = true;
      this.error = 'Por favor ingresa un correo electrónico válido';
      return;
    }

    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe({
      next: (response) => {
        console.log('Usuario creado:', response);
        this.successMessage = '✅ Usuario creado exitosamente';
        this.cargarUsuarios(); // Recargar la lista
        this.cerrarModalCrear();
        
        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error al crear usuario', err);
        this.error = 'Error al crear el usuario. Intenta nuevamente.';
      }
    });
  }

  // Métodos para editar usuario
  editarUsuario(usuario: Usuario): void {
    // Crear una copia del usuario para editar
    this.usuarioEditando = { ...usuario };
    this.correoInvalidoEditar = false;
    this.mostrarModalEdicion = true;
  }

  cerrarModal(): void {
    this.mostrarModalEdicion = false;
    this.correoInvalidoEditar = false;
    this.usuarioEditando = null;
  }

  guardarEdicion(): void {
    if (!this.usuarioEditando) return;

    // Validar formato del correo
    if (!this.validarFormatoCorreo(this.usuarioEditando.correo)) {
      this.correoInvalidoEditar = true;
      this.error = 'Por favor ingresa un correo electrónico válido';
      return;
    }

    const { id, nombre, correo, edad } = this.usuarioEditando;

    this.usuarioService.actualizarUsuario(id, { nombre, correo, edad }).subscribe({
      next: (response) => {
        console.log('Usuario actualizado:', response);
        this.successMessage = '✅ Usuario actualizado exitosamente';
        this.cargarUsuarios(); // Recargar la lista
        this.cerrarModal();
        
        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error al actualizar usuario', err);
        this.error = 'Error al actualizar el usuario. Intenta nuevamente.';
      }
    });
  }

  // Método para eliminar usuario
  eliminarUsuario(usuario: Usuario): void {
    // Confirmación antes de eliminar
    const confirmar = confirm(
      `¿Estás seguro de que deseas eliminar a ${usuario.nombre}?\n\nEsta acción no se puede deshacer.`
    );

    if (confirmar) {
      this.usuarioService.eliminarUsuario(usuario.id).subscribe({
        next: (response) => {
          console.log('Usuario eliminado:', response);
          this.successMessage = '✅ Usuario eliminado exitosamente';
          this.cargarUsuarios(); // Recargar la lista
          
          // Limpiar mensaje de éxito después de 3 segundos
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => {
          console.error('Error al eliminar usuario', err);
          this.error = 'Error al eliminar el usuario. Intenta nuevamente.';
        }
      });
    }
  }
}