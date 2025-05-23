import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    if (this.loginForm.invalid) return;

    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);

        // Guardar email en localStorage si seleccionó "Recordar"
        if (rememberMe) {
          localStorage.setItem('userEmail', email);
        } else {
          localStorage.removeItem('userEmail');
        }

        // Aquí podés redirigir, mostrar mensaje o manejar el token que te envíe el backend
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error en el login, intenta de nuevo';
        console.error('Error en login:', err);
      }
    });
  }
}
