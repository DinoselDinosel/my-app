


import {Text, Dimensions, View} from "react-native"
import { LineChart } from "react-native-chart-kit"

export default function LineChartCard(props){
    function renderChart(){
        return [{ data: props.data }]
    }
    function renderShadow(){
        return true;
    }
    console.log(props.data)

    return(
        <View style={{ flex: 1, overflow: 'hidden', backgroundColor: "#E3F2FD" }}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>{props.title} </Text>
                <LineChart
                    data={{
                        datasets: renderChart(), // Uses state data
                    }}
                    width={Dimensions.get("window").width - 10} // Full screen width
                    height={220}
                    yAxisSuffix={props.units} // Adjust based on sensor type
                    yAxisInterval={1}
                    withDots={true} // Show dots on data points
                    withInnerLines={false} // Remove unnecessary grid lines
                    withShadow={renderShadow()} // Add a shadow effect
                    chartConfig={{
                        backgroundColor: '#D3D3D3',  // Chart background color
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: { borderRadius: 11 },
                    }}
                    bezier // Smooth curve
                    style={{
                        marginLeft: 10, // Add left margin
                        marginBottom: 20,
                        borderRadius: 16, // Ensures the chart itself is rounded
                    }}
                />
        </View>
    )
}