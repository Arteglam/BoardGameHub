import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@angular/fire/auth';
import { FireAuthService } from '../../services/fireauth.service';

@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent {
  gameForm: FormGroup;
  errorMessage: string | null = null;
  user: User | null = null;
  

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private authService: FireAuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.gameForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(70)]],
      year: ['', [Validators.required, Validators.min(1975)]],
      designer: ['', [Validators.required, Validators.maxLength(70)]],
      artist: ['', [Validators.required, Validators.maxLength(70)]],
      publisher: ['', [Validators.required, Validators.maxLength(70)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      category: ['', [Validators.required, Validators.maxLength(70)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      image: ['', [Validators.required, this.httpValidator]]
    });

    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  // Custom validator to check if the value starts with "http://" or "https://"
  httpValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !(value.startsWith('http://') || value.startsWith('https://'))) {
      return { invalidUrl: 'URL must start with "http://" or "https://"' };
    }
    return null;
  }

  async onSubmit() {
    if (this.gameForm.valid && this.user) {
      const newGame = this.gameForm.value;
      try {
        await this.firestoreService.createGame(newGame, this.user.uid, this.user.displayName!);
        this.snackBar.open('Game created successfully!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/catalog']);
      } catch (error) {
        console.error('Error creating game:', error);
        this.snackBar.open('Error creating game. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}

