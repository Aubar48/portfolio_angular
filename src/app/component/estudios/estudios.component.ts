import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EducationService } from '../../services/education/education.service';
import { ExperienceService } from '../../services/experience/experience.service';
import { Education } from '../../models/education.model';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-estudios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudios.component.html',
  styleUrl: './estudios.component.scss'
})
export class EstudiosComponent implements OnInit {
  education: Education[] = [];
  experiences: Experience[] = [];
  loading = true;
  error = false;

  constructor(
    private educationService: EducationService,
    private experienceService: ExperienceService
  ) {}

  ngOnInit() {
    this.loadEducation();
    this.loadExperiences();
  }

  private loadEducation() {
    this.educationService.getEducation().subscribe({
      next: (data) => {
        this.education = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar educación:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  private loadExperiences() {
    this.experienceService.getExperiences().subscribe({
      next: (data) => {
        this.experiences = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar experiencias:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
