import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Input, Icon, Menu } from "semantic-ui-react"
import ContractDropdown from "@components/CommonComponents/ContractDropdown"
import classnames from "classnames"

export default function PositionToolbar() {
    const router = useRouter()
    const url = router.pathname
    const queryobj = router.query
    const [searchterm, setsearchterm] = useState(queryobj.searchterm || "")
    const [contract, setcontract] = useState(queryobj.contract || "")

    const SetSelectedContract = (value) => {
        setcontract(value)
        const contractquery = { contract: value }

        router.push({
            pathname: url,
            query: { ...queryobj, ...contractquery },
        })
    }

    const SetSearchTerm = (value) => {
        setsearchterm(value)
        router.push({
            pathname: url,
            query: { ...queryobj, searchterm: value },
        })
    }

    const ClearFilters = () => {
        setcontract("")
        setsearchterm("")
        router.push("/positions")
    }

    return (
        <Menu stackable className="no-print">
            <Link href="/positions/add" passHref>
                <Menu.Item as="a" title="Add new position" link>
                    <Icon name="plus" color="blue" />
                </Menu.Item>
            </Link>
            <Menu.Item>
                <ContractDropdown text="Filter by Contract" clearable value={contract} filtered onChange={SetSelectedContract} />
            </Menu.Item>
            <Menu.Item className={classnames({ "form-hidden": !contract })}>
                <label>{`Filtering for ${contract}`}</label>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Input placeholder="Filter Positions" icon={searchterm ? <Icon name="dont" color="red" link onClick={ClearFilters} /> : <Icon name="filter" />} value={searchterm} onChange={(ev, data) => SetSearchTerm(data.value)} />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}
