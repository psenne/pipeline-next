import { Button, Container, Loader, Dimmer } from "semantic-ui-react"
import Image from "next/image"

export default function Logout() {
    return (
        <Container className="App" fluid>
            <div className="login-screen">
                <Image src="/images/RenegadeLogo_transparent.png" width="500px" height="100px" />
                <a href="/api/auth/logout">Sign out</a>
            </div>
        </Container>
    )
}
