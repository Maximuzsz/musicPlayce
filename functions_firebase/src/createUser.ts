import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

interface UserPayload {
  email: string;
  name: string;
}

export const createUser = functions.https.onRequest(async (req, res) => {
  try {
    const db = admin.firestore();

    if (req.method !== "POST") {
      res.status(405).json({ error: "Método não permitido" });
      return;
    }

    const { email, name } = req.body as UserPayload;

    if (!name || typeof name !== "string" || !name.trim()) {
      res.status(400).json({ error: "Nome é obrigatório" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      res.status(400).json({ error: "Email inválido" });
      return;
    }

    const userRef = db.collection("users").doc(email);
    const existingDoc = await userRef.get();

    if (existingDoc.exists) {
      res.status(409).json({ error: "Usuário já existe" });
      return;
    }

    await userRef.set({
      email,
      name,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
