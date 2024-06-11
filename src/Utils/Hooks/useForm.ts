import { useState } from "react";

export function useForm(initValue: any) {
  const [initial, setInitial] = useState<any>(initValue);

  const setValues = (e: any) => {
    setInitial((old: any) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  const updateValues = (obj: any) => {
    const keys = Object.keys(obj);
    for (const key of keys) {
      setInitial((old: any) => ({
        ...old,
        [key]: obj[key],
      }));
    }
  };

  return [initial, setValues, updateValues];
}