import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomInputField from "@/components/CustomInputField";
import { createNewTaksRequest, updateTaksRequest } from "@/hooks/api/userApi";
import { Toast } from "toastify-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

const EditTaks = () => {
  const navigation = useRouter();
  const params = useLocalSearchParams();
  // console.log(params);
  const [title, setTitle] = useState(params?.title);
  const [description, setDescription] = useState(params?.description);
  const [isCreating, setIsCreating] = useState(false);
  const Iconcolor = useThemeColor({ light: "", dark: "" }, "icon");

  const onSubmit = async () => {
    console.log("New Task:", { title, description });
    try {
      setIsCreating(true);
      const respo = await updateTaksRequest({
        _id: params?._id,
        title: title,
        description: description,
      });

      //  console.log(respo, "respo");
      Toast.success(respo?.message);
      setTitle("");
      setDescription("");
      navigation.back();
    } catch (error) {
      console.log(error, "hffff");

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
              <Ionicons name="arrow-back" size={24} color={Iconcolor} />
            </TouchableOpacity>
            <ThemedText style={{ fontSize: 20, marginLeft: 10 }}>
              Edit Task
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
              {isCreating ? "Updating...." : "Update Task"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default EditTaks;
