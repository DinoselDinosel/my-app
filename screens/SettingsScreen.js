


import {useContext} from "react"
import {View, Text, StyleSheet, TextInput} from "react-native"

import ThresholdContext from "../Context/ThresholdContext"

export default function SettingsScreen(){

    const {threshold, setThreshold} = useContext(ThresholdContext);

    function handleTextInput(thresholdName, value){
        setThreshold(prevThreshold => {
            return {...prevThreshold, [thresholdName]: parseFloat(value) || 0}
        })
    }

    return(
        <View style={styles.container}>
        <Text style={styles.header}>Set Thresholds</Text>
        
        <Text>Flow Rate Threshold: (L/min)</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          value={threshold.flowRateThreshold?.toString()}
          onChangeText={(value) => handleTextInput("flowRateThreshold", value)}
          keyboardType="decimal-pad"
        />

        <Text>Rain Gauge Threshold: (mm)</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          value={threshold.rainDropThreshold?.toString()}
          onChangeText={(value) => handleTextInput("rainDropThreshold", value)}
          keyboardType="decimal-pad"
        />
        <Text>Water Level Threshold: (cm)</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          value={threshold.waterLevelThreshold?.toString()}
          onChangeText={(value) => handleTextInput("waterLevelThreshold", value)}
          keyboardType="decimal-pad"
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f5f5f5",
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: "#333",
    },
    input: {
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: "#ccc",
    },
  });