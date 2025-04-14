


import { View, Text, StyleSheet } from "react-native";

export default function Header(){
    console.log("Header")
    return(
        <View style = {styles.header}>
            <Text style = {styles.headerText}>A.B.I.S.O</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        backgroundColor: "#003366",
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
      },
    headerText: {
        fontFamily: 'Roberto', 
        fontSize: 40, // Large size for impact
        fontWeight: '900', // Extra bold
        color: '#fff', // White text for contrast
        textTransform: 'uppercase', // Makes it all caps
        letterSpacing: 2, // Adds spacing for a cool look
        textAlign: 'center', // Centers text
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Dark shadow
        textShadowOffset: { width: 4, height: 4 }, // Offset to create depth
        textShadowRadius: 6, // Blurred edges for glow effect
      }
})