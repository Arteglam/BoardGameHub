import { Component, OnInit } from '@angular/core';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule, ReactiveFormsModule ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  gameForm: FormGroup;
  gameId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService
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

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id')!;
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
