import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para datos de usuario al registrarse
export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

// Interfaz para login
export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  // Registro
  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, data);
  }

  // Login
  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
