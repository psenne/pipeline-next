import { useSession, signOut } from "next-auth/react"
import { Menu, Image } from "semantic-ui-react"
import Link from "next/link"

const AppHeader = () => {
    const { data: session, status } = useSession()

    if (status !== "authenticated") {
        return false
    }

    return (
        <Menu borderless stackable inverted className="no-print">
            <Menu.Item header>
                <Link href="/">
                    <a>
                        <Image src="/images/RenegadeLogo_white_transparent.png" width="200" height="40" className="header-logo" />
                    </a>
                </Link>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <span
                        title="Log off"
                        className="avatar floated-right"
                        onClick={() => {
                            signOut()
                        }}
                    >
                        <Image src={session.useravatar} width="35" height="35" className="cursored" avatar size="mini" verticalAlign="middle" spaced /> {session.username}
                    </span>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}
export default AppHeader
