import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseConfig } from "../Utils/firebase-config";
import { FirebaseStorage, getStorage } from "firebase/storage";

interface IFirebaseContext {
    db: Firestore | null;
    storage: FirebaseStorage | null;
  }

const initialValue: IFirebaseContext = {
    db: null,
    storage: null
  };

const FirebaseContext = createContext(initialValue);

const FirebaseProvider = ({children}: any) => {
    const [db, setDb] = useState<Firestore | null>(null);
    const [storage, setStorage] = useState<FirebaseStorage | null>(null);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const _db = getFirestore(app);
        setDb(_db);
        const _storage = getStorage(app);
        setStorage(_storage);
      }, []);

      return (
        <FirebaseContext.Provider value={{ db, storage }}>
          {children}
        </FirebaseContext.Provider>
      );
}

const useFirebaseContext = () => {
    return useContext(FirebaseContext);
  };
  
  export { FirebaseContext, FirebaseProvider, useFirebaseContext };