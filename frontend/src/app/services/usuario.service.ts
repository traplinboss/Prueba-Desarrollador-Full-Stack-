import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  edad: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/data';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Obtener un usuario por ID
  obtenerUsuarioPorId(id: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo usuario
  crearUsuario(usuario: Omit<Usuario, 'id'>): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, usuario);
  }

  // Actualizar un usuario (PATCH - actualización parcial)
  actualizarUsuario(id: number, usuario: Partial<Omit<Usuario, 'id'>>): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/${id}`, usuario);
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
