import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Asegúrate de que esté en plural `styleUrls`
  host: { '[attr.id]': "'login-component-id'" } 
})
export class LoginComponent {

  loginForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  errorMessage: string = '';

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        const { token, role, user_id } = response;
        this.authService.setToken(token, role, user_id);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
