import { PieChart, Pie, Legend, Tooltip, Cell, LabelList } from "recharts"

const renderColorfulLegendText = (value, entry) => {
    return <span style={{ color: "black" }}>{value}</span>
}

export default function StatsPie({ data }) {
    return (
        <PieChart width={450} height={350}>
            <Pie data={data} dataKey="value" nameKey="name">
                <LabelList position="inside" dataKey="value" />
                {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                ))}
            </Pie>
            <Legend formatter={renderColorfulLegendText} />
            <Tooltip />
        </PieChart>
    )
}
