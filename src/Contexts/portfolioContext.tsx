import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IExportsContext {
  greeting: string;
  presentation: string;
  name: string;
  loadValues: () => void;
}

const initialValue: IExportsContext = {
  greeting: "",
  presentation: "",
  name: "",
  loadValues: () => {},
};

const PortfolioContext = createContext(initialValue);

const PortfolioProvider = ({ children }: any) => {
    const { db } = useFirebaseContext();
    const [greeting, setGreeting] = useState("");
    const [presentation, setPresentation] = useState("");
    const [name, setName] = useState("");
  
    const loadValues = async () => {
      if (db) {
        const docRef = doc(db!, "portfolio", "home");
        const docSnap = await getDoc(docRef);
        console.log("docSnap", docSnap.data());
        setGreeting(docSnap.data()!.greeting);
        setPresentation(docSnap.data()!.presentation);
        setName(docSnap.data()!.name);
      }
    };
  
    return (
      <PortfolioContext.Provider value={{ greeting, presentation, name, loadValues }}>
        {children}
      </PortfolioContext.Provider>
    );
  };

  const usePortfolioContext = () => {
    return useContext(PortfolioContext);
  };
  

  export { PortfolioContext, PortfolioProvider, usePortfolioContext }