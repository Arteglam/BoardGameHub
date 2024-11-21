import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { FireAuthService } from '../../services/fireauth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, MaterialLibraryModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: FireAuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { displayName, email, password } = this.registerForm.value;
      try {
        await this.authService.signUpWithEmailAndPassword(email, password, displayName);
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/profile']);
      } catch (error) {
        console.error('Error during registration:', error);
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}
