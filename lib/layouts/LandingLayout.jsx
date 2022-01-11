import Head from "next/head"
import NavBar from "@components/NavBar"
import { Container } from "semantic-ui-react"

export default function LandingLayout({ children }) {
    return (
        <>
            <Head>
                <title>RenX Portal</title>
            </Head>
            <div className="view-panel">
                <NavBar active="dashboard" />
                <Container fluid>{children}</Container>
            </div>
        </>
    )
}
