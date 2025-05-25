import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Presentation } from '../../models/presentation.model';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  private apiUrl = `${environment.apiUrl}/presentaciones`;

  constructor(private http: HttpClient) {}

  getPresentation(): Observable<Presentation> {
    return this.http.get<Presentation>(this.apiUrl);
  }

  updatePresentation(id: number, formData: FormData): Observable<Presentation> {
    return this.http.put<Presentation>(`${this.apiUrl}/${id}`, formData);
  }
}