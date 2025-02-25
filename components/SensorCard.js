import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SensorCard(props){
  // Determine background color based on threshold
  function getBackgroundColor(value, threshold) {
    if (typeof value === "object") { // lets not deal with accelerometer
      return "#4caf50"; // Green (Normal)
    }
    if (isNaN(parseFloat(value))){ // If this is soil Moisture component
      if (value.toLowerCase() === "wet"){ 
        return "#ff4c4c"; // Red (High Alert)
      }
      else { // if dry
        return "#4caf50"; // Green (Normal)
      }
    }
    
    else{ // The rest of the components
      if (value >= threshold){
          return "#ff4c4c"; // Red (High Alert)
      }
      else{
        return "#4caf50"; // Green (Normal)
      }
    } 
  };
  function renderBool(){
      if (typeof props.value === "object") {
          return `X: ${props.value.x}, Y: ${props.value.y}, Z: ${props.value.z}`;
        }
      else{
          return props.value
      }
  }
// getBackgroundColor()
  return (
    <View style={[styles.card, { backgroundColor: getBackgroundColor(props.value, props.threshold)}]}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.value}>{renderBool()}{props.unit}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
    card: {
        width: "90%", 
        backgroundColor: "#fff", 
        padding: 15, 
        marginVertical: 10, 
        borderRadius: 10, 
        elevation: 3, 
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",

    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    value: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 5,
    },
});
