import { Dropdown } from "semantic-ui-react"
import { sentence } from "to-case"
import statuses from "@constants/statuses"

export default function StatusDropdown({ text, ...props }) {
    const filteredStatuses = statuses.map((status) => {
        const name = status.name
        const label = { color: status.color, empty: true, circular: true }
        return {
            key: name,
            text: sentence(name),
            value: name,
            label,
        }
    })

    return <Dropdown {...props} clearable options={filteredStatuses}></Dropdown>
}
