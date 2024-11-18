import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { Game } from '../../types/games';
import { FireAuthService } from '../../services/fireauth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, MaterialLibraryModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  userProfile: { email: string, displayName: string } | null = null;
  games: Game[] = [];
  userGames: Game[] = [];

  constructor(
    private authService: FireAuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(async user => {
      this.user = user;
      if (user) {
        this.userProfile = await this.firestoreService.getUserProfile(user.uid);
      }
      this.loadUserGames();
    });
    this.loadGames();
  }

  loadGames(): void {
    this.firestoreService.getGames().subscribe((games: Game[]) => {
      this.games = games;
    });
  }

  loadUserGames(): void {
    // Load user games from Firestore or any other logic to fetch user-specific games
  }

  addGameToProfile(game: Game): void {
    this.userGames.push(game);
    // Optionally, save this information to Firestore
  }
}
