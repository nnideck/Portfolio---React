import { collection, addDoc, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { createContext, useCallback, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IExportsContext {
  saving: boolean;
  getListProjects: () => Promise<void>;
  saveProject: (data: IFormProjects) => Promise<void>;
  updateProject: (id: string, data: IFormProjects) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  projectsList: IFormProjects[];
}

export interface IFormProjects {
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
  updateProject: () => Promise.resolve(),
  deleteProject: () => Promise.resolve(),
  projectsList: [],
};

const AdminProjContext = createContext(initialValue);

const AdminProjProvider = ({ children }: any) => {
  const [saving, setSaving] = useState(false);
  const [projectsList, setProjectsList] = useState<IFormProjects[]>([]);
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

  const updateProject = useCallback(
    async (id: string, data: IFormProjects) => {
      if (db) {
        if (!saving) {
          setSaving(true);
          if (id) {
            await setDoc(doc(db, "projects", id), {
              title: data.title,
              description: data.description,
              github: data.github,
              demo: data.demo,
            });
            setSaving(false);
          }
        }
      }
    },
    [saving, setSaving, db]
  );

  const deleteProject = useCallback(
    async (id: string) => {
      if (db) {
          if (id) {
            await deleteDoc(doc(db, "projects", id))
          }
      }
    },
    [db]
  );

  return (
    <AdminProjContext.Provider
      value={{ saveProject, saving, getListProjects, projectsList, updateProject, deleteProject }}
    >
      {children}
    </AdminProjContext.Provider>
  );
};

const useAdminProjContext = () => {
  return useContext(AdminProjContext);
};

export { AdminProjContext, AdminProjProvider, useAdminProjContext };
