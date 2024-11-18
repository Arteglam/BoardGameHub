import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { Game } from '../../types/games';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-games-catalog',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule, RouterLink],
  templateUrl: './games-catalog.component.html',
  styleUrl: './games-catalog.component.scss'
})
export class GamesCatalogComponent implements OnInit {
  games: Game[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.firestoreService.getGames().subscribe(
      (games: Game[]) => {
        this.games = games;
        console.log('Games loaded:', this.games); // Debug statement
      },
      (error) => {
        console.error('Error loading games:', error); // Debug statement
      }
    );
  }
}

