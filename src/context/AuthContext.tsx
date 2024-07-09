import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../@types/CustomTypes";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const initContextValue = {
  user: {} as User,
  setUser: () => {
    throw new Error("context not initialised");
  },
  register: () => {
    throw new Error("context not initialised");
  },
  login: () => {
    throw new Error("context not initialised");
  },
  logout: () => {
    throw new Error("context not initialised");
  },
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(initContextValue);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("user :>> ", user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error :>> ", error);
    }
  };

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("user :>> ", userCredential.user);
        if (userCredential.user.email) {
          const uid = userCredential.user.uid;
          const email = userCredential.user.email;
          setUser({ uid, email });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error :>> ", error);
      });
  };

  //Create a function that everytime it runs, uses a firebase method to check whether the user is logged in (on Firabase servers) or Not.
  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("user IS LOGGED IN");
        if (user.email) {
          setUser({ email: user.email, uid: user.uid });
        }
      } else {
        // User is signed out
        // ...
        console.log("user IS NOT logged in");
        setUser(null);
      }
    });
  };

  // logout function

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Logout succesful");
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log(
          "something went wrong during Logout ...you are still loggedin"
        );
      });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
