import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Experience } from '../../models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = `${environment.apiUrl}/experiencias`;

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }

  createExperience(formData: FormData): Observable<Experience> {
    return this.http.post<Experience>(this.apiUrl, formData);
  }

  updateExperience(id: number, formData: FormData): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiUrl}/${id}`, formData);
  }

  deleteExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}