export interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string; 
    createdAt: { seconds: number; nanoseconds: number };
  }