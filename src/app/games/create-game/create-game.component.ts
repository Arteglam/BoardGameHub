import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { Game } from '../../types/games';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      designer: ['', Validators.required],
      artist: ['', Validators.required],
      publisher: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.gameForm.valid) {
      const newGame = this.gameForm.value;
      try {
        await this.firestoreService.createGame(newGame);
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

