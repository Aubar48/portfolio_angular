import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExperienceService } from '../../../services/experience/experience.service';
import { Experience } from '../../../models/experience.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experienceForm: FormGroup;
  experiences: Experience[] = [];
  selectedFile: File | null = null;
  editingId: number | null = null;
  loading = false;
  fileError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService
  ) {
    this.experienceForm = this.fb.group({
      empresa: ['', Validators.required],
      puesto: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['']
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileError = null;
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        this.fileError = 'El archivo no debe superar los 5MB';
        event.target.value = '';
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        this.fileError = 'El archivo debe ser una imagen';
        event.target.value = '';
        return;
      }
      
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.experienceForm.valid && !this.fileError) {
      this.loading = true;
      const formData = new FormData();
      const formValue = this.experienceForm.value;

      Object.keys(formValue).forEach(key => {
        formData.append(key, formValue[key]);
      });

      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      }

      const action = this.editingId
        ? this.experienceService.updateExperience(this.editingId, formData)
        : this.experienceService.createExperience(formData);

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
      fechaInicio: experience.fechaInicio,
      fechaFin: experience.fechaFin
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
    this.selectedFile = null;
    this.experienceForm.reset();
  }
}