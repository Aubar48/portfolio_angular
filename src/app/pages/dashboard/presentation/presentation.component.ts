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
      id: [null],
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
    console.log('Iniciando carga de presentación');
    this.loading = true;
    this.presentationService.getPresentation().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        if (data) {
          this.presentationForm.patchValue(data);
          console.log('Formulario actualizado:', this.presentationForm.value);
        } else {
          console.log('No se recibieron datos de la API');
        }
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
      
      const id = this.presentationForm.get('id')?.value;
      if (!id) {
        console.error('No se encontró el ID de la presentación');
        return;
      }
      this.presentationService.updatePresentation(id, presentation).subscribe({
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