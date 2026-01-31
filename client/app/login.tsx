import { Svg, Path } from "react-native-svg";
import { colors } from "@/themes/colors";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return loading ? (
    <ActivityIndicator
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    />
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>login screen</Text>
      <Svg width={50} height={50} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.0294 16.9706 2.99994 12 2.99994C7.0294 2.99994 2.99994 7.0294 2.99994 12C2.99994 16.9706 7.0294 21 12 21Z"
          stroke="#000000"
          stroke-linecap="square"
          stroke-linejoin="round"
          stroke-width="1.99991"
        />
        <Path
          d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
          fill="#000000"
        />
        <Path d="M12 17V11" stroke="#000000" strokeWidth="2" />
      </Svg>
      <TextInput
        placeholder="Identifier"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
        style={{
          color: "black",
          borderColor: colors.borderColor,
          borderWidth: 1,
          paddingHorizontal: 50,
          paddingVertical: 2,
          borderRadius: 5,
          marginBottom: 10,
          fontSize: 12,
        }}
        placeholderTextColor={colors.placeholderText}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholderTextColor={colors.placeholderText}
        style={{
          color: "black",
          borderColor: colors.borderColor,
          borderWidth: 1,
          paddingInline: 50,
          borderRadius: 5,
          marginBottom: 10,
          paddingBlock: 2,
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: colors.brandColor,
          padding: 10,
          borderRadius: 5,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
        onPress={() => {
          setLoading(true);
          axios
            .post("http://192.168.1.22:3000/api/login", {
              identifier,
              password,
            })
            .then(async (res) => {
              alert(res.data.token);
              await SecureStore.setItemAsync("token", res.data.token);
              router.push("/home");
            })
            .catch((err) => {
              console.log(err);
              alert(err.response.data || "An error occurred");
            })
            .finally(() => setLoading(false));
        }}
      >
        <Text style={{ color: "white" }}>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
}
