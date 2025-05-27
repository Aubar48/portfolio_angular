import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PresentationService } from '../../../services/presentation/presentation.service';
import { Presentation } from '../../../models/presentation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  presentationForm: FormGroup;
  loading = false;
  

  constructor(private fb: FormBuilder, private presentationService: PresentationService) {
    this.presentationForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      linkLinkedin: ['', Validators.required],
      linkGithub: ['', Validators.required],
      linkCv: ['', Validators.required],
      foto: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPresentation();
  }

  private loadPresentation() {
    this.loading = true;
    this.presentationService.getPresentation().subscribe({
      next: (data) => {
        this.presentationForm.patchValue(data);
        this.loading = false;
  
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al cargar la presentación:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información de la presentación'
        });
      }
    });
  }

  onSubmit() {
    if (this.presentationForm.valid) {
      this.loading = true;
      const presentation = this.presentationForm.value;
      
      this.presentationService.updatePresentation(this.presentationForm.get('id')?.value || 1, presentation).subscribe({
        next: () => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: '¡Guardado!',
            text: 'Los cambios se han guardado correctamente'
          });
        },
        error: (error) => {
          this.loading = false;
          console.error('Error al guardar los cambios:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron guardar los cambios'
          });
        }
      });
    }
  }
}