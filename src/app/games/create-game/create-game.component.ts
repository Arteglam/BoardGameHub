import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { Game } from '../../types/games';
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
      title: ['', [Validators.required, Validators.maxLength(50)]],
      year: ['', [Validators.required, Validators.min(1975)]],
      designer: ['', [Validators.required, Validators.maxLength(50)]],
      artist: ['', [Validators.required, Validators.maxLength(50)]],
      publisher: ['', [Validators.required, Validators.maxLength(50)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      image: ['', Validators.required,]
    });

    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  async onSubmit() {
    if (this.gameForm.valid && this.user) {
      const newGame = this.gameForm.value;
      try {
        await this.firestoreService.createGame(newGame, this.user.uid);
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

