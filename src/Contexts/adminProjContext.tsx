import { collection, addDoc, getDocs } from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IExportsContext {
  saving: boolean;
  getListProjects: () => Promise<void>;
  saveProject: (data: IFormProjects) => Promise<void>;
  projectsList: IFormProjects[];
}

interface IFormProjects {
  id?: string;
  title: string;
  description: string;
  github: string;
  demo: string;
}

const initialValue: IExportsContext = {
  saving: false,
  getListProjects: () => Promise.resolve(),
  saveProject: () => Promise.resolve(),
  projectsList: [],
};

const AdminProjContext = createContext(initialValue);

const AdminProjProvider = ({ children }: any) => {
  const [saving, setSaving] = useState(false);
  const [projectsList, setProjectsList] = useState<IFormProjects[]>([]);
  /*   const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState(""); */
  const { db } = useFirebaseContext();

  const getListProjects = useCallback(async () => {
    if (db) {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const listprojects: IFormProjects[] = [];
      querySnapshot.forEach((doc) => {
        listprojects.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          github: doc.data().github,
          demo: doc.data().demo,
        });
        setProjectsList(listprojects);
      });
    }
  }, [db]);

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
      value={{ saveProject, saving, getListProjects, projectsList }}
    >
      {children}
    </AdminProjContext.Provider>
  );
};

const useAdminProjContext = () => {
  return useContext(AdminProjContext);
};

export { AdminProjContext, AdminProjProvider, useAdminProjContext };
