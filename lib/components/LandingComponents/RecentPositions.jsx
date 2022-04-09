import Link from "next/link"
import { useAuthQuery } from "@modules/hooks"
import { GETRECENTPOSITIONS } from "@modules/queries"
import { Container, Header, List, Icon } from "semantic-ui-react"
import ComponentPlaceholder from "@components/CommonComponents/ComponentPlaceholder"
import { format } from "date-fns"

const RecentPositions = () => {
    const { data, loading, error } = useAuthQuery(GETRECENTPOSITIONS, { num: 5 })

    let content = ""
    if (loading) {
        content = <ComponentPlaceholder lines="5" />
    }

    if (error) {
        console.error(error)
        content = <p>[Error loading positions]</p>
    }

    if (!data) {
        return false
    }

    if (data?.positions) {
        const { positions } = data
        content = (
            <List selection verticalAlign="middle" relaxed>
                {positions.map((position) => {
                    const author = position.authored_by ? `by ${position.authored_by.fullname}` : ""
                    const positioninfo = `${position.contract.name} - ${position.title}`
                    return (
                        <List.Item key={position.id}>
                            <List.Content>
                                <List.Header>
                                    <Link href={`/positions/${position.id}`}>{positioninfo}</Link>
                                </List.Header>
                                added {author} on {format(new Date(position.created_at), "MMM d, yyyy")}
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
                <Icon name="briefcase" />
                New Positions
            </Header>
            {content}
        </Container>
    )
}

export default RecentPositions
