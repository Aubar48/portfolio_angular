import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PresentationService } from '../../services/presentation/presentation.service';
import { Presentation } from '../../models/presentation.model';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.scss'
})
export class PresentacionComponent implements OnInit {
  presentacion: Presentation | null = null;
  loading = true;
  error = false;

  constructor(private presentationService: PresentationService) {}

  ngOnInit() {
    // Skip loading during SSR
    if (typeof window !== 'undefined') {
      this.loadPresentation();
    }
  }

  private loadPresentation() {
    this.loading = true;
    this.error = false;
    this.presentacion = null;

    // Add delay to ensure auth state is ready
    setTimeout(() => {
      this.presentationService.getPresentation().subscribe({
      next: (data) => {
        if (data) {
          this.presentacion = data;
          this.loading = false;
        } else {
          this.error = true;
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error al cargar la presentación:', error);
        this.error = true;
        this.loading = false;
      }
    });
    }, 100);
  }

  async compartirPerfil() {
    const currentUrl = window.location.href.split('?')[0]; // Obtiene la URL base sin parámetros
    const shareUrl = currentUrl + '?view=public'; // Agrega el parámetro para vista pública

    try {
      if (navigator.share) {
        // Si el navegador soporta la API de compartir nativa
        await navigator.share({
          title: `Portfolio de ${this.presentacion?.nombre}`,
          text: `¡Mira mi portfolio profesional!`,
          url: shareUrl
        });
      } else {
        // Si no soporta la API de compartir, copiar al portapapeles
        await navigator.clipboard.writeText(shareUrl);
        alert('¡Enlace copiado al portapapeles!');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      alert('No se pudo compartir el enlace. Por favor, inténtalo de nuevo.');
    }
  }
}
