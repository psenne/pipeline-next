import Head from "next/head"
import NavBar from "@components/NavBar"
import { Container } from "semantic-ui-react"

export default function CandidateLayout({ children }) {
    return (
        <>
            <Head>
                <title>RenX Portal: Candidates</title>
            </Head>
            <div className="view-panel">
                <NavBar active="candidates" />
                <Container fluid>{children}</Container>
            </div>
        </>
    )
}
