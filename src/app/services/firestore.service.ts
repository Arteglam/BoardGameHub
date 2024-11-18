import { Injectable } from "@angular/core";
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, updateDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Game } from "../types/games";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    constructor(
        private firestore: Firestore) { }

 // Create a new game
 async createGame(game: Game): Promise<void> {
    const gamesCollection = collection(this.firestore, 'Games');
    const docRef = await addDoc(gamesCollection, game);
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
}