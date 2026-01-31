import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "red" }}>nigger</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#123456",
          paddingInline: 20,
          paddingBlock: 5,
          borderRadius: 5,
        }}
        onPress={() => router.push("/login")}
      >
        <Text style={{ color: "white" }}>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
}
