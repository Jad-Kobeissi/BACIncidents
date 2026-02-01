import * as SecureStore from "expo-secure-store";
import { UseUser } from "@/contexts/UserContext";

import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Page() {
  const { parent } = UseUser();
  return (
    <View>
      <Text>Welcome Mr. / Mrs. {parent?.name}</Text>
      <TouchableOpacity
        onPress={async () => {
          await SecureStore.deleteItemAsync("parent");
          await SecureStore.deleteItemAsync("token").then(() => {
            router.replace("/login");
          });
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
