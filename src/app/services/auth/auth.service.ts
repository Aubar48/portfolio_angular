import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RegisterData } from '../../models/register.model';
import { LoginData } from '../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  updateLoginState(state: boolean) {
    this.isLoggedInSubject.next(state);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('isLoggedIn');
      this.updateLoginState(false);
    }
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
      tap((response: any) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.user.id.toString());
          localStorage.setItem('isLoggedIn', 'true');
          this.updateLoginState(true);
        }
      })
    );
  }
}
