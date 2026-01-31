import { Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Home Screen</Text>
      <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: "lightblue" }}
        onPress={async () => {
          await SecureStore.deleteItemAsync("token");
          router.replace("/");
        }}
      >
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}
