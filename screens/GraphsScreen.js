


import {useEffect, useState, useContext} from "react"
import {Text, View, StyleSheet, ScrollView, Dimensions} from "react-native"
import { LineChart } from "react-native-chart-kit"

import LineChartCard from "../components/LineChartCard"

import RecordedDataContext from "../Context/RecordedDataContext"

export default function GraphsScreen(){

    const {recordedData} = useContext(RecordedDataContext)
    return(
        <ScrollView>
            <LineChartCard title = "Flow Rate" data = {recordedData.flowRate} units = "L/min"/>
            <LineChartCard title = "Rain Drop" data = {recordedData.rainDrop} units = "mm"/>
            <LineChartCard title = "Water Level" data = {recordedData.waterLevel} units = "cm"/>
            <LineChartCard title = "Accelerometer" data = {recordedData.accelerometer} units = "m/s2"/>
        </ScrollView>
    )
}
