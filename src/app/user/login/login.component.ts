import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { Router, RouterLink } from '@angular/router';
import { FireAuthService } from '../../services/fireauth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
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
        this.snackBar.open('Login failed. Please check your credentials and try again.', 'Close', {
          duration: 3000,
        });
      }
    } else {
      this.errorMessage = 'Form is invalid';
    }
  }
}
