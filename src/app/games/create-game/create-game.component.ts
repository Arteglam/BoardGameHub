import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { Game } from '../../types/games';

@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent {
  gameForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.gameForm = this.fb.group({
      title: [''],
      year: [''],
      designer: [''],
      artist: [''],
      publisher: [''],
      rating: [''],
      category: [''],
      description: [''],
      image: ['']
    });
  }

  async onSubmit() {
    if (this.gameForm.valid) {
      const newGame: Game = {
        _id: '',
        ...this.gameForm.value,
        addedBy: { /* User object */ },
        creatorId: { /* User object */ }
      };
  
      await this.firestoreService.createGame(newGame);
      this.router.navigate(['/catalog']);
    }
  }
}
