import { Statistic, Segment } from "semantic-ui-react"
import { useAuthQuery } from "@modules/hooks"
import { GETSTATUSES } from "@modules/queries"
import StatsPie from "@components/CommonComponents/StatsPie"
import statuses from "@constants/statuses"

export default function StatsCandidates() {
    const { data, loading, error } = useAuthQuery(GETSTATUSES)

    if (error) {
        console.error(error)
        return <p>[Error getting stat]</p>
    }

    if (!data) {
        return false
    }

    const statusStats = data.candidatesConnection.groupBy.status.map((status) => {
        return [status.key, status.connection.aggregate.count]
    })
    statusStats.unshift(["Status", "Number of candidates"])

    const slices = {}
    statuses.forEach((status, i) => {
        slices[i] = { color: status.color }
    })
    const options = {
        slices,
    }

    // const statusStats = data.candidatesConnection.groupBy.status.map((status) => {
    //     const color = statuses
    //         .filter((s) => {
    //             if (s.name === status.key) {
    //                 return true
    //             }
    //         })
    //         .map((c) => c.color)

    //     return { name: status.key, value: status.connection.aggregate.count, color: color[0] }
    // })

    const numCandidates = data.candidatesConnection.aggregate.count

    return (
        <Segment>
            <Statistic label="Candidates" value={numCandidates} />
            <StatsPie data={statusStats} options={options} />
        </Segment>
    )
}
