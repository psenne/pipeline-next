import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Input, Icon, Menu } from "semantic-ui-react"
import StatusDropdown from "@components/CommonComponents/StatusDropdown"

export default function CandidateToolbar() {
    const router = useRouter()
    const url = router.pathname
    const queryobj = router.query
    const [searchterm, setsearchterm] = useState(queryobj.searchterm || "")
    const [status, setstatus] = useState(queryobj.status || "")

    const UpdateStatus = (value) => {
        setstatus(value)
        const statusquery = { status: value }

        router.push({
            pathname: url,
            query: { ...queryobj, ...statusquery },
        })
    }

    const UpdateSearchTerm = (value) => {
        setsearchterm(value)
        router.push({
            pathname: url,
            query: { ...queryobj, searchterm: value },
        })
    }

    const ClearFilters = () => {
        setstatus("")
        setsearchterm("")
        router.push("/candidates")
    }

    return (
        <Menu stackable className="no-print">
            <Link href="/candidates/add" passHref>
                <Menu.Item as="a" title="Add new candidate" link>
                    <Icon name="plus" color="blue" />
                </Menu.Item>
            </Link>
            <Menu.Item>
                <StatusDropdown placeholder="Filter by Status" value={status} onChange={(ev, data) => UpdateStatus(data.value)} />
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Input placeholder="Filter Candidates" icon={searchterm ? <Icon name="dont" color="red" link onClick={ClearFilters} /> : <Icon name="filter" />} value={searchterm} onChange={(ev, data) => UpdateSearchTerm(data.value)} />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}
