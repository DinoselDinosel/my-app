


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
        backgroundColor: "#007bff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
      },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
      }
})