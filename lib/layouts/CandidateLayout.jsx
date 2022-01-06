import NavBar from "@components/NavBar"
import { Container } from "semantic-ui-react"

export default function CandidateLayout({ children }) {
    return (
        <div className="view-panel">
            <NavBar active="candidates" />
            <Container fluid className="candidate-table-row hovered">
                {children}
            </Container>
        </div>
    )
}
