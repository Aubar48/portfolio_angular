import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExperienceService } from '../../../services/experience/experience.service';
import { Experience } from '../../../models/experience.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experienceForm: FormGroup;
  experiences: Experience[] = [];
  editingId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService
  ) {
    this.experienceForm = this.fb.group({
      empresa: ['', Validators.required],
      puesto: ['', Validators.required],
      descripcion: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: [''],
      foto: ['', Validators.required],
      UsuarioId: [localStorage.getItem('userId')]
    });
  }

  ngOnInit() {
    this.loadExperiences();
  }

  loadExperiences() {
    this.loading = true;
    this.experienceService.getExperiences().subscribe({
      next: (data) => {
        this.experiences = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al cargar experiencias:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información de experiencias'
        });
      }
    });
  }



  onSubmit() {
    if (this.experienceForm.valid) {
      this.loading = true;
      const experience = this.experienceForm.value;
      
      // Convertir las fechas al formato correcto
      if (experience.inicio) {
        experience.inicio = new Date(experience.inicio).toISOString().split('T')[0];
      }
      if (experience.fin) {
        experience.fin = new Date(experience.fin).toISOString().split('T')[0];
      }

      const action = this.editingId
        ? this.experienceService.updateExperience(this.editingId, experience)
        : this.experienceService.createExperience(experience);

      action.subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: `Experiencia ${this.editingId ? 'actualizada' : 'creada'} correctamente`
          });
          this.resetForm();
          this.loadExperiences();
        },
        error: (error) => {
          this.loading = false;
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `No se pudo ${this.editingId ? 'actualizar' : 'crear'} la experiencia`
          });
        }
      });
    }
  }

  editExperience(experience: Experience) {
    this.editingId = experience.id!;
    this.experienceForm.patchValue({
      empresa: experience.empresa,
      puesto: experience.puesto,
      descripcion: experience.descripcion,
      inicio: experience.inicio,
      fin: experience.fin
    });
  }

  deleteExperience(id: number) {
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
        this.experienceService.deleteExperience(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'La experiencia ha sido eliminada.', 'success');
            this.loadExperiences();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            Swal.fire('Error', 'No se pudo eliminar la experiencia.', 'error');
          }
        });
      }
    });
  }

  resetForm() {
    this.editingId = null;

    this.experienceForm.reset();
  }
}