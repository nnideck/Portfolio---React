import { doc, getDoc } from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IExportsContext {
  saving: boolean;
  title: string;
  description: string;
  github: string;
  demo: string;
  loadValues: () => Promise<void>;
}

/* interface IFormValues {
  title: string;
  description: string;
  github: string;
  demo: string;
}  */

const initialValue: IExportsContext = {
  saving: false,
  title: "",
  description: "",
  github: "",
  demo: "",
  loadValues: () => Promise.resolve(),
};

const AdminProjContext = createContext(initialValue);

const AdminProjProvider = ({ children }: any) => {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setgitHub] = useState("");
  const [demo, setDemo] = useState("");
  const { db } = useFirebaseContext();

  const loadValues = useCallback(async () => {
    if (db) {
      const docRef = doc(db!, "portfolio", "projects");
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      setTitle(docSnap.data()!.title);
      setDescription(docSnap.data()!.description);
      setgitHub(docSnap.data()!.github);
      setDemo(docSnap.data()!.demo);
      setSaving(false);
    }
  }, [db]);

  return (
    <AdminProjContext.Provider
      value={{ loadValues, title, description, github, demo, saving }}>
      {children}
    </AdminProjContext.Provider>
  );
};

const useAdminProjContext = () => {
  return useContext(AdminProjContext);
};

export { AdminProjContext, AdminProjProvider, useAdminProjContext };
