import { Component } from '@angular/core';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      try {
        await this.firestoreService.saveContactForm(this.contactForm.value);
        console.log('Form Submitted', this.contactForm.value);
        this.snackBar.open('Thank you for contacting us. We will reach to you soon!', 'Close', {
          duration: 3000,
        });
        this.contactForm.reset();
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error submitting form', error);
        this.snackBar.open('Error submitting form. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    }
  }
}