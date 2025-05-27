import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../services/projects/projects.service';
import { Project } from '../../../models/project.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card bg-dark text-white mb-4">
            <div class="card-header bg-primary d-flex justify-content-between align-items-center">
              <h2 class="mb-0">Proyectos</h2>
              <button class="btn btn-success" (click)="resetForm()">Nuevo Proyecto</button>
            </div>
            <div class="card-body">
              <form [formGroup]="projectForm" (ngSubmit)="onSubmit()" enctype="multipart/form-data">
                <div class="mb-3">
                  <label for="titulo" class="form-label">Título</label>
                  <input type="text" class="form-control" id="titulo" formControlName="titulo"
                    [ngClass]="{'is-invalid': projectForm.get('titulo')?.invalid && projectForm.get('titulo')?.touched}">
                  <div class="invalid-feedback" *ngIf="projectForm.get('titulo')?.errors?.['required']">
                    El título es requerido
                  </div>
                </div>

                <div class="mb-3">
                  <label for="descripcion" class="form-label">Descripción</label>
                  <textarea class="form-control" id="descripcion" rows="3" formControlName="descripcion"
                    [ngClass]="{'is-invalid': projectForm.get('descripcion')?.invalid && projectForm.get('descripcion')?.touched}"></textarea>
                  <div class="invalid-feedback" *ngIf="projectForm.get('descripcion')?.errors?.['required']">
                    La descripción es requerida
                  </div>
                </div>

                <div class="mb-3">
                  <label for="linkGithub" class="form-label">Link de GitHub</label>
                  <input type="url" class="form-control" id="linkGithub" formControlName="linkGithub"
                    [ngClass]="{'is-invalid': projectForm.get('linkGithub')?.invalid && projectForm.get('linkGithub')?.touched}">
                  <div class="invalid-feedback" *ngIf="projectForm.get('linkGithub')?.errors?.['required']">
                    El link de GitHub es requerido
                  </div>
                </div>

                <div class="mb-3">
                  <label for="linkDemo" class="form-label">Link de Demo</label>
                  <input type="url" class="form-control" id="linkDemo" formControlName="linkDemo"
                    [ngClass]="{'is-invalid': projectForm.get('linkDemo')?.invalid && projectForm.get('linkDemo')?.touched}">
                  <div class="invalid-feedback" *ngIf="projectForm.get('linkDemo')?.errors?.['required']">
                    El link de demo es requerido
                  </div>
                </div>

                <div class="mb-3">
                  <label for="foto" class="form-label">URL de la Foto</label>
                  <input type="url" class="form-control" id="foto" formControlName="foto"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    [ngClass]="{'is-invalid': projectForm.get('foto')?.invalid && projectForm.get('foto')?.touched}">
                  <div class="invalid-feedback" *ngIf="projectForm.get('foto')?.errors?.['required']">
                    La URL de la foto es requerida
                  </div>
                </div>

                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary" [disabled]="projectForm.invalid">{{ editingId ? 'Actualizar' : 'Crear' }}</button>
                  <button type="button" class="btn btn-outline-secondary" *ngIf="editingId" (click)="resetForm()">Cancelar</button>
                </div>
              </form>
            </div>
          </div>

          <!-- Lista de proyectos -->
          <div class="card bg-dark text-white">
            <div class="card-body">
              <div class="list-group list-group-flush">
                <div *ngFor="let project of projects" class="list-group-item bg-dark text-white border-light">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 class="mb-1">{{ project.titulo }}</h5>
                      <div class="project-links">
                        <a [href]="project.linkGithub" target="_blank" class="text-info me-3">Ver en GitHub</a>
                        <a [href]="project.linkDemo" target="_blank" class="text-success">Ver Demo</a>
                      </div>
                    </div>
                    <div>
                      <button class="btn btn-warning btn-sm me-2" (click)="editProject(project)">Editar</button>
                      <button class="btn btn-danger btn-sm" (click)="deleteProject(project.id!)">Eliminar</button>
                    </div>
                  </div>
                  <p class="mt-2">{{ project.descripcion }}</p>
                  <img *ngIf="project.foto" [src]="project.foto" class="img-thumbnail mt-2" style="max-width: 200px" alt="Foto del proyecto">
                </div>
              </div>
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

    .form-control {
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;

      &:focus {
        background-color: rgba(255, 255, 255, 0.15);
        border-color: #00ff95;
        box-shadow: 0 0 0 0.25rem rgba(0, 255, 149, 0.25);
        color: white;
      }
    }

    .list-group-item {
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.05);

      &:last-child {
        margin-bottom: 0;
      }
    }

    .btn-warning {
      background: linear-gradient(45deg, #ffc107, #ff9800);
      border: none;
      color: white;

      &:hover {
        background: linear-gradient(45deg, #ff9800, #ffc107);
      }
    }

    .btn-danger {
      background: linear-gradient(45deg, #dc3545, #c82333);
      border: none;

      &:hover {
        background: linear-gradient(45deg, #c82333, #dc3545);
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projectForm: FormGroup;
  projects: Project[] = [];
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService
  ) {
    this.projectForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      linkGithub: ['', Validators.required],
      linkDemo: ['', Validators.required],
      foto: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información de proyectos'
        });
      }
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;

      const action = this.editingId
        ? this.projectsService.updateProject(this.editingId, project)
        : this.projectsService.createProject(project);

      action.subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: `Proyecto ${this.editingId ? 'actualizado' : 'creado'} correctamente`
          });
          this.resetForm();
          this.loadProjects();
        },
        error: (error) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `No se pudo ${this.editingId ? 'actualizar' : 'crear'} el proyecto`
          });
        }
      });
    }
  }

  editProject(project: Project) {
    this.editingId = project.id!;
    this.projectForm.patchValue({
      titulo: project.titulo,
      descripcion: project.descripcion,
      linkGithub: project.linkGithub,
      linkDemo: project.linkDemo,
      foto: project.foto,
      
    });
  }

  deleteProject(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectsService.deleteProject(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El proyecto ha sido eliminado.', 'success');
            this.loadProjects();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            Swal.fire('Error', 'No se pudo eliminar el proyecto.', 'error');
          }
        });
      }
    });
  }

  resetForm() {
    this.editingId = null;

    this.projectForm.reset();
  }
}