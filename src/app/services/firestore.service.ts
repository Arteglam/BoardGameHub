import { Injectable } from "@angular/core";
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, setDoc, updateDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Game } from "../types/games";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) { }

  // Create a new game
  async createGame(game: Game): Promise<void> {
    const gamesCollection = collection(this.firestore, 'Games');
    const docRef = await addDoc(gamesCollection, game);
    await updateDoc(docRef, { _id: docRef.id }); // Set the document ID in the game object
    console.log('Game created with ID:', docRef.id);
  }

  // Read all games
  getGames(): Observable<Game[]> {
    const gamesCollection = collection(this.firestore, 'Games');
    return collectionData(gamesCollection, { idField: '_id' }) as Observable<Game[]>;
  }

  // Read a single game by ID
  async getGameById(id: string): Promise<Game | null> {
    const docRef = doc(this.firestore, `Games/${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Game;
    } else {
      console.log('No such document!');
      return null;
    }
  }

  // Update a game by ID
  async updateGame(id: string, game: Partial<Game>): Promise<void> {
    const docRef = doc(this.firestore, `Games/${id}`);
    await updateDoc(docRef, game);
    console.log('Game updated with ID:', id);
  }

  // Delete a game by ID
  async deleteGame(id: string): Promise<void> {
    const docRef = doc(this.firestore, `Games/${id}`);
    await deleteDoc(docRef);
    console.log('Game deleted with ID:', id);
  }

  // Create user profile
  async createUserProfile(userId: string, profileData: { email: string, displayName: string }): Promise<void> {
    const userDocRef = doc(this.firestore, `Users/${userId}`);
    await setDoc(userDocRef, profileData);
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<{ email: string, displayName: string } | null> {
    const userDocRef = doc(this.firestore, `Users/${userId}`);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return userDocSnap.data() as { email: string, displayName: string };
    } else {
      console.log('No such user profile!');
      return null;
    }
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