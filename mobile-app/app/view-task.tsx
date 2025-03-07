import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams, useRouter } from "expo-router";

const ViewTask = () => {
  const params = useLocalSearchParams();
  const color = useThemeColor({ light: "", dark: "" }, "icon");
  const navigation = useRouter();
  return (
    <ThemedView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "15%",
          paddingHorizontal: "4%",
        }}
      >
        <TouchableOpacity onPress={() => navigation.back()}>
          <Ionicons name="arrow-back" size={24} color={color} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: "5%" }}>
        <ThemedText
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "black",
            marginVertical: "5%",
          }}
        >
          {params?.title}
        </ThemedText>
        <ThemedText style={{ color: "#888", fontSize: 13 }}>
          {params?.description}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default ViewTask;
