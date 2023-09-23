import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ButtonsContainer, SignInContainer } from './sign-in.styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';

const defaultFormFields = {
  email: '',
  password: '',
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      setFormFields(defaultFormFields);
      navigate('/');
    } catch (error) {
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        alert('incorrect email or password');
      } else {
        console.error(error);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}
