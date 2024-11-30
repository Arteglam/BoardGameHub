import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../../services/firestore.service';
import { FireAuthService } from '../../../services/fireauth.service';
import { CommonModule } from '@angular/common';
import { MaterialLibraryModule } from '../../../material-library/material-library.module';
import { Comment } from '../../../types/comment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, MaterialLibraryModule, ReactiveFormsModule, RouterLink],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent implements OnInit {
  @Input() gameId!: string;
  @Input() editingComment: Comment | null = null; 
  @Output() commentUpdated = new EventEmitter<string>(); 
  @Output() editingCleared = new EventEmitter<void>(); 
  commentForm: FormGroup;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private authService: FireAuthService
  ) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  async addComment(): Promise<void> {
    if (this.commentForm.valid && this.user) {
      const commentData: Comment = {
        id: this.firestoreService.generateId(),
        text: this.commentForm.value.text,
        userId: this.user.uid,
        userName: this.user.displayName || 'Anonymous',
        createdAt: new Date()
      };
      await this.firestoreService.addComment(this.gameId, commentData);
      this.commentForm.reset();
    }
  }
}
