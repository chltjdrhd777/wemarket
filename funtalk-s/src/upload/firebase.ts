//Image_upload
import admin from 'firebase-admin';
import serviceAccount from './firebase_serviceKey.json';
import dotenv from 'dotenv';

dotenv.config();

export const fireabseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: process.env.F_STORAGEBUKKET
});

export const bucket = admin.storage().bucket();
