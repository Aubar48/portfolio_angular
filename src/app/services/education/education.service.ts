import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Education } from '../../models/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiUrl = `${environment.apiUrl}/educacion`;

  constructor(private http: HttpClient) {}

  getEducation(): Observable<Education[]> {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return this.http.get<Education[]>(this.apiUrl);
    } else {
      // Datos por defecto cuando no hay autenticación
      return new Observable<Education[]>(observer => {
        observer.next([{
          titulo: 'Tecnico en Desarrollo de Software',
          institucion: 'Instituto Superior Politecnico de Còrdoba',
          descripcion: 'Estudios en desarrollo de software y sistemas informáticos ',
          inicio: '2024-03-01',
          fin: '2027-12-15',
          foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv1lgXvTZd9UYEAdK-Mq2uZmjDMF4KLAeLnA&s'
        }]);
        observer.complete();
      });
    }
  }

  createEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(this.apiUrl, education);
  }

  updateEducation(id: number, education: Education): Observable<Education> {
    return this.http.put<Education>(`${this.apiUrl}/${id}`, education);
  }

  deleteEducation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}