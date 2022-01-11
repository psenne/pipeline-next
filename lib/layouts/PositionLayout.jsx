import Head from "next/head"
import NavBar from "@components/NavBar"
import { Container } from "semantic-ui-react"

export default function PositionLayout({ children }) {
    return (
        <>
            <Head>
                <title>RenX Portal: Positions</title>
            </Head>
            <div className="view-panel">
                <NavBar active="positions" />
                <Container fluid>{children}</Container>
            </div>
        </>
    )
}
