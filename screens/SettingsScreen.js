


import {useContext} from "react"
import {View, Text, StyleSheet, TextInput, Button} from "react-native"

import ThresholdContext from "../Context/ThresholdContext"
import { useNotification } from "../Context/NotificationContext";

export default function SettingsScreen(){
  const { expoPushToken, notification, error} = useNotification();

  const {threshold, setThreshold} = useContext(ThresholdContext);

  function handleTextInput(thresholdName, value){
      setThreshold(prevThreshold => {
          return {...prevThreshold, [thresholdName]: parseFloat(value) || 0}
      })
  }

  async function sendToServer(expoPushToken, threshold){
    const sendThreshold = `${threshold.flowRateThreshold} ${threshold.waterLevelThreshold} ${threshold.accelerometerThreshold} ${threshold.ultrasonicDistance}`
    console.log(sendThreshold);
    const data = {
        pushToken: expoPushToken,
        threshold: sendThreshold
    };

    try { // check dashboard component
        const response = await fetch('https://firebase-backend-acf4.onrender.com/register', { // http://localhost:3000/register
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log('Server Response:', responseData);
    } catch (error) {
        console.error('Could not fetch...:', error);
    }
  };

  if (error && false){ // If register notification error
    return(
      <View>
      <Text>You are at the Error side...:{error.message}</Text>
      </View>
    )
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

      <Text>Water Level Threshold: (cm)</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#888"
        value={threshold.waterLevelThreshold?.toString()}
        onChangeText={(value) => handleTextInput("waterLevelThreshold", value)}
        keyboardType="decimal-pad"
      />

        {/* NEW CODE: ADDED ACCEL AND SENSOR HEIGHT */}

      <Text>Accelerometer Threshold: (g)</Text> 
      <TextInput
        style={styles.input}
        placeholderTextColor="#888"
        value={threshold.accelerometerThreshold?.toString()}
        onChangeText={(value) => handleTextInput("accelerometerThreshold", value)}
        keyboardType="decimal-pad"
      />

      <Text>Ultrasonic Sensor Height From Ground: (cm)</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#888"
        value={threshold.ultrasonicDistance?.toString()}
        onChangeText={(value) => handleTextInput("ultrasonicDistance", value)}
        keyboardType="decimal-pad"
      />

      <Text>{expoPushToken}</Text>
      <Button
        title = "Set threshold"
        onPress= {() => sendToServer(expoPushToken, threshold) } // change to "ExponentPushToken[eqMxAeL2Em-423c3Btfahx]"
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