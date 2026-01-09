import admin from "firebase-admin";

// --- Firebase Admin 初期化（重複初期化防止） ---
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
        ),
    });
}

export const db = admin.firestore();