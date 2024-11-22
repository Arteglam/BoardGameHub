import { Component, OnInit } from '@angular/core';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Game } from '../../types/games';
import { FirestoreService } from '../../services/firestore.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  searchForm: FormGroup;

  constructor(
    private firestoreService: FirestoreService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadGames();
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.filterGames(value);
    });
  }

  loadGames(): void {
    this.firestoreService.getGames().subscribe((games: Game[]) => {
      this.games = games;
      this.filteredGames = games;
    });
  }

  filterGames(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredGames = this.games;
    } else {
      this.filteredGames = this.games.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
