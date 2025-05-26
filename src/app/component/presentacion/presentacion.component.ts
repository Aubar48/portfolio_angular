import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PresentationService } from '../../services/presentation/presentation.service';
import { Presentation } from '../../models/presentation.model';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.scss'
})
export class PresentacionComponent implements OnInit {
  presentacion: Presentation | null = null;
  loading = true;
  error = false;

  constructor(private presentationService: PresentationService) {}

  ngOnInit() {
    this.loadPresentation();
  }

  private loadPresentation() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.presentationService.getPresentation().subscribe({
        next: (data) => {
          this.presentacion = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar la presentación:', error);
          this.error = true;
          this.loading = false;
        }
      });
    }
  }
}
