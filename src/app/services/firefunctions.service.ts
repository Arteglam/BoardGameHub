import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class FireFunctionsService {

  constructor(
    private functions: Functions
  ) { }

  private async callFunction(functionName: string, payload: any): Promise<any> {
    const callable = httpsCallable(this.functions, functionName);
    return callable(payload);
  }
}
