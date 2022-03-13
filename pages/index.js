import { getSession } from "next-auth/react"
import LastCreated from "@components/LandingComponents/LastCreated"
// import FlaggedCandidates from "@components/LandingComponents/FlaggedCandidates"
// import RecentPositions from "@components/LandingComponents/RecentPositions"
import RecentSubmissions from "@components/LandingComponents/RecentSubmissions"
// import AtRiskEmployees from "@components/LandingComponents/AtRiskEmployees"
import RecentComments from "@components/LandingComponents/RecentComments"
// import Stats from "@components/LandingComponents/Stats"
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
            {/* <Menu vertical>
                <Menu.Item>
                    <Menu.Header>Products</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name="enterprise" active={activeItem === "enterprise"} />
                        <Menu.Item name="consumer" active={activeItem === "consumer"} />
                    </Menu.Menu>
                </Menu.Item>
            </Menu> */}
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
