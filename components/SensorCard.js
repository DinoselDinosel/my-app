import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SensorCard(props){
  let value = props.value;
  console.log(props.title)
  console.log(value)
  if (value != "N/A"){
    if (props.ultrasonicDistance ?? false){ // if ultrasonicDistance exist, change value
      value = props.ultrasonicDistance - value;
    }
  }


  // Determine background color based on threshold
  function getBackgroundColor(value, threshold) {
    if (isNaN(parseFloat(value)) && value != "N/A"){ // If this is soil Moisture component
      console.log(value)
      console.log(isNaN(parseFloat(value)))
      if (value.toLowerCase() === "wet"){ 
        return "#D30000"; // Red (High Alert)
      }
      else { // if dry
        return "#228B22"; // Green (Normal)
      }
    }

    else{ // The rest of the components
      if (value >= threshold){
          return "#D30000"; // Red (High Alert)
      }
      else{
        return "#228B22"; // Green (Normal)
      }
    } 
  };
// getBackgroundColor()
  return (
    <View style={[styles.card, { backgroundColor: getBackgroundColor(value, props.threshold)}]}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.value}>{`${value}${props.unit}`}</Text>
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
        fontFamily: "Courier New"

    },
    value: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 5,
        fontFamily: 'Courier New'
    },
});
