import NavBar from "@components/NavBar"
import { Container } from "semantic-ui-react"

export default function PositionLayout({ children }) {
    return (
        <div className="view-panel">
            <NavBar active="positions" />
            <Container fluid>{children}</Container>
        </div>
    )
}
