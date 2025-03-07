import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomInputField from "@/components/CustomInputField";
import { createNewTaksRequest } from "@/hooks/api/userApi";
import { Toast } from "toastify-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

const CreateTask = () => {
  const navigation = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const color = useThemeColor({ light: "", dark: "" }, "icon");

  const onSubmit = async () => {
    console.log("New Task:", { title, description });

    try {
      setIsCreating(true);
      const respo = await createNewTaksRequest({
        title: title,
        description: description,
      });

      console.log(respo, "respo");
      Toast.success(respo?.message);
      setTitle("");
      setDescription("");
      navigation.back();
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={{ flex: 1 }}>
        <ThemedView style={{ flex: 1, padding: "5%" }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 30,
            }}
          >
            <TouchableOpacity onPress={() => navigation.back()}>
              <Ionicons name="arrow-back" size={24} color={color} />
            </TouchableOpacity>
            <ThemedText style={{ fontSize: 20, marginLeft: 10 }}>
              Create Task
            </ThemedText>
          </View>

          {/* Form */}
          <View style={{ marginBottom: 15 }}>
            {/* <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>
            Title
          </ThemedText> */}
            <CustomInputField
              title="Title"
              placeholder="Enter task title"
              value={title}
              onChangeText={setTitle}
            />

            <CustomInputField
              title="Description"
              placeholder="Enter task description"
              value={description}
              onChangeText={setDescription}
              isMultiLine={true}
              containerStyle={{
                height: 150,
                alignItems: "baseline",
              }}
            />
          </View>

          <TouchableOpacity
            onPress={onSubmit}
            style={{
              backgroundColor: "#FFA500",
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <ThemedText style={{ fontSize: 16 }}>
              {isCreating ? "Creating...." : "Create New Task"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default CreateTask;
