import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IExportsContext {
  greeting: string;
  presentation: string;
  name: string;
  saving: boolean;
  loadValues: () => Promise<void>;
  saveValues: (data: IFormValues) => Promise<void>;
}

interface IFormValues {
  greeting: string;
  presentation: string;
  name: string;
}

const initialValue: IExportsContext = {
  greeting: "",
  presentation: "",
  name: "",
  saving: false,
  loadValues: () => Promise.resolve(),
  saveValues: () => Promise.resolve(),
};

const PortfolioContext = createContext(initialValue);

const PortfolioProvider = ({ children }: any) => {
  const { db } = useFirebaseContext();
  const [greeting, setGreeting] = useState("");
  const [presentation, setPresentation] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const loadValues = async () => {
    if (db) {
      const docRef = doc(db!, "portfolio", "home");
      const docSnap = await getDoc(docRef);
      setGreeting(docSnap.data()!.greeting);
      setPresentation(docSnap.data()!.presentation);
      setName(docSnap.data()!.name);
    }
  };
  const saveValues = async (data: IFormValues) => {
    if (!saving) {
      setSaving(true);
      await setDoc(doc(db!, "portfolio", "home"), {
        greeting: data.greeting,
        presentation: data.presentation,
        name: data.name,
      });
      setSaving(false);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{ greeting, presentation, name, saving, loadValues, saveValues }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

const usePortfolioContext = () => {
  return useContext(PortfolioContext);
};

export { PortfolioContext, PortfolioProvider, usePortfolioContext };
