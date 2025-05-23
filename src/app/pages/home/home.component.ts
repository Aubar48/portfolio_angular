import { Component, HostListener } from '@angular/core';
import { PresentacionComponent } from "../../component/presentacion/presentacion.component";
import { EstudiosComponent } from "../../component/estudios/estudios.component";
import { ProjectosComponent } from "../../component/projectos/projectos.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,PresentacionComponent, EstudiosComponent, ProjectosComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  // corregí styleUrl a styleUrls (plural)
})
export class HomeComponent {
  showScrollTopButton = false;

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Escuchar scroll en ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Mostrar botón si el scroll vertical es mayor que 100px (puedes ajustar)
    this.showScrollTopButton = window.pageYOffset > 100;
  }
}
