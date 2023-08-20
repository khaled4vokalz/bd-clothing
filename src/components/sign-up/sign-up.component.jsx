import { useState } from "react";
import { createUserDocumentFromAuth, createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword} = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      alert("passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      const userDocRef = await createUserDocumentFromAuth({ ...user, displayName });
      setFormFields(defaultFormFields);
    }catch(error){
      if(error.code === 'auth/email-already-in-use'){
        alert('cannot create user, Email already in use');
        return;
      }
      console.error(error);
    }
  }

  const handleChange = (event) => {
  const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }
  return (
  <div>
    <h1>Sign up with your email and password</h1>
<form onSubmit={handleSubmit}>
        <FormInput label="Display Name" required onChange={handleChange} name="displayName" value={displayName}/>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
