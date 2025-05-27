import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = `${environment.apiUrl}/proyectos`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return this.http.get<Project[]>(this.apiUrl);
    } else {
      // Datos por defecto cuando no hay autenticación
      return new Observable<Project[]>(observer => {
        observer.next([{
          titulo: 'App clima',
          descripcion: 'Una aplicación moderna construida con React que permite visualizar el clima actual de cualquier ciudad del mundo en tiempo real, utilizando la API de OpenWeatherMap. El diseño es responsivo y atractivo, con animaciones y detalles visuales inspirados en aplicaciones móviles actuales.',
          linkGithub: 'https://github.com/Aubar48/app-clima-react',
          linkDemo: 'https://appclimanahuel.netlify.app/',
          foto: 'https://github.com/Aubar48/app-clima-react/raw/master/public/app-clima.png'
        },
        {
          titulo: 'App list pokemon',
          descripcion: 'Este proyecto utiliza la API v2 de Pokémon para mostrar 100 cartas por página. La funcionalidad incluye la posibilidad de navegar entre páginas para visualizar otras cartas disponibles.',
          linkGithub: 'https://github.com/Aubar48/angular_list_pokemon?tab=readme-ov-file',
          linkDemo: 'https://allpokemoncard48.netlify.app/',
          foto: 'https://i.ibb.co/XxDMyjKG/image.png'
        }]);
        observer.complete();
      });
    }
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}