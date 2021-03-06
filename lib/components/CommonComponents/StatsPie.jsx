import { Chart } from "react-google-charts"

export default function StatsPie({ data, options, colors = [] }) {
    const defaultoptions = {
        pieSliceText: "value",
        legend: {
            position: "top",
            maxLines: 2,
        },
        pieSliceTextStyle: { fontSize: "20", color: "#222222" },
        pieSliceBorderColor: "#eeeeee",
        // sliceVisibilityThreshold: 0.05,
        colors,
    }

    return <Chart chartType="PieChart" data={data} width="100%" height="400px" options={{ ...options, ...defaultoptions }} />
}
