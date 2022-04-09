import { getSession } from "next-auth/react"
import RecentCandidates from "@components/LandingComponents/RecentCandidates"
import FlaggedCandidates from "@components/LandingComponents/FlaggedCandidates"
import RecentPositions from "@components/LandingComponents/RecentPositions"
import RecentSubmissions from "@components/LandingComponents/RecentSubmissions"
import AtRiskEmployees from "@components/LandingComponents/AtRiskEmployees"
import RecentComments from "@components/LandingComponents/RecentComments"
import Stats from "@components/LandingComponents/Stats"
import { Grid, Menu } from "semantic-ui-react"
import LandingLayout from "@layouts/LandingLayout"

export async function getServerSideProps({ req }) {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        }
    }

    return {
        props: session,
    }
}

export default function LandingPage(session) {
    const activeItem = false
    return (
        <>
            <Stats />
            <RecentComments />
            <FlaggedCandidates />
            <Grid stackable columns={2}>
                <Grid.Column>
                    <Grid stackable columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <RecentCandidates />
                            </Grid.Column>
                            <Grid.Column>
                                <RecentPositions />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <AtRiskEmployees />
                            </Grid.Column>
                            <Grid.Column></Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column>
                    <RecentSubmissions />
                </Grid.Column>
            </Grid>
        </>
    )
}

LandingPage.Layout = LandingLayout
