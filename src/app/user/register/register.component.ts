import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { FireAuthService } from '../../services/fireauth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, MaterialLibraryModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: FireAuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { displayName, email, password } = this.registerForm.value;
      try {
        const userCredential = await this.authService.signUpWithEmailAndPassword(email, password);
        if (userCredential.user) {
          await this.firestoreService.createUserProfile(userCredential.user.uid, { email, displayName });
          this.router.navigate(['/profile']);
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
