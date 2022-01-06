import LastCreated from "@components/LandingComponents/LastCreated"
// import FlaggedCandidates from "@components/LandingComponents/FlaggedCandidates"
// import RecentPositions from "@components/LandingComponents/RecentPositions"
import RecentSubmissions from "@components/LandingComponents/RecentSubmissions"
// import AtRiskEmployees from "@components/LandingComponents/AtRiskEmployees"
import RecentComments from "@components/LandingComponents/RecentComments"
// import Stats from "@components/LandingComponents/Stats"
import { Grid } from "semantic-ui-react"
import LandingLayout from "@layouts/LandingLayout"

export default function LandingPage() {
    return (
        <>
            {/* <Stats /> */}
            <RecentComments />
            {/* <FlaggedCandidates /> */}
            <Grid stackable columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <LastCreated />
                    </Grid.Column>
                    <Grid.Column>
                        <RecentSubmissions />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>{/* <RecentPositions /> */}</Grid.Column>
                    <Grid.Column>{/* <AtRiskEmployees /> */}</Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

LandingPage.Layout = LandingLayout
