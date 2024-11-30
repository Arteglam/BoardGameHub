import { Component, OnInit } from '@angular/core';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  }


   // Custom validator to check if the value starts with "http://" or "https://"
   httpValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !(value.startsWith('http://') || value.startsWith('https://'))) {
      return { invalidUrl: 'URL must start with "http://" or "https://"' };
    }
    return null;
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
      this.router.navigate(['/details', this.gameId]);
    }
  }

  async onDelete() {
    await this.firestoreService.deleteGame(this.gameId);
    this.router.navigate(['/catalog']);
  }
}
