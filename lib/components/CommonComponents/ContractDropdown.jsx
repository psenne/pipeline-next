import { getContracts } from "@modules/queryhooks"
import { Dropdown } from "semantic-ui-react"

export default function ContractDropdown({ onChange, contractsoverride, ...rest }) {
    const { contracts } = getContracts()

    function handleChange(ev, selection) {
        onChange(selection.value)
    }
    const contractList = contracts
        ? contracts
              .filter(OverrideContracts(contractsoverride))
              .map((contract) => {
                  return { key: contract.id, text: contract.name, value: contract.id }
              })
              .sort((a, b) => {
                  var comparison = 0
                  if (a.text > b.text) {
                      comparison = 1
                  } else if (a.text < b.text) {
                      comparison = -1
                  }
                  return comparison
              })
        : []
    return <Dropdown {...rest} selectOnBlur={false} options={contractList} onChange={handleChange} />
}

function OverrideContracts(contractsoverride = []) {
    return function (contract) {
        if (contractsoverride.length > 0) {
            return contractsoverride.includes(contract.info.name)
        } else {
            return contract
        }
    }
}
