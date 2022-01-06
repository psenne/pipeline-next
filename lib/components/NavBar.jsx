import Link from "next/link"
import { Menu } from "semantic-ui-react"

export default function NavBar({ active }) {
    return (
        <Menu tabular stackable className="no-print">
            <Menu.Item active={active === "dashboard"}>
                <Link href="/">
                    <a>Dashboard</a>
                </Link>
            </Menu.Item>
            <Menu.Item active={active === "candidates"}>
                <Link href="/candidates">
                    <a>Candidates</a>
                </Link>
            </Menu.Item>
            <Menu.Item active={active === "employees"}>
                <Link href="/employees">
                    <a>Employees</a>
                </Link>
            </Menu.Item>
            <Menu.Item active={active === "positions"}>
                <Link href="/positions">
                    <a>Positions</a>
                </Link>
            </Menu.Item>
            <Menu.Item active={active === "admin"}>
                <Link href="/admin">
                    <a>Admin</a>
                </Link>
            </Menu.Item>
        </Menu>
    )
}
