import { Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FirestoreService } from '../../../services/firestore.service';
import { FireAuthService } from '../../../services/fireauth.service';
import { MaterialLibraryModule } from '../../../material-library/material-library.module';
import { Comment } from '../../../types/comment';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  @Input() gameId!: string;
  comments: Comment[] = [];
  user: User | null = null;
  editingComment: Comment | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private authService: FireAuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
    this.loadComments();
  }

  loadComments(): void {
    this.firestoreService.getComments(this.gameId).subscribe(comments => {
      this.comments = comments.map(comment => ({
        ...comment,
        createdAt: (comment.createdAt as unknown as Timestamp).toDate()
      }));
    });
  }

  async deleteComment(commentId: string): Promise<void> {
    if (this.user) {
      await this.firestoreService.deleteComment(this.gameId, commentId);
      this.comments = this.comments.filter(comment => comment.id !== commentId);
    }
  }

  async updateComment(commentId: string, newText: string): Promise<void> {
    if (this.user) {
      await this.firestoreService.updateComment(this.gameId, commentId, newText);
      const comment = this.comments.find(comment => comment.id === commentId);
      if (comment) {
        comment.text = newText;
      }
    }
  }
}
