import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SensorCard(props){
  // Determine background color based on threshold
//   const getBackgroundColor = () => {
//     if (value >= props.threshold.high) return "#ff4c4c"; // Red (High Alert)
//     if (value >= props.threshold.medium) return "#ffa500"; // Orange (Warning)
//     return "#4caf50"; // Green (Normal)
//   };

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
    <View style={[styles.card, { backgroundColor: '#4caf50'}]}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.value}>{renderBool()}</Text>
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
