import { useState } from "react"
import { useAuthQuery } from "@modules/hooks"
import { GETPOSITIONSUMMARIES } from "@modules/queries"
import LoadingPositionsTable from "@components/PositionComponents/LoadingPositionsTable"
import { Form, Icon, Card, Divider, Container } from "semantic-ui-react"
import Markdown from "markdown-to-jsx"

//uses search field value to filter array of candidates for table population
function isSearched(s) {
    return function (item) {
        const searchTerm = s
        let wasFound = true

        s.split(" ").forEach((searchTerm) => {
            let termFound = false
            if (
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.position_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.skill_summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.contract.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
                termFound = true
            }
            wasFound = wasFound && termFound
        })

        return !searchTerm || wasFound
    }
}

export default function PositionSelection({ onSelect }) {
    const [searchterm, setsearchterm] = useState("")
    const { data, error, loading } = useAuthQuery(GETPOSITIONSUMMARIES)

    const ClearFilters = () => {
        setsearchterm("")
    }

    const SubmitToPosition = (id) => {
        onSelect(id)
    }

    if (loading) {
        return <LoadingPositionsTable />
    }
    if (error) {
        console.error(error)
        return "[There was an error]"
    }
    if (!data) {
        return false
    }

    const positions = data.positions || []

    return (
        <Container>
            <Form>
                <Form.Input placeholder="Filter positions..." icon={searchterm ? <Icon name="dont" color="red" link onClick={ClearFilters} /> : <Icon name="filter" />} value={searchterm} onChange={(ev, data) => setsearchterm(data.value)} />
            </Form>
            <Divider hidden />
            <Card.Group centered itemsPerRow={1}>
                {positions.filter(isSearched(searchterm)).map((position) => {
                    const position_id = position.position_id ? `(${position.position_id})` : ""
                    return (
                        <Card key={position.id} link onClick={(ev) => SubmitToPosition(position.id)}>
                            <Card.Content>
                                <Card.Header>
                                    {position.level} {position.title}
                                </Card.Header>
                                <Card.Meta>
                                    {position.contract.name} {position_id}
                                </Card.Meta>
                                <Card.Description>
                                    <Markdown>{position.skill_summary || ""}</Markdown>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        </Container>
    )
}
