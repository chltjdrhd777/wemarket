import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.F_APIKEY,
    authDomain: process.env.F_DOMAIN,
    projectId: process.env.F_PROJECTID,
    storageBucket: process.env.F_STORAGEBUKKET,
    messagingSenderId: process.env.F_MESSAGINGID,
    appId: process.env.F_APPID,
    measurementId: process.env.F_MEASURMENT
};

const init = firebase.initializeApp(firebaseConfig);
export const db = init.firestore();
export const database_collection = db.collection('test');
