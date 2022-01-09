import { getContracts } from "@modules/queryhooks"
import { Dropdown } from "semantic-ui-react"

export default function ContractDropdown({ onChange, filtered = false, ...rest }) {
    const { allcontracts } = getContracts()

    function handleChange(ev, selection) {
        onChange(selection.value)
    }

    const contractList = allcontracts
        ? allcontracts
              .filter((contract) => {
                  if (filtered) {
                      return contract.positions.length > 0
                  } else {
                      return contract
                  }
              })
              .map((contract) => {
                  return { key: contract.name, text: contract.name, value: contract.name }
              })
        : []

    return <Dropdown {...rest} selectOnBlur={false} options={contractList} onChange={handleChange} />
}
