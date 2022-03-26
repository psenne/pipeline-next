import { Grid } from "semantic-ui-react"
import StatsCandidates from "@components/LandingComponents/StatsCandidates"
import StatsEmployees from "@components/LandingComponents/StatsEmployees"
import StatsSubmissions from "@components/LandingComponents/StatsSubmissions"

export default function Stats() {
    return (
        <Grid stackable columns={3}>
            <Grid.Column textAlign="center">
                <StatsCandidates />
            </Grid.Column>
            <Grid.Column textAlign="center">
                <StatsEmployees />
            </Grid.Column>
            <Grid.Column textAlign="center">
                <StatsSubmissions />
            </Grid.Column>
        </Grid>
    )
}
