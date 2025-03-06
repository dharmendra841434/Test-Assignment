import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "expo-router";
import Storage from "@/utils/AsyncStorage";

const Dashboard = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Storage.clearAll();
    navigation.navigate("index");
  };
  return (
    <View>
      <Text>Dashboard</Text>
      <TouchableOpacity onPress={handleLogout}>
        <ThemedText>Logout</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
