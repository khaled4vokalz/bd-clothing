import { useState } from "react";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
}

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    const {user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      setFormFields(defaultFormFields);
    } catch (error) {
      if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        alert('incorrect email or password')
      } else {
      console.error(error);
      }       
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }
  return (
  <div className="sign-in-container">
      <h2>Already have an account?</h2>
    <span>Sign in with your email and password</span>
<form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType='google' type="default" onClick={signInWithGoogle}>Google sign in</Button>
        </div>
      </form>
    </div>
  )
}
