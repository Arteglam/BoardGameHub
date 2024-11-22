import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { Game } from '../../types/games';
import { FireAuthService } from '../../services/fireauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, MaterialLibraryModule, CommonModule, MatDialogModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  userProfile: { email: string, displayName: string, profileImageUrl?: string } | null = null;
  userGames: Game[] = [];
  gameToRemove: Game | null = null;
  loading: boolean = true; 
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  
  constructor(
    private authService: FireAuthService,
    private firestoreService: FirestoreService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
      this.loading = false; 
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!validTypes.includes(file.type)) {
        this.errorMessage = 'Invalid file type. Please select an image file (jpeg, png, gif).';
        this.selectedFile = null;
      } else if (file.size > maxSize) {
        this.errorMessage = 'File size exceeds the limit of 5 MB.';
        this.selectedFile = null;
      } else {
        this.errorMessage = null;
        this.selectedFile = file;
      }
    }
  }

  async uploadProfileImage(): Promise<void> {
    if (this.user && this.selectedFile) {
      try {
        const downloadURL = await this.firestoreService.uploadProfileImage(this.user.uid, this.selectedFile);
        await this.firestoreService.updateUserProfile(this.user.uid, { profileImageUrl: downloadURL });
        this.userProfile = await this.firestoreService.getUserProfile(this.user.uid); // Refresh profile data
        this.selectedFile = null; // Clear the selected file
        this.snackBar.open('Profile image uploaded successfully!', 'Close', {
          duration: 3000,
        });
      } catch (error) {
        console.error('Error uploading profile image:', error);
        this.snackBar.open('Error uploading profile image. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    }
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
