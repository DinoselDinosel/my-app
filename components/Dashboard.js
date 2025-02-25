


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
        try {
          const response = await fetch("https://firebase-backend-acf4.onrender.com/data"); 
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData(); // Fetch once immediately
  
      const interval = setInterval(fetchData, 2500); // Fetch every 2.5 seconds
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);


    const parts = data ? data.split(" ") : [];
    const moisture = parts[0] || "N/A";
    const flowRate = parts[1] !== undefined ? parseFloat(parts[1]) : "N/A";
    const rainDrop = parts[2] !== undefined ? parseFloat(parts[2]) : "N/A";
    const waterLevel = parts[3] !== undefined ? parseFloat(parts[3]) : "N/A";
    const ax = parts[4] !== undefined ? parseFloat(parts[4]) : "N/A";
    const ay = parts[5] !== undefined ? parseFloat(parts[5]) : "N/A";
    const az = parts[6] !== undefined ? parseFloat(parts[6]) : "N/A";

    const accelerometer = {x: ax, y: ay, z: az}
    
    useEffect(() => {
      if (moisture !== "N/A" && flowRate !== "N/A" 
      && rainDrop !== "N/A" && waterLevel !== "N/A"
      && ax !== "N/A" && ay !== "N/A" && az !== "N/A"){

        setRecordedData((prev) => ({ // Send this data to be graphed
            flowRate: [...prev.flowRate.slice(-9), flowRate],
            rainDrop: [...prev.rainDrop.slice(-9), rainDrop],
            waterLevel: [...prev.waterLevel.slice(-9), waterLevel],
            ax: [...prev.ax.slice(-9), ax],
            ay: [...prev.ay.slice(-9), ay],
            az: [...prev.az.slice(-9), az]
        }));
        
      }
    }, [flowRate, rainDrop, waterLevel, ax, ay, az])

    useEffect( () => {
      if (moisture.toLowerCase() === "wet" && flowRate >= threshold.flowRateThreshold 
      && rainDrop >= threshold.rainDropThreshold && waterLevel >= threshold.waterLevelThreshold){
        Alert.alert('Threshold Breached', "Shit bout to hit the fan. Goodluck...you'll need it.", [
          { text: 'WTF', onPress: () => console.log('Alert closed') },
        ]);
      }
    }, [data])

    console.log("Dashbaord")
    return (
      <ScrollView contentContainerStyle = {styles.scrollContainer}>
        <SensorCard title = "Soil Moisture" value = {moisture} threshold = "Wet"/>
        <SensorCard title = "Flow Rate" value = {flowRate} unit = " L/min" threshold = {threshold.flowRateThreshold}/>
        <SensorCard title = "Rain Gauge" value = {rainDrop} unit = " mm" threshold = {threshold.rainDropThreshold}/>
        <SensorCard title = "Ultrasonic Sensor" value = {waterLevel} unit = " cm" threshold = {threshold.waterLevelThreshold}/>
        <SensorCard title = "Accelerometer" value = {accelerometer} unit = " m/s2" threshold = "normal"/>
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