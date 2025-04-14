


import { useContext } from "react";
import { View, StyleSheet } from "react-native";
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
    backgroundColor: "#E3F2FD", // Light Gray Background
  },
});
