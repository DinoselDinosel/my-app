


import { useState, createContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen.js"
import SettingsScreen from "./screens/SettingsScreen.js";
import GraphsScreen from "./screens/GraphsScreen.js";

import ThresholdContext from "./Context/ThresholdContext.js";
import RecordedDataContext from "./Context/RecordedDataContext.js"
import { NotificationProvider } from "./Context/NotificationContext.js";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});



const Tab = createBottomTabNavigator();

export default function App(){
  console.log("main app ");

  const [threshold, setThreshold] = useState({
    flowRateThreshold: 100,
    rainDropThreshold: 100,
    waterLevelThreshold: 100,
    accelerometerThreshold: 100,
    ultrasonicDistance: 100,
  });

  const [recordedData, setRecordedData] = useState({
    flowRate: [],
    rainDrop: [],
    waterLevel: [],
    accelerometer: []
  });

  return (
    <NotificationProvider>
      <RecordedDataContext.Provider value = {{recordedData, setRecordedData}}>
        <ThresholdContext.Provider value = {{threshold, setThreshold}}>
          <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                } else if (route.name === 'Graph') {
                  iconName = focused ? 'stats-chart' : 'stats-chart-outline'; // Icon for Graph
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              headerShown: false, // Disable the header
            })}
          >
              <Tab.Screen name = "Home" component = {HomeScreen} />
              <Tab.Screen name = "Settings" component = {SettingsScreen} />
              <Tab.Screen name = "Graph" component = {GraphsScreen} />
            </Tab.Navigator>

          </NavigationContainer>
        </ ThresholdContext.Provider>
      </RecordedDataContext.Provider>
    </NotificationProvider>
  )
}

