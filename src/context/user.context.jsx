import { createContext, useEffect, useReducer } from 'react';
import {
  createUserDocumentFromAuth,
  onAutheStateChangedListener,
} from '../utils/firebase/firebase.utils';
import { USER_ACTION_TYPES, userReducer } from '../reducers/user-reducer';

// as the actual value we need to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = user => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAutheStateChangedListener(async user => {
      if (user) {
        await createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
