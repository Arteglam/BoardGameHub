import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { Game } from '../../types/games';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { FireAuthService } from '../../services/fireauth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-games-catalog',
  standalone: true,
  imports: [MaterialLibraryModule, RouterLink, CommonModule],
  templateUrl: './games-catalog.component.html',
  styleUrl: './games-catalog.component.scss'
})
export class GamesCatalogComponent implements OnInit {
  games: Game[] = [];
  user: User | null = null;
  userGameIds: Set<string> = new Set();
  loading: boolean = true;
  sortCriteria: string = 'createdAt'; // Default sorting criteria

  constructor(
    private firestoreService: FirestoreService,
    private authService: FireAuthService
  ) { }

  ngOnInit(): void {
    this.loadGames();
    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (user) {
        this.loadUserGames(user.uid);
      }
    });
  }

  loadGames(): void {
    this.firestoreService.getGames().subscribe((games: Game[]) => {
      this.games = games;
      this.sortGames();
      this.loading = false;
    });
  }

  loadUserGames(userId: string): void {
    this.firestoreService.getUserGames(userId).subscribe((games: Game[]) => {
      this.userGameIds = new Set(games.map(game => game._id));
    });
  }

  async addGameToProfile(game: Game): Promise<void> {
    if (this.user) {
      await this.firestoreService.addGameToUserProfile(this.user.uid, game);
      this.userGameIds.add(game._id);
    }
  }

  isGameInUserProfile(gameId: string): boolean {
    return this.userGameIds.has(gameId);
  }

  onSortCriteriaChange(criteria: string): void {
    this.sortCriteria = criteria;
    this.sortGames();
  }

  sortGames(): void {
    if (this.sortCriteria === 'rating') {
      this.games.sort((a, b) => b.rating - a.rating);
    } else if (this.sortCriteria === 'year') {
      this.games.sort((a, b) => b.year - a.year);
    } else {
      this.games.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    }
  }

  trackById(index: number, game: Game): string {

    return game._id;

  }
}

