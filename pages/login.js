import { serverurl } from "@modules/requests"
import Image from "next/image"
import Link from "next/link"
import { Button, Container, Loader, Dimmer } from "semantic-ui-react"

export default function Home() {
    return (
        <Container className="App" fluid>
            <div className="login-screen">
                <Image src="/images/RenegadeLogo_transparent.png" width="500px" height="100px" />
                <Link href={serverurl("/connect/auth0")}>
                    <Button className="login-button" color="blue" content="Sign in" icon="windows" size="large" labelPosition="left"></Button>
                </Link>
            </div>
        </Container>
    )
}
