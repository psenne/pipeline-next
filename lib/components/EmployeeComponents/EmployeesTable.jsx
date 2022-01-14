import Link from "next/link"
import { useRouter } from "next/router"
import { Table, Icon, Label } from "semantic-ui-react"

export default function EmployeesTable({ employees }) {
    const router = useRouter()

    return (
        <Table selectable striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Employee</Table.HeaderCell>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Contract</Table.HeaderCell>
                    <Table.HeaderCell>Telephone Number</Table.HeaderCell>
                    <Table.HeaderCell>E-mail address</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {employees.map((employee) => {
                    return (
                        <Table.Row
                            key={employee.id}
                            onClick={(ev) => {
                                ev.stopPropagation()
                                if (!ev.target.className.split(" ").includes("action")) {
                                    router.push(`/employees/${employee.id}`)
                                }
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <Table.Cell width={1}>
                                <Link href={`/employees/${employee.id}/edit`}>
                                    <a>
                                        <Icon name="edit" className="action" />
                                    </a>
                                </Link>
                            </Table.Cell>
                            <Table.Cell width={3}>
                                {employee.firstname} {employee.lastname}
                            </Table.Cell>
                            <Table.Cell width={2}>
                                {employee.level || ""} {employee.title || ""}
                            </Table.Cell>
                            <Table.Cell width={3}>{employee.currentcontract.name}</Table.Cell>
                            <Table.Cell width={3}>{employee.telephone || ""}</Table.Cell>
                            <Table.Cell width={3}>{employee.emailaddress || ""}</Table.Cell>
                            <Table.Cell width={1}>
                                {employee.at_risk && (
                                    <Label ribbon="right" color="red">
                                        At Risk
                                    </Label>
                                )}
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}
