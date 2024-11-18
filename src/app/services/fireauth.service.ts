import { Injectable } from "@angular/core";
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class FireAuthService {
    private user: User | null = null;
    constructor(
        private auth: Auth
    ) {

    }

    // Listen to auth state changes
    private listenToAuthStateChanges(): void {
        authState(this.auth).subscribe((user: User | null) => {
            if (user) {
                // User is signed in
            } else {
                // User is signed out
            }
        });
    }

    // Sign up with email and password
    public async signUpWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        const cred = await createUserWithEmailAndPassword(this.auth, email, password);
        if (cred.user) {
            this.user = cred.user;
        }
        return cred;
    }

    // Sign in with email and password
    public signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    // Sign out
    public async signOut(): Promise<void> {
        await this.auth.signOut();
    }
}