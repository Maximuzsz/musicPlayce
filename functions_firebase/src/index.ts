import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// ... (código da função createUser que já fizemos)
export const createUser = functions
  .region("southamerica-east1")
  .https.onRequest(async (request, response) => {
    // ...
  });