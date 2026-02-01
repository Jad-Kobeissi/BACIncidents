import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { TParent } from "../types";
import { router } from "expo-router";

interface UserContextType {
  parent: TParent | null;
  setParent: (parent: TParent | null) => void;
}
export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [parent, setParentState] = useState<TParent | null>(null);
  const setParent = (parent: TParent | null) => {
    setParentState(parent);
    SecureStore.setItemAsync("parent", JSON.stringify(parent));
  };

  useEffect(() => {
    const loadParent = async () => {
      const parentString = await SecureStore.getItemAsync("parent");
      if (parentString && parentString !== "") {
        const parentObj: TParent = JSON.parse(parentString);
        setParentState(parentObj);
        console.log(parentObj);
      }
    };
    loadParent();
  }, []);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        router.replace("/(tabs)");
      } else {
        router.replace("/");
      }
    };
    fetchToken();
  }, []);
  return (
    <UserContext.Provider value={{ parent, setParent }}>
      {children}
    </UserContext.Provider>
  );
}

export function UseUser() {
  const context = useContext(UserContext);

  if (!context) throw new Error("Error loading contexts");

  return context;
}
