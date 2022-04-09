import { GETALLCONTRACTS } from "@modules/queries"
import { useAuthQuery } from "@modules/hooks"
import { Dropdown } from "semantic-ui-react"

export default function ContractDropdown({ onChange, filtered = null, ...rest }) {
    const { data: allcontracts, loading, error: queryerror } = useAuthQuery(GETALLCONTRACTS)

    if (queryerror) {
        console.error(queryerror)
        return <p>[Error loading contracts]</p>
    }

    function handleChange(ev, selection) {
        onChange(selection.value)
    }
    const contractList = allcontracts
        ? allcontracts.contracts
              .filter((contract) => {
                  if (filtered == "by position") {
                      return contract.positions.length > 0
                  } else if (filtered == "by employee") {
                      return contract.employees.length > 0
                  } else {
                      return contract
                  }
              })
              .map((contract) => {
                  return { key: contract.id, text: contract.name, value: contract.id }
              })
        : []

    return <Dropdown loading={loading} {...rest} selectOnBlur={false} options={contractList} onChange={handleChange} />
}
