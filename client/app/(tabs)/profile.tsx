import { UseUser } from "@/contexts/UserContext";
import { View } from "react-native";
import { Text } from "react-native";

export default function Profile() {
  const { parent } = UseUser();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{parent?.name}</Text>
      {parent?.children.map((c) => (
        <Text key={c.id}>{c.name}</Text>
      ))}
    </View>
  );
}
