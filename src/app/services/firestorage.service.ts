import { Injectable } from '@angular/core';
import { ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(
    private storage: Storage
  ) { }

// Upload file
  async uploadFile(path: string, file: File) {
    const storageRef = ref(this.storage, path);
    return await uploadBytes(storageRef, file);
  }
}
