import { collection, addDoc } from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IExportsContext {
  saving: boolean;
  //loadValues: () => Promise<void>;
  saveProject: (data: IFormProjects) => Promise<void>;
}

interface IFormProjects {
  title: string;
  description: string;
  github: string;
  demo: string;
}

const initialValue: IExportsContext = {
  saving: false,
  //loadValues: () => Promise.resolve(),
  saveProject: () => Promise.resolve(),
};

const AdminProjContext = createContext(initialValue);

const AdminProjProvider = ({ children }: any) => {
  const [saving, setSaving] = useState(false);
  //const [title, setTitle] = useState("");
  //const [description, setDescription] = useState("");
  //const [github, setgithub] = useState("");
  //const [demo, setDemo] = useState("");
  const { db } = useFirebaseContext();

  /*   const loadValues = useCallback(async () => {
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
  }, [db]); */

  const saveProject = useCallback(
    async (data: IFormProjects) => {
      if (db) {
        if (!saving) {
          setSaving(true);
          await addDoc(collection(db, "projects"), {
            title: data.title,
            description: data.description,
            github: data.github,
            demo: data.demo,
          });
          setSaving(false);
        }
      }
    },
    [saving, setSaving, db]
  );

  return (
    <AdminProjContext.Provider
      value={{ saveProject, saving }}
    >
      {children}
    </AdminProjContext.Provider>
  );
};

const useAdminProjContext = () => {
  return useContext(AdminProjContext);
};

export { AdminProjContext, AdminProjProvider, useAdminProjContext };
