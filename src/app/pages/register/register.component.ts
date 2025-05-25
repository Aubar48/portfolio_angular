import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]]
    });
  }

  get f() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.loading = true;

    if (this.registerForm.invalid) {
      return;
    }

    const registerData = {
      nombre: this.registerForm.value.nombre,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente',
          confirmButtonText: 'Continuar',
          allowOutsideClick: false
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 409) {
          this.errorMessage = 'El correo electrónico ya está registrado';
        } else {
          this.errorMessage = 'Error en el servidor. Por favor, intenta más tarde.';
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: this.errorMessage,
          confirmButtonText: 'Entendido'
        });
      }
    });
  }
}
