


import { useState, createContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen.js"
import SettingsScreen from "./screens/SettingsScreen.js";
import GraphsScreen from "./screens/GraphsScreen.js";

import ThresholdContext from "./Context/ThresholdContext.js";
import RecordedDataContext from "./Context/RecordedDataContext.js"

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App(){
  console.log("App");

  const [threshold, setThreshold] = useState({
    flowRateThreshold: 0,
    rainDropThreshold: 0,
    waterLevelThreshold: 0
  });

  const [recordedData, setRecordedData] = useState({
    flowRate: [],
    rainDrop: [],
    waterLevel: [],
    ax: [],
    ay: [],
    az: []
  });
  return (
    <RecordedDataContext.Provider value = {{recordedData, setRecordedData}}>
    <ThresholdContext.Provider value = {{threshold, setThreshold}}>
      <NavigationContainer>

        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name = "Home" component = {HomeScreen} />
          <Tab.Screen name = "Settings" component = {SettingsScreen} />
          <Tab.Screen name = "Graph" component = {GraphsScreen} />
        </Tab.Navigator>

      </NavigationContainer>
    </ ThresholdContext.Provider>
    </RecordedDataContext.Provider>
  )
}

