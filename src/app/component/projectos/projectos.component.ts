import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects/projects.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projectos.component.html',
  styleUrl: './projectos.component.scss'
})
export class ProjectosComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  error = false;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.loadProjects();
  }

  private loadProjects() {
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
