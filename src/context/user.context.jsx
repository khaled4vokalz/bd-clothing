import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAutheStateChangedListener } from "../utils/firebase/firebase.utils";

// as the actual value we need to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAutheStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
