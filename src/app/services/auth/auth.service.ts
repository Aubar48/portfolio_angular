import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  updateLoginState(state: boolean) {
    this.isLoggedInSubject.next(state);
  }

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      this.updateLoginState(localStorage.getItem('isLoggedIn') === 'true');
    }
  }

  // Registro
  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, data);
  }

  // Login
  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap(() => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('isLoggedIn', 'true');
          this.updateLoginState(true);
        }
      })
    );
  }
}
