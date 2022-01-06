import NavBar from "@components/NavBar"
import { Container } from "semantic-ui-react"

export default function LandingLayout({ children }) {
    return (
        <div className="view-panel">
            <NavBar active="dashboard" />
            <Container fluid>{children}</Container>
        </div>
    )
}
