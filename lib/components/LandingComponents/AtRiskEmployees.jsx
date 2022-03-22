import Link from "next/link"
import { useAuthQuery } from "@modules/hooks"
import { GETATRISKEMPLOYEES } from "@modules/queries"
import { Container, Header, List, Icon } from "semantic-ui-react"
import ComponentPlaceholder from "@components/CommonComponents/ComponentPlaceholder"
import { format } from "date-fns"

const AtRiskEmployees = () => {
    const { data, loading, error } = useAuthQuery(GETATRISKEMPLOYEES)

    let content = ""
    if (loading) {
        content = <ComponentPlaceholder lines="5" />
    }

    if (error) {
        console.error(error)
        content = <p>[Error loading employees]</p>
    }

    if (!data) {
        return false
    }

    if (data.employees) {
        const { employees } = data
        content = (
            <List selection verticalAlign="middle" relaxed>
                {employees.map((employee) => {
                    const hired_on = employee.hired_on ? "Hire date: " + format(new Date(employee.hired_on), "MMM d, yyyy") : ""
                    const contract = employee.contract ? `Contract: ${employee.contract.name}` : ""
                    const name = `${employee.firstname} ${employee.lastname}`
                    return (
                        <List.Item key={employee.id}>
                            <List.Icon color="red" name="warning circle" />
                            <List.Content>
                                <List.Header>
                                    <Link href={`/employees/${employee.id}`}>{name}</Link>
                                </List.Header>
                                <List.Description>{hired_on}</List.Description>
                                <List.Description>{contract}</List.Description>
                            </List.Content>
                        </List.Item>
                    )
                })}
            </List>
        )
    }

    return (
        <Container>
            <Header>
                <Icon name="user secret" />
                At-Risk Employees
            </Header>
            {content}
        </Container>
    )
}

export default AtRiskEmployees
