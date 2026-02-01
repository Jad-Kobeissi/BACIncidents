import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { TParent } from "../types";
import { router } from "expo-router";

export interface TUserContext {
  parent: TParent | null;
  setParent: (parent: TParent | null) => void;
  logout: () => void;
}
export const UserContext = createContext<TUserContext | null>(null);
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [parent, setParentState] = useState<TParent | null>(null);
  const setParent = (parent: TParent | null) => {
    setParentState(parent);
  };

  const logout = async () => {
    setParentState(null);
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("parent");
    router.replace("/login");
  };

  useEffect(() => {
    const loadParent = async () => {
      const parentString = await SecureStore.getItemAsync("parent");
      if (parentString && parentString !== "") {
        const parentObj: TParent = JSON.parse(parentString);
        setParentState(parentObj);
        await SecureStore.setItemAsync("parent", parentString);
        console.log("parent: " + parentString);
      }
    };
    loadParent();
  }, []);
  return (
    <UserContext.Provider value={{ parent, setParent, logout }}>
      {children}
    </UserContext.Provider>
  );
}
