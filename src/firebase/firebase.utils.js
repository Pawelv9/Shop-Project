import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import keys from '../keys'

  const config = {
    apiKey: keys.API_KEY,
    authDomain: keys.AUTH_DOMAIN,
    databaseURL: keys.DATABASE_URL,
    projectId: keys.PROJECT_ID,
    storageBucket: keys.STORAGE_BUCKET,
    messagingSenderId: keys.MESSAGING_SENDER_ID,
    appId: keys.APP_ID
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;