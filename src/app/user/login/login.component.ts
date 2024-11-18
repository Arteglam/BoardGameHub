import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { Router, RouterLink } from '@angular/router';
import { FireAuthService } from '../../services/fireauth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MaterialLibraryModule, RouterLink, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: FireAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.signInWithEmailAndPassword(email, password);
        this.router.navigate(['/profile']);
      } catch (error) {
        console.error('Error during login:', error);
        if (error instanceof Error && 'code' in error) {
          this.errorMessage = this.getErrorMessage((error as any).code);
        } else {
          this.errorMessage = 'An unknown error occurred';
        }
      }
    } else {
      this.errorMessage = 'Form is invalid';
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email format';
      case 'auth/user-disabled':
        return 'User account is disabled';
      case 'auth/user-not-found':
        return 'No user found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      default:
        return 'An unknown error occurred';
    }
  }
}
