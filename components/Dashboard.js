


import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet  } from "react-native";

import SensorCard from "./SensorCard";

export default function Dashboard(){
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://firebase-backend-acf4.onrender.com/data"); 
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData(); // Fetch once immediately
  
      const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const parts = data ? data.split(" ") : [];

    const moisture = parts[0] || "N/A";
    const flowRate = parts[1] || "N/A";
    const rainDrop = parts[2] || "N/A";
    const waterLevel = parts[3] || "N/A";
    const ax = parts[4] || "N/A";
    const ay = parts[5] || "N/A";
    const az = parts[6] || "N/A";

    const accelerometer = {x: ax, y: ay, z: az}
    console.log("Dashbaord")

    return (
      <ScrollView contentContainerStyle = {styles.scrollContainer}>
        <SensorCard title = "Soil Moisture" value = {moisture} threshold = "normal"/>
        <SensorCard title = "Flow Rate" value = {flowRate} threshold = "normal"/>
        <SensorCard title = "Rain Gauge" value = {rainDrop} threshold = "normal"/>
        <SensorCard title = "Ultrasonic Sensor" value = {waterLevel} threshold = "normal"/>
        <SensorCard title = "Accelerometer" value = {accelerometer} threshold = "normal"/>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    width: "100%", 
    alignItems: "center", 
    paddingVertical: 20,
  }
});