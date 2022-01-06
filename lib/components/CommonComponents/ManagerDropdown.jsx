import { Dropdown } from "semantic-ui-react"
import { getManagers } from "@modules/queryhooks"

export default function ManagerDropdown({ onChange, value, ...rest }) {
    const { managers } = getManagers()

    if (!managers) {
        return false
    }

    const options = managers.map((manager) => {
        return {
            key: manager.id,
            text: manager.username,
            value: manager.id,
        }
    })
    return <Dropdown {...rest} options={options} value={value} selection closeOnChange onChange={(ev, selection) => onChange(selection.value)} />
}
