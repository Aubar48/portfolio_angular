import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EducationService } from '../../../services/education/education.service';
import { Education } from '../../../models/education.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educationForm: FormGroup;
  education: Education[] = [];
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private educationService: EducationService
  ) {
    this.educationForm = this.fb.group({
      institucion: ['', Validators.required],
      titulo: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: [''],
      foto: ['', Validators.required],
      UsuarioId: [localStorage.getItem('userId')]
    });
  }

  ngOnInit() {
    this.loadEducation();
  }

  loadEducation() {
    this.educationService.getEducation().subscribe({
      next: (data) => {
        this.education = data;
      },
      error: (error) => {
        console.error('Error al cargar educación:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información educativa'
        });
      }
    });
  }

  onSubmit() {
    if (this.educationForm.valid) {
      const education = this.educationForm.value;

      // Convertir las fechas al formato correcto
      if (education.inicio) {
        education.inicio = new Date(education.inicio).toISOString().split('T')[0];
      }
      if (education.fin) {
        education.fin = new Date(education.fin).toISOString().split('T')[0];
      }

      const action = this.editingId
        ? this.educationService.updateEducation(this.editingId, education)
        : this.educationService.createEducation(education);

      action.subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: `Educación ${this.editingId ? 'actualizada' : 'creada'} correctamente`
          });
          this.resetForm();
          this.loadEducation();
        },
        error: (error) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `No se pudo ${this.editingId ? 'actualizar' : 'crear'} la educación`
          });
        }
      });
    }
  }

  editEducation(education: Education) {
    this.editingId = education.id!;
    this.educationForm.patchValue({
      institucion: education.institucion,
      titulo: education.titulo,
      inicio: education.inicio,
      fin: education.fin,
      UsuarioId: education.UsuarioId
    });
  }

  deleteEducation(id: number) {
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
        this.educationService.deleteEducation(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'La educación ha sido eliminada.', 'success');
            this.loadEducation();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            Swal.fire('Error', 'No se pudo eliminar la educación.', 'error');
          }
        });
      }
    });
  }

  resetForm() {
    this.editingId = null;

    this.educationForm.reset();
  }
}