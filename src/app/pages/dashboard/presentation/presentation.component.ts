import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PresentationService, Presentation } from '../../../services/presentation/presentation.service';
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

  constructor(private fb: FormBuilder, private presentationService: PresentationService) {
    this.presentationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      linkedinUrl: ['', Validators.required],
      githubUrl: ['', Validators.required],
      cvUrl: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPresentation();
  }

  private loadPresentation() {
    this.presentationService.getPresentation().subscribe({
      next: (data) => {
        this.presentationForm.patchValue(data);
      },
      error: (error) => {
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
      const presentationData: Presentation = this.presentationForm.value;
      
      this.presentationService.updatePresentation(presentationData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Guardado!',
            text: 'Los cambios se han guardado correctamente'
          });
        },
        error: (error) => {
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