import { Menu, Image } from "semantic-ui-react"
import Link from "next/link"

const AppHeader = ({ currentuser }) => {
    currentuser = currentuser || {
        photoURL: "https://i.pravatar.cc/64",
        email: "test@email.com",
    }

    function SignOutWithGoogle() {
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
                    <span title="Log off" className="avatar floated-right" onClick={SignOutWithGoogle}>
                        <Image src={currentuser.photoURL} width="35" height="35" className="cursored" avatar size="mini" verticalAlign="middle" spaced /> {currentuser.email}
                    </span>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}
export default AppHeader
