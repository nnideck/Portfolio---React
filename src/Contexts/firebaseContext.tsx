import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseConfig } from "../Utils/firebase-config";

interface IFirebaseContext {
    db: Firestore | null;
  }

const initialValue: IFirebaseContext = {
    db: null,
  };

const FirebaseContext = createContext(initialValue);

//* pq essa função recebe uma children?
const FirebaseProvider = ({children}: any) => {
    const [db, setDb] = useState<Firestore | null>(null);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const _db = getFirestore(app);
        setDb(_db);
      }, []);

      return (
        <FirebaseContext.Provider value={{ db }}>
          {children}
        </FirebaseContext.Provider>
      );
}

const useFirebaseContext = () => {
    return useContext(FirebaseContext);
  };
  
  export { FirebaseContext, FirebaseProvider, useFirebaseContext };