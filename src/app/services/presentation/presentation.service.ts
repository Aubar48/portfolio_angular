import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Presentation } from '../../models/presentation.model';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  private apiUrl = `${environment.apiUrl}/presentacion`;

  constructor(private http: HttpClient) {}

  getPresentation(): Observable<Presentation> {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return this.http.get<Presentation[]>(`${this.apiUrl}`).pipe(
        tap(response => {
          console.log('Raw API response:', response);
          if (!response || response.length === 0) {
            console.error('No se recibieron datos de presentación');
          } else {
            console.log('Datos de presentación recibidos:', response[0]);
            console.log('Link CV en respuesta:', response[0].linkCv);
          }
        }),
        map(presentations => {
          if (!presentations || presentations.length === 0) {
            throw new Error('No se encontró ninguna presentación');
          }
          const presentation = presentations[0];
          console.log('ID de presentación:', presentation.id);
          console.log('Link CV antes de mapeo:', presentation.linkCv);
          
          // Validación y transformación de datos
          const mappedPresentation: Presentation = {
            id: presentation.id,
            nombre: presentation.nombre || '',
            apellido: presentation.apellido || '',
            descripcion: presentation.descripcion || '',
            foto: presentation.foto || '',
            linkLinkedin: presentation.linkLinkedin || '',
            linkGithub: presentation.linkGithub || '',
            linkCv: presentation.linkCv || '',
            UsuarioId: presentation.UsuarioId
          };
          
          console.log('Presentación mapeada:', mappedPresentation);
          return mappedPresentation;
        })
      );
    } else {
      // Datos por defecto cuando no hay autenticación
      return new Observable<Presentation>(observer => {
        observer.next({
          id: 1,
          nombre: 'Nahuel',
          apellido: 'Argandoña',
          descripcion: 'I am from Argentina and I live in Córdoba Capital now. I am 31 years old, studying web programming full stack is a pleasure for me in Egg Education & Argentina Programa 4.0 MindHub LA & Digital House with Fundacion Formar & Argentina Programa 4.0 UTN, and I am currently studying software development technology at the Instituto Superior Politecnico de Córdoba \"ISPC\". Thanks for taking a look 🐣',
          foto: 'https://i.postimg.cc/C56tm6Gr/0fd2c8e9-0370-490c-81e7-8e0845bb6c85-isnet-general-use.png',
          linkGithub: 'https://github.com/aubar48',
          linkLinkedin: 'https://www.linkedin.com/in/aubar48/',
          linkCv: 'https://www.canva.com/design/DAFoP4HTDqk/YW9Jg6z0ouwf7GeaChLSvg/view?utm_content=DAFoP4HTDqk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he143a9d067'
        });
        observer.complete();
      });
    }
  }

  updatePresentation(id: number, presentation: Presentation): Observable<Presentation> {
    console.log('Iniciando actualización con ID:', id);
    console.log('Datos recibidos para actualizar:', presentation);
    console.log('Link CV recibido para actualizar:', presentation.linkCv);
    
    if (!presentation.linkCv) {
      console.error('El campo linkCv está vacío o no definido');
    }

    // Validación y normalización de datos
    const updateData: Presentation = {
      id: id,
      nombre: presentation.nombre?.trim() || '',
      apellido: presentation.apellido?.trim() || '',
      descripcion: presentation.descripcion?.trim() || '',
      foto: presentation.foto?.trim() || '',
      linkLinkedin: presentation.linkLinkedin?.trim() || '',
      linkGithub: presentation.linkGithub?.trim() || '',
      linkCv: presentation.linkCv?.trim() || '',
      UsuarioId: presentation.UsuarioId
    };
    
    console.log('Datos normalizados a enviar:', updateData);
    console.log('Link CV normalizado:', updateData.linkCv);
    
    return this.http.put<Presentation>(`${this.apiUrl}/${id}`, updateData).pipe(
      tap(response => {
        console.log('Respuesta de actualización:', response);
        console.log('Link CV en respuesta:', response.linkCv);
      }),
      tap(() => {
        console.log('Actualizando caché del servicio');
      })
    );
  }
}