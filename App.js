import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Entypo name="pencil" size={24} color="#eee" />
      <AntDesign name="smile-circle" size={24} color="#f7c" />
      <AntDesign name="circledown" size={24} color="#38c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
