


import { View, Text, StyleSheet } from "react-native";
import Dashboard from "./components/Dashboard.js"
import Header from "./components/Header.js";


export default function App(){
  console.log("App");
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
