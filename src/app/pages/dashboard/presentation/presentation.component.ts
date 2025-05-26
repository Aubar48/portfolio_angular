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
  selectedFile: File | null = null;
  previewImage: string | null = null;

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
        if (data.foto) {
          this.previewImage = `http://localhost:3000/uploads/presentaciones/${data.foto}`;
        }
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.presentationForm.valid) {
      this.loading = true;
      const formData = new FormData();
      
      Object.keys(this.presentationForm.value).forEach(key => {
        const value = this.presentationForm.get(key)?.value;
        if (value !== undefined && value !== null && key !== 'foto') {
          formData.append(key, value);
        }
      });

      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      }
      
      this.presentationService.updatePresentation(this.presentationForm.get('id')?.value || 1, formData).subscribe({
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