import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Presentation } from '../../models/presentation.model';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  private apiUrl = `${environment.apiUrl}/presentacion`;

  constructor(private http: HttpClient) {}

  getPresentation(): Observable<Presentation> {
    const userId = localStorage.getItem('userId');
    return this.http.get<Presentation>(`${this.apiUrl}/${userId}`)
  }

  updatePresentation(id: number, presentation: Presentation): Observable<Presentation> {
    return this.http.put<Presentation>(`${this.apiUrl}/${id}`, presentation);
  }
}