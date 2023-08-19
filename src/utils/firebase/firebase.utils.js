import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect,GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "bd-clothing.firebaseapp.com",
  projectId: "bd-clothing",
  storageBucket: "bd-clothing.appspot.com",
  messagingSenderId: "293209788719",
  appId: "1:293209788719:web:1c98b9f0d0e47b04f391da"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

