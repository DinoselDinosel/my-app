


import React, { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, Alert  } from "react-native";

import SensorCard from "./SensorCard";

import ThresholdContext from "../Context/ThresholdContext.js";
import RecordedDataContext from "../Context/RecordedDataContext.js";

export default function Dashboard(){
    const [data, setData] = useState(null);

    const {threshold} = useContext(ThresholdContext);
    const {setRecordedData} = useContext(RecordedDataContext);


    useEffect(() => {
      const fetchData = async () => {
        try { // check settings screen
          const response = await fetch("https://firebase-backend-acf4.onrender.com/data"); // http://localhost:3000/data
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
    const flowRate = parts[1] !== undefined ? parseFloat(parts[1]) : "N/A";
    const rainDrop = parts[2] !== undefined ? parseFloat(parts[2]) : "N/A";
    const waterLevel = parts[3] !== undefined ? parseFloat(parts[3]) : "N/A";
    const accelerometer = parts[4] !== undefined ? parseFloat(parts[4]) : "N/A";

    useEffect(() => { //GRAPH
      if (moisture !== "N/A" && flowRate !== "N/A" 
      && rainDrop !== "N/A" && waterLevel !== "N/A"
      && accelerometer !== "N/A"){

        setRecordedData((prev) => ({ // Send this data to be graphed
            flowRate: [...prev.flowRate.slice(-9), flowRate],
            rainDrop: [...prev.rainDrop.slice(-9), rainDrop],
            waterLevel: [...prev.waterLevel.slice(-9), waterLevel],
            accelerometer: [...prev.accelerometer.slice(-9), accelerometer],
        }));
        
      }
    }, [flowRate, rainDrop, waterLevel, accelerometer])

    console.log("Dashbaord")
    return (
      <ScrollView contentContainerStyle = {styles.scrollContainer}>
        <SensorCard title = "Soil Moisture" value = {moisture} unit = "" threshold = "Wet"/>
        <SensorCard title = "Flow Rate" value = {flowRate} unit = "L/min" threshold = {threshold.flowRateThreshold}/>
        <SensorCard title = "Rain Gauge" value = {rainDrop} unit = "mm" threshold = {threshold.rainDropThreshold}/>
        <SensorCard title = "Water Level" value = {waterLevel} unit = "cm" threshold = {threshold.waterLevelThreshold} 
                                                                    ultrasonicDistance = {threshold.ultrasonicDistance}/>
        <SensorCard title = "Accelerometer" value = {accelerometer} unit = "m/s^2" threshold = {threshold.accelerometerThreshold}/>
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