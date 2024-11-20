import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { Game } from '../../types/games';
import { FireAuthService } from '../../services/fireauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
  userGames: Game[] = [];
  gameToRemove: Game | null = null;
  loading: boolean = true; // Add loading state
  

  constructor(
    private authService: FireAuthService,
    private firestoreService: FirestoreService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(async user => {
      this.user = user;
      if (user) {
        this.userProfile = await this.firestoreService.getUserProfile(user.uid);
        this.loadUserGames(user.uid);
      }
    });
  }

  loadUserGames(userId: string): void {
    this.firestoreService.getUserGames(userId).subscribe((games: Game[]) => {
      this.userGames = games;
      this.loading = false; // Set loading to false when games are loaded
    });
  }

  confirmRemoveGame(game: Game): void {
    this.gameToRemove = game;
    const dialogRef = this.dialog.open(RemoveGameDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'remove') {
        this.removeGame();
      }
    });
  }

  async removeGame(): Promise<void> {
    if (this.user && this.gameToRemove) {
      await this.firestoreService.removeGameFromUserProfile(this.user.uid, this.gameToRemove._id);
      this.loadUserGames(this.user.uid);
      this.gameToRemove = null;
    }
  }
}

// Confirm removal dialog
@Component({
  selector: 'remove-game-dialog',
  template: `
    <h1 mat-dialog-title>Confirm Removal</h1>
    <div mat-dialog-content>Are you sure you want to remove this game from your profile?</div>
    <div mat-dialog-actions class="dialog-actions">
      <button mat-button [mat-dialog-close]="'remove'">Remove</button>
      <button mat-button mat-dialog-close>Cancel</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule],
  styleUrl: './profile.component.scss'
})
export class RemoveGameDialog { }
