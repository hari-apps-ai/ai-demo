import { inject, Injectable } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  readonly functions = inject(Functions);

  private _getFilesFromGoogleDrive = httpsCallableData<void, { message: string }>(this.functions, 'getFilesFromGoogleDrive');


  getFilesFromGoogleDrive(): Observable<{ message: string }> {
    return this._getFilesFromGoogleDrive().pipe(
      catchError(err => {
        console.error('Error calling getFilesFromGoogleDrive function', err);
        return of({ message: 'Error fetching files from Google Drive' });
      })
    );
  }
  
}
