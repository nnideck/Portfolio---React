import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IExportsContext {
  greeting: string;
  presentation: string;
  name: string;
  jobsArray: string[];
  jobsString: string;
  saving: boolean;
  loadValues: () => Promise<void>;
  saveValues: (data: IFormValues) => Promise<void>;
}

interface IFormValues {
  greeting: string;
  presentation: string;
  name: string;
  jobsString: string;
}

const initialValue: IExportsContext = {
  greeting: "",
  presentation: "",
  name: "",
  jobsArray: [],
  jobsString: "",
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
  const [jobsArray, setJobsArray] = useState([]);
  const [jobsString, setJobsString] = useState("");
  const [saving, setSaving] = useState(false);

  const loadValues = useCallback( async () => {
    if (db) {
      const docRef = doc(db!, "portfolio", "home");
      const docSnap = await getDoc(docRef);
      setGreeting(docSnap.data()!.greeting);
      setPresentation(docSnap.data()!.presentation);
      setName(docSnap.data()!.name);
      const loadedJobs = (docSnap.data()!.jobs);
      const stringJobs = loadedJobs.join("\n");
      setJobsArray (loadedJobs);
      setJobsString(stringJobs);
    }}
  ,[db, setGreeting, setPresentation, setName, setJobsArray, setJobsString]); 
   
  const saveValues = useCallback(
    async(data: IFormValues) => { 
    if (!saving) {
      setSaving(true);
      await setDoc(doc(db!, "portfolio", "home"), {
        greeting: data.greeting,
        presentation: data.presentation,
        name: data.name,
        jobs: data.jobsString.split("\n"),
      });
      setSaving(false);
    }
  }, 
  [saving, setSaving, db]);
  

  return (
    <PortfolioContext.Provider
      value={{ greeting, presentation, name, saving, jobsArray, jobsString, loadValues, saveValues }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

const usePortfolioContext = () => {
  return useContext(PortfolioContext);
};

export { PortfolioContext, PortfolioProvider, usePortfolioContext };
