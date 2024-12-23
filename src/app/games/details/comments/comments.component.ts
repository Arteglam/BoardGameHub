import { Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FirestoreService } from '../../../services/firestore.service';
import { FireAuthService } from '../../../services/fireauth.service';
import { MaterialLibraryModule } from '../../../material-library/material-library.module';
import { Comment } from '../../../types/comment';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  @Input() gameId!: string;
  comments: Comment[] = [];
  paginatedComments: Comment[] = [];
  user: User | null = null;
  editingComment: Comment | null = null;
  editText: string = '';
  pageSize = 10;
  pageIndex = 0;
  

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
        createdAt: (comment.createdAt as any as Timestamp).toDate()
      }));
      this.paginateComments();
    });
  }

  paginateComments(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedComments = this.comments.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateComments();
  }

  async deleteComment(commentId: string): Promise<void> {
    if (this.user) {
      await this.firestoreService.deleteComment(this.gameId, commentId);
      this.comments = this.comments.filter(comment => comment.id !== commentId);
      this.paginateComments();
    }
  }

  editComment(comment: Comment): void {
    this.editingComment = comment; 
    this.editText = comment.text; 
  }

  async updateComment(): Promise<void> {
    if (this.user && this.editingComment) {
      await this.firestoreService.updateComment(this.gameId, this.editingComment.id, this.editText);
      const comment = this.comments.find(comment => comment.id === this.editingComment!.id);
      if (comment) {
        comment.text = this.editText;
      }
      this.editingComment = null;
      this.editText = '';
      this.paginateComments(); 
    }
  }

  cancelEdit(): void {
    this.editingComment = null; 
    this.editText = ''; 
  }
}
