import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { EducationService } from '../../services/education/education.service';
import { ExperienceService } from '../../services/experience/experience.service';
import { PresentationService } from '../../services/presentation/presentation.service';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sections = [
    { name: 'Presentación', route: 'presentation', icon: 'fas fa-user', count: 0 },
    { name: 'Experiencia', route: 'experience', icon: 'fas fa-briefcase', count: 0 },
    { name: 'Educación', route: 'education', icon: 'fas fa-graduation-cap', count: 0 },
    { name: 'Proyectos', route: 'projects', icon: 'fas fa-code', count: 0 }
  ];

  userName: string = '';

  constructor(
    private authService: AuthService,
    private presentationService: PresentationService,
    private experienceService: ExperienceService,
    private educationService: EducationService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    this.loadUserName();
    this.loadCounts();
  }

  private loadUserName() {
    const userId = this.authService.getUserId();
    if (userId) {
      // Aquí podrías agregar la lógica para obtener el nombre del usuario
      // Por ahora usaremos un valor estático
      this.userName = 'Administrador';
    }
  }

  private loadCounts() {
    this.presentationService.getPresentation().subscribe(presentation => {
      this.sections[0].count = presentation ? 1 : 0;
    });

    this.experienceService.getExperiences().subscribe(experiences => {
      this.sections[1].count = experiences.length;
    });

    this.educationService.getEducation().subscribe(education => {
      this.sections[2].count = education.length;
    });

    this.projectsService.getProjects().subscribe(projects => {
      this.sections[3].count = projects.length;
    });
  }
}