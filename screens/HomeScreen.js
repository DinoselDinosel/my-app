


import { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import Dashboard from "../components/Dashboard.js"
import Header from "../components/Header.js";

export default function HomeScreen(){
  console.log("HomeScreen");
  
  return (
    <View style={styles.container}>
      <Header/>
      <Dashboard/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4", // Light Gray Background
  },
});
