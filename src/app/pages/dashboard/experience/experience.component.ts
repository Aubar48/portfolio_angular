import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card bg-dark text-white">
            <div class="card-header bg-primary">
              <h2 class="mb-0">Gestionar Experiencia</h2>
            </div>
            <div class="card-body">
              <p class="text-center">Próximamente: Gestión de experiencia laboral</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background: rgba(33, 37, 41, 0.95);
      backdrop-filter: blur(10px);
    }

    .card-header {
      border-bottom: none;
      background: linear-gradient(45deg, #0056b3, #00ff95);
      padding: 1.5rem;
    }

    h2 {
      font-weight: 600;
      margin: 0;
    }

    .card-body {
      padding: 2rem;
    }
  `]
})
export class ExperienceComponent {}