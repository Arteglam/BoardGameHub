import { Component, OnInit } from '@angular/core';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';
import { Game } from '../../types/game';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { User } from '@angular/fire/auth';
import { FireAuthService } from '../../services/fireauth.service';
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule, CommentsComponent, CommentFormComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  game: Game | null = null;
  gameId: string;
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService,
    private authService: FireAuthService
  ) {
    this.gameId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadGameDetails();
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  loadGameDetails(): void {
    this.firestoreService.getGameById(this.gameId).then(game => {
      this.game = game;
    });
  }

  async deleteGame() {
    if (this.gameId) {
      await this.firestoreService.deleteGame(this.gameId);
      this.router.navigate(['/catalog']);
    }
  }

  editGame() {
    this.router.navigate(['/edit', this.gameId]);
  }

  isCreator(): boolean {
    return !!this.user && !!this.game && this.user.uid === this.game.userId;
  }
}
