import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import Storage from "@/utils/AsyncStorage";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "react-native";
import { RefreshControl } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getCurrentDate } from "@/utils/helper";
import { Toast } from "toastify-react-native";
import { deleteTaksRequest, getAllTasks } from "@/hooks/api/userApi";

const Dashboard = () => {
  const navigation = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = () => {
    Storage.clearAll();
    navigation.navigate("/");
  };

  const fetAll = async () => {
    try {
      setRefreshing(true);
      const response = await getAllTasks();
      // console.log(response, "ress");
      setTasks(response?.tasks);
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      setIsDeleting(true);
      const response = await deleteTaksRequest({ _id: id });
      Toast.success(response?.message);
      fetAll();
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetAll();
  }, []);

  const TaskItem = ({ task }) => (
    <ThemedView style={styles.taskContainer}>
      <View>
        <ThemedText style={{ fontWeight: "bold", fontSize: 16, color: "#888" }}>
          {task.title}
        </ThemedText>
        <ThemedText numberOfLines={4} style={{ color: "#888", fontSize: 13 }}>
          {task.description}
        </ThemedText>
      </View>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          alignItems: "center",
          columnGap: 10,
          top: 5,
          right: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.push({
              pathname: "/edit-task",
              params: {
                _id: task?._id,
                title: task?.title,
                description: task?.description,
              },
            });
          }}
        >
          <MaterialIcons name="edit-note" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(task?._id)}>
          <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={{ flex: 1, paddingTop: "10%" }}>
      <ThemedView style={{ padding: 20, flex: 1 }}>
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                marginRight: 10,
              }}
            />
            <ThemedText style={{ fontSize: 18 }}>
              Hello, <Text style={{ fontSize: 20 }}>Mark</Text>
            </ThemedText>
          </ThemedView>
          <AntDesign
            onPress={() => handleLogout()}
            name="logout"
            size={24}
            color="gray"
          />
        </ThemedView>
        <ThemedText style={{ fontSize: 14, marginVertical: 10 }}>
          {getCurrentDate()}
        </ThemedText>
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "5%",
          }}
        >
          <ThemedText style={{ fontSize: 18 }}>
            Manage your task here
          </ThemedText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("/create-task");
            }}
          >
            <Entypo name="add-to-list" color="gray" size={30} />
          </TouchableOpacity>
        </ThemedView>
        {tasks?.length > 0 ? (
          <FlatList
            data={tasks}
            renderItem={({ item }) => <TaskItem task={item} />}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetAll} />
            }
          />
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "60%",
            }}
          >
            <ThemedText>You have no any Task Yet</ThemedText>
          </View>
        )}
      </ThemedView>
      {isDeleting && (
        <ThemedView style={styles.modal}>
          <ThemedView style={styles.loader}>
            <ActivityIndicator
              size={Platform.OS === "ios" ? 40 : 60}
              style={{ marginBottom: "10%" }}
            />
            <ThemedText>Deleting....</ThemedText>
          </ThemedView>
        </ThemedView>
      )}
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "#E6FAE6",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modal: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    borderRadius: 10,
    height: "25%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Dashboard;
