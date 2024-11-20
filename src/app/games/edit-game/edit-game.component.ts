import { Component, OnInit } from '@angular/core';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-game.component.html',
  styleUrl: './edit-game.component.scss'
})
export class EditGameComponent implements OnInit {
  gameForm: FormGroup;
  gameId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    this.gameId = this.route.snapshot.paramMap.get('id')!;
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      designer: ['', Validators.required],
      artist: ['', Validators.required],
      publisher: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadGameDetails();
  }

  async loadGameDetails() {
    const game = await this.firestoreService.getGameById(this.gameId);
    if (game) {
      this.gameForm.patchValue(game);
    }
  }

  async onSave() {
    if (this.gameForm.valid) {
      await this.firestoreService.updateGame(this.gameId, this.gameForm.value);
      this.router.navigate(['/catalog']);
    }
  }

  async onDelete() {
    await this.firestoreService.deleteGame(this.gameId);
    this.router.navigate(['/catalog']);
  }
}
