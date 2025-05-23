import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projectos',
  imports: [CommonModule],
  templateUrl: './projectos.component.html',
  styleUrl: './projectos.component.scss'
})
export class ProjectosComponent {
proyectos = [
    {
      titulo: 'Clima App',
      descripcion: 'Aplicación del clima usando OpenWeather y gráficos con Chart.js.',
      imagen: 'https://github.com/Aubar48/app-clima-react/raw/master/public/app-clima.png',
      enlace_web:'https://appclimanahuel.netlify.app/',
      enlace: 'https://github.com/Aubar48/app-clima-react',
      tecnologias: ['React-vite', 'Chart.js', 'Tailwindcss', 'API REST']
    },
    {
      titulo: 'Huggin page',
      descripcion: 'Frontend con react-vite y tailwindcss ',
      imagen: 'https://github.com/Aubar48/Huggins/raw/master/public/images/lcrCrows.png',
      enlace_web:'https://latincrowshuginn.netlify.app/',
      enlace: 'https://github.com/Aubar48/Huggins',
      tecnologias: ['React-vite', 'Tailwindcss', 'Aos', 'Bootstrap']
    },
    {
      titulo: 'Pokemon-list',
      descripcion: 'Sitio web de lista de pokemon',
      imagen: '/pokemon.png',
      enlace_web:'https://allpokemoncard48.netlify.app/',
      enlace: 'https://github.com/Aubar48/angular_list_pokemon',
      tecnologias: ['Angular', 'HTML', 'CSS', 'API REST']
    }
  ];
}
