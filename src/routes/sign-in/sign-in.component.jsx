import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth, signInWithGooglePopup,signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

export default function SignIn() {
  useEffect(() => {
    getRedirectResult(auth).then(response => {
      if(response && response.user) {
const userDocRef = createUserDocumentFromAuth(response.user);
      }

    });
  }, [])
  const logGoogleUser = async () => {
  const { user} = await signInWithGooglePopup();
  const userDocRef = await createUserDocumentFromAuth(user);
  }
  return (
  <div>
    <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign in with google redirect</button>
    </div>
  )
}
