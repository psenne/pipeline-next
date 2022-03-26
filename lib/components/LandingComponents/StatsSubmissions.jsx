import { useAuthQuery } from "@modules/hooks"
import { GETSUBMISSIONSTATS } from "@modules/queries"
import StatsPie from "@components/CommonComponents/StatsPie"
import { Statistic } from "semantic-ui-react"
import randomColor from "randomcolor"

export default function StatsSubmissions() {
    const { data, loading, error } = useAuthQuery(GETSUBMISSIONSTATS)

    if (error) {
        console.error(error)
        return <p>[Error getting stat]</p>
    }

    if (!data) {
        return false
    }

    const numSubmissions = data.submissions.length

    const contractTotals = data.submissions.reduce((prev, submission) => {
        const val = submission.position.contract.name
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
        luminosity: "dark",
        hue: "random",
    })

    const stats = Object.keys(contractTotals).map((key, i) => {
        return { name: key, value: contractTotals[key], color: colors[i] }
    })

    return (
        <>
            <Statistic label="Submissions" value={numSubmissions} />
            <StatsPie data={stats} />
        </>
    )
}
