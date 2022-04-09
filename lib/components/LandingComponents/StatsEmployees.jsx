import { useAuthQuery } from "@modules/hooks"
import { GETEMPLOYEESTATS } from "@modules/queries"
import StatsPie from "@components/CommonComponents/StatsPie"
import { Statistic, Segment } from "semantic-ui-react"
import randomColor from "randomcolor"
import { Chart } from "react-google-charts"

export default function StatsEmployees() {
    const { data, loading, error } = useAuthQuery(GETEMPLOYEESTATS)

    if (error) {
        console.error(error)
        return <p>[Error getting stat]</p>
    }

    if (!data) {
        return false
    }

    const numEmployees = data.employees.length
    const contractTotals = data.employees.reduce((prev, employee) => {
        const val = employee.contract.name
        if (val in prev) {
            prev[val]++
        } else {
            prev[val] = 1
        }
        return prev
    }, {})

    const numContracts = Object.keys(contractTotals).length

    const colors = randomColor({
        count: numContracts,
        luminosity: "light",
        hue: "random",
    })

    // const stats = Object.keys(contractTotals).map((key, i) => {
    //     return { name: key, value: contractTotals[key], color: colors[i] }
    // })

    const stats = Object.keys(contractTotals).map((key, i) => {
        return [key, contractTotals[key]]
    })

    stats.unshift(["Contract", "Number of Employees"])

    return (
        <Segment>
            <Statistic label="Employees" value={numEmployees} />
            <StatsPie data={stats} colors={colors} />
        </Segment>
    )
}
