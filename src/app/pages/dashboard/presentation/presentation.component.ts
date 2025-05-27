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
      foto: ['', Validators.required],
      UsuarioId: [null] // Agregamos el campo UsuarioId
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
        console.log('Datos completos recibidos:', data);
        console.log('Link CV recibido:', data.linkCv);
        
        if (data && data.id) {
          console.log('ID de presentación recibido:', data.id);
          // Aseguramos que todos los campos estén presentes
          const formData = {
            id: data.id,
            nombre: data.nombre || '',
            apellido: data.apellido || '',
            descripcion: data.descripcion || '',
            linkLinkedin: data.linkLinkedin || '',
            linkGithub: data.linkGithub || '',
            linkCv: data.linkCv || '',
            foto: data.foto || '',
            UsuarioId: data.UsuarioId
          };
          
          console.log('Datos a cargar en el formulario:', formData);
          this.presentationForm.patchValue(formData);
          console.log('Formulario actualizado:', this.presentationForm.value);
          console.log('Link CV en formulario:', this.presentationForm.get('linkCv')?.value);
        } else {
          console.error('No se recibieron datos válidos de la API');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se recibieron datos válidos de la presentación'
          });
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar la presentación:', error);
        this.loading = false;
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
      console.log('Formulario válido, preparando envío');
      this.loading = true;
      const formData = this.presentationForm.value;
      console.log('Datos del formulario a enviar:', formData);
      console.log('Link CV a enviar:', formData.linkCv);
      
      const id = formData.id;
      if (!id) {
        console.error('No se encontró el ID de la presentación');
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo identificar la presentación para actualizar'
        });
        return;
      }

      if (!formData.linkCv) {
        console.error('El campo linkCv está vacío');
        this.loading = false;
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'El campo URL del CV es requerido'
        });
        return;
      }

      console.log('Enviando actualización con ID:', id);
      this.presentationService.updatePresentation(id, formData).subscribe({
        next: (response) => {
          console.log('Actualización exitosa:', response);
          console.log('Link CV en respuesta:', response.linkCv);
          this.loadPresentation();
          Swal.fire({
            icon: 'success',
            title: '¡Guardado!',
            text: 'Los cambios se han guardado correctamente'
          });
        },
        error: (error) => {
          console.error('Error al guardar los cambios:', error);
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron guardar los cambios'
          });
        }
      });
    } else {
      console.log('Formulario inválido:', this.presentationForm.errors);
      console.log('Estado de validación de linkCv:', this.presentationForm.get('linkCv')?.errors);
    }
  }
}