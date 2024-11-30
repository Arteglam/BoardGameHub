import { Component, OnInit } from '@angular/core';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Game } from '../../types/game';
import { FirestoreService } from '../../services/firestore.service';
import { RouterLink } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { popUp } from '../../animations/popUp';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  animations: [popUp]
})
export class GalleryComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  paginatedGames: Game[] = [];
  searchForm: FormGroup;
  pageSize = 12;
  pageIndex = 0;
  hoverStates: { [key: string]: string } = {}; 

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
      this.paginateGames();
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
    this.paginateGames();
  }

  paginateGames(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedGames = this.filteredGames.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateGames();
  }

  onMouseEnter(gameId: string): void {
    this.hoverStates[gameId] = 'hover';
  }

  onMouseLeave(gameId: string): void {
    this.hoverStates[gameId] = 'rest';
  }

}
