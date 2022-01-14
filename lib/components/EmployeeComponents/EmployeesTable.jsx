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
                    const name = `${employee.firstname} ${employee.lastname}`
                    const title = `${employee.level} ${employee.title}`
                    const link = `/employees/${employee.id}`
                    const editlink = `/employees/${employee.id}/edit`

                    return (
                        <Table.Row
                            key={employee.id}
                            onClick={(ev) => {
                                ev.stopPropagation()
                                if (!ev.target.className.split(" ").includes("action")) {
                                    router.push(link)
                                }
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <Table.Cell width={1}>
                                <Link href={editlink}>
                                    <a>
                                        <Icon name="edit" className="action" />
                                    </a>
                                </Link>
                            </Table.Cell>
                            <Table.Cell width={3}>{name}</Table.Cell>
                            <Table.Cell width={2}>{title}</Table.Cell>
                            <Table.Cell width={3}>{employee.currentcontract.name}</Table.Cell>
                            <Table.Cell width={3}>{employee.telephone}</Table.Cell>
                            <Table.Cell width={3}>{employee.emailaddress}</Table.Cell>
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
