import * as SecureStore from "expo-secure-store";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) router.replace("/home");

      setLoading(false);
    };
    fetchToken();
  }, []);
  return <Stack screenOptions={{ headerShown: false }} />;
}
