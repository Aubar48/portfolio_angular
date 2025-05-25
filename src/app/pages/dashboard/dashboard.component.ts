import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sections = [
    { name: 'Presentación', route: 'presentation', icon: 'fas fa-user' },
    { name: 'Experiencia', route: 'experience', icon: 'fas fa-briefcase' },
    { name: 'Educación', route: 'education', icon: 'fas fa-graduation-cap' },
    { name: 'Proyectos', route: 'projects', icon: 'fas fa-code' }
  ];
}