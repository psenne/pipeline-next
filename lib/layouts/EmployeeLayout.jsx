import Head from "next/head"
import NavBar from "@components/NavBar"
import { Container } from "semantic-ui-react"

export default function EmployeeLayout({ children }) {
    return (
        <>
            <Head>
                <title>RenX Portal: Employees</title>
            </Head>
            <div className="view-panel">
                <NavBar active="employees" />
                <Container fluid>{children}</Container>
            </div>
        </>
    )
}
