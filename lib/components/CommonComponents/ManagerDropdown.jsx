import { Dropdown } from "semantic-ui-react"
import { useAuthQuery } from "@modules/hooks"
import { GETMANAGERS } from "@modules/queries"

export default function ManagerDropdown({ onChange, value, ...rest }) {
    const { data, error } = useAuthQuery(GETMANAGERS)

    if (error) {
        console.error(error)
        return "[Error loading managers]"
    }

    if (!data) {
        return false
    }

    const options = data.users.map((manager) => {
        return {
            key: manager.id,
            text: manager.username,
            value: manager.id,
        }
    })
    return <Dropdown {...rest} options={options} value={value} selection closeOnChange onChange={(ev, selection) => onChange(selection.value)} />
}
