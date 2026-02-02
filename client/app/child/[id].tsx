import * as SecureStore from "expo-secure-store";
import { TChild, TIncident } from "@/types";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Incident from "@/components/Incident";
import { colors } from "@/themes/colors";

export default function ChildIncidents() {
  const { id } = useLocalSearchParams();
  const [child, setChild] = useState<TChild | null>(null);
  const [incidents, setIncidents] = useState<TIncident[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const fetchChild = async () => {
    axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/api/child/${id}`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setChild(res.data);
        setPage((prev) => prev + 1);
      })
      .catch((err) => {
        alert("There was an error: " + err.response.data);
        console.log(err.response.data);
        setError(err.response.data || "An unexpected error occurred.");
      });
  };
  const fetchIncidents = async () => {
    axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/api/incidents/child/${id}`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      })
      .then((res) => {
        setIncidents((prev) => {
          const unfiltered = [...prev, ...res.data];

          const filtered = new Map(
            unfiltered.map((item) => [item.id, item]),
          ).values();

          return Array.from(filtered);
        });
        setPage((prev) => prev + 1);
      })
      .catch((err) => {
        setError(err.response.data || "An unexpected error occurred.");
      });
  };
  useEffect(() => {
    fetchChild();
    fetchIncidents();
  }, []);
  return (
    <View style={{ alignItems: "center", marginVertical: 200, gap: 30 }}>
      <Text
        style={{ textTransform: "capitalize", fontWeight: "500", fontSize: 26 }}
      >
        Viewing {child?.name.split(" ")[0].toLocaleLowerCase()}'s incidents
      </Text>
      {error && (
        <Text style={{ color: colors.dangerColor, fontSize: 18 }}>{error}</Text>
      )}
      {incidents.map((incident) => (
        <Incident key={incident.id} incident={incident} />
      ))}
    </View>
  );
}
