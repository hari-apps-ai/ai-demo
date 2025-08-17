import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import {
  getFirestore,
  provideFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { connectStorageEmulator } from 'firebase/storage';

export function provideFirebaseConfig(): EnvironmentProviders { 
  return makeEnvironmentProviders([
    firebaseProvider(),
    authProvider(),
    firestoreProvider(),
    functionsProvider(),
    storageProvider(),
  ]);
}

function firebaseProvider(): EnvironmentProviders {
  return provideFirebaseApp(() =>
    initializeApp(environment.api.firebaseConfig)
  );
}

function authProvider(): EnvironmentProviders {
  return provideAuth(() => {
    const auth = getAuth();
    if (!environment.production) {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
    return auth;
  });
}

function firestoreProvider(): EnvironmentProviders {
  return provideFirestore(() => {
    const firestore = getFirestore();
    if (!environment.production) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
    return firestore;
  });
}

function functionsProvider(): EnvironmentProviders {
  return provideFunctions(() => {
    const functions = getFunctions(undefined, environment.region);
    if (!environment.production) {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return functions;
  });
}

function storageProvider(): EnvironmentProviders {
  return provideStorage(() => {
    const storage = getStorage();
    if (!environment.production) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
    return storage;
  });
}
