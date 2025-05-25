import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Presentation {
  name: string;
  title: string;
  description: string;
  linkedinUrl: string;
  githubUrl: string;
  cvUrl: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  private apiUrl = `${environment.apiUrl}/presentation`;

  constructor(private http: HttpClient) {}

  getPresentation(): Observable<Presentation> {
    return this.http.get<Presentation>(this.apiUrl);
  }

  updatePresentation(presentation: Presentation): Observable<Presentation> {
    return this.http.put<Presentation>(this.apiUrl, presentation);
  }
}