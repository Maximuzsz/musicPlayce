import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../../firebase-service-account.json';

@Injectable()
export class FirebaseService {
  private _firestore: admin.firestore.Firestore;
  private _auth: admin.auth.Auth;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount),
      });
      this._firestore = admin.firestore();
      this._auth = admin.auth();
      console.log('Firebase Admin SDK inicializado com sucesso.');
    }
  }

  get firestore(): admin.firestore.Firestore {
    if (!this._firestore) {
      this._firestore = admin.firestore();
    }
    return this._firestore;
  }

  get auth(): admin.auth.Auth {
    if (!this._auth) {
      this._auth = admin.auth();
    }
    return this._auth;
  }
}
