import { Injectable } from "@angular/core";
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, orderBy, query, Query, setDoc, Timestamp, updateDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Game } from "../types/games";
import { getDownloadURL, ref, Storage, uploadBytes } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore, private storage: Storage) { }

  // Get games sorted by creation date
  getGames(): Observable<Game[]> {
    const gamesCollection = collection(this.firestore, 'Games');
    const gamesQuery = query(gamesCollection, orderBy('createdAt', 'desc'));
    return collectionData(gamesQuery, { idField: '_id' }) as Observable<Game[]>;
  }

  // Get game by ID
  async getGameById(gameId: string): Promise<Game | null> {
    const gameDocRef = doc(this.firestore, `Games/${gameId}`);
    const gameDocSnap = await getDoc(gameDocRef);
    if (gameDocSnap.exists()) {
      return gameDocSnap.data() as Game;
    } else {
      console.log('No such game!');
      return null;
    }
  }

  // Create a new game
  async createGame(game: Game, userId: string): Promise<void> {
    const gamesCollection = collection(this.firestore, 'Games');
    await addDoc(gamesCollection, { ...game, userId, createdAt: Timestamp.now() });
  }

  // Update game
  async updateGame(gameId: string, game: Partial<Game>): Promise<void> {
    const gameDocRef = doc(this.firestore, `Games/${gameId}`);
    await updateDoc(gameDocRef, game);
  }

  // Delete game
  async deleteGame(gameId: string): Promise<void> {
    const gameDocRef = doc(this.firestore, `Games/${gameId}`);
    await deleteDoc(gameDocRef);
  }

  // Create user profile
  async createUserProfile(userId: string, profileData: { email: string, displayName: string }): Promise<void> {
    const userDocRef = doc(this.firestore, `Users/${userId}`);
    await setDoc(userDocRef, profileData);
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<{ email: string, displayName: string, profileImageUrl?: string } | null> {
    const userDocRef = doc(this.firestore, `Users/${userId}`);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return userDocSnap.data() as { email: string, displayName: string, profileImageUrl?: string };
    } else {
      console.log('No such user profile!');
      return null;
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, profileData: { displayName?: string, profileImageUrl?: string }): Promise<void> {
    const userDocRef = doc(this.firestore, `Users/${userId}`);
    await updateDoc(userDocRef, profileData);
  }

  // Upload profile image
  async uploadProfileImage(userId: string, file: File): Promise<string> {
    const storageRef = ref(this.storage, `profileImages/${userId}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  // Add game to user profile
  async addGameToUserProfile(userId: string, game: Game): Promise<void> {
    const userGamesCollection = collection(this.firestore, `Users/${userId}/Games`);
    await setDoc(doc(userGamesCollection, game._id), game); // Use setDoc with game ID
  }

  // Get games from user profile
  getUserGames(userId: string): Observable<Game[]> {
    const userGamesCollection = collection(this.firestore, `Users/${userId}/Games`);
    return collectionData(userGamesCollection, { idField: '_id' }) as Observable<Game[]>;
  }

  // Remove game from user profile
  async removeGameFromUserProfile(userId: string, gameId: string): Promise<void> {
    const gameDocRef = doc(this.firestore, `Users/${userId}/Games/${gameId}`);
    await deleteDoc(gameDocRef);
  }

  // Check if game is in user profile
  async isGameInUserProfile(userId: string, gameId: string): Promise<boolean> {
    const gameDocRef = doc(this.firestore, `Users/${userId}/Games/${gameId}`);
    const gameDocSnap = await getDoc(gameDocRef);
    return gameDocSnap.exists();
  }

  // Save contact form submission
  async saveContactForm(contactData: { name: string, email: string, message: string }): Promise<void> {
    const contactCollection = collection(this.firestore, 'ContactForms');
    await addDoc(contactCollection, contactData);
  }
}