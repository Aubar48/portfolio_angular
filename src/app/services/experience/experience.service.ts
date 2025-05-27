import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Experience } from '../../models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = `${environment.apiUrl}/experiencia`;

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<Experience[]> {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return this.http.get<Experience[]>(this.apiUrl);
    } else {
      // Datos por defecto cuando no hay autenticación
      return new Observable<Experience[]>(observer => {
        observer.next([{
          puesto: 'Soporte tecnico informatico',
          empresa: 'Sanatorio frances',
          descripcion: 'Soporte tecnico informatico en la empresa sanatorio frances',
          inicio: '2024-10-05',
          fin: '2025-5-5',
          foto: 'https://www.solucionespm.com/wp-content/uploads/2018/08/soporte-t%C3%A9cnico.jpg'
        }]);
        observer.complete();
      });
    }
  }

  createExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.apiUrl, experience);
  }

  updateExperience(id: number, experience: Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiUrl}/${id}`, experience);
  }

  deleteExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}