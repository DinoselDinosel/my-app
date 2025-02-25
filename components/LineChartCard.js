


import {Text, Dimensions} from "react-native"
import { LineChart } from "react-native-chart-kit"

export default function LineChartCard(props){
    function renderChart(){
        if (props.title  === "Accelerometer"){
            return [{data: props.data.ax, color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`}, 
                    {data: props.data.ay, color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`}, 
                    {data: props.data.az, color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`}]

        }
        else{
            return [{ data: props.data }]
        }
    }
    function renderShadow(){
        if (props.title  === "Accelerometer"){
            return false
        }
        else{
            return true
        }
    }
    console.log(props.data)

    return(
        <>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>{props.title} </Text>
            <LineChart
                data={{
                    datasets: renderChart(), // Uses state data
                }}
                width={Dimensions.get("window").width} // Full screen width
                height={220}
                yAxisSuffix={props.units} // Adjust based on sensor type
                yAxisInterval={1}
                withDots={true} // Show dots on data points
                withInnerLines={false} // Remove unnecessary grid lines
                withShadow={renderShadow()} // Add a shadow effect
                chartConfig={{
                    backgroundGradientFrom: "#1e3c72",
                    backgroundGradientTo: "#2a5298",
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: { borderRadius: 16 },
                }}
                bezier // Smooth curve
                style={{
                    marginLeft: 20, // Add left margin
                    marginRight: 20, // Add right margin
                    marginBottom: 20,
                    borderRadius: 16, // Ensures the chart itself is rounded
                }}
            />
        </>
    )
}