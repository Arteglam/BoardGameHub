import { Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from "@angular/fire/auth";
import { doc, Firestore, getDoc, setDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  private user: User | null = null;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.listenToAuthStateChanges();
  }

  // Listen to auth state changes
  private listenToAuthStateChanges(): void {
    authState(this.auth).subscribe((user: User | null) => {
      this.user = user;
      if (user) {
        console.log('User signed in:', user);
      } else {
        console.log('User signed out');
      }
    });
  }

  // Sign up with email and password
  public async signUpWithEmailAndPassword(email: string, password: string, displayName: string): Promise<UserCredential> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    if (cred.user) {
      this.user = cred.user;
      // Create user document in Firestore
      const userDocRef = doc(this.firestore, `Users/${cred.user.uid}`);
      await setDoc(userDocRef, { email, displayName });
    }
    return cred;
  }

  // Sign in with email and password
  public async signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    if (cred.user) {
      const userDocRef = doc(this.firestore, `Users/${cred.user.uid}`);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        this.user = cred.user;
        return cred;
      } else {
        await this.auth.signOut();
        throw new Error('User does not exist in the database');
      }
    }
    return cred;
  }

  // Sign out
  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  // Get the current user
  public getUser(): Observable<User | null> {
    return authState(this.auth);
  }
}