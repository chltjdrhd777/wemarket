import firebaseAdmin from 'firebase-admin';
import path from 'path';

const serviceAccount = path.resolve('../../secureKey/firebaseServiceKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: 'wemarket-3996e.appspot.com'
});

const firebaseAuth = firebaseAdmin.auth();
const firebaseFirestore = firebaseAdmin.firestore();
const firebaseBucket = firebaseAdmin.storage().bucket();

export { firebaseAuth, firebaseBucket, firebaseFirestore };
