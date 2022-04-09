import Link from "next/link"
import { GETRECENTCANDIDATES } from "@modules/queries"
import { useAuthQuery } from "@modules/hooks"
import { Container, List, Icon, Header } from "semantic-ui-react"
import ComponentPlaceholder from "@components/CommonComponents/ComponentPlaceholder"
import { format } from "date-fns"

export default function RecentCandidates() {
    const { data, loading, error } = useAuthQuery(GETRECENTCANDIDATES, { num: 5 })

    let content = <ComponentPlaceholder lines="5" />

    if (error) {
        console.error(error)
        content = <p>Error loading candidates.</p>
    }

    if (data && data.candidates) {
        const { candidates } = data
        content = (
            <List selection verticalAlign="middle" relaxed>
                {candidates.map((candidate) => {
                    const created_date = candidate.created_at ? format(new Date(candidate.created_at), "MMM d, yyyy") : ""
                    const skill = candidate.skill ? `(${candidate.skill})` : ""
                    const addedmsg = candidate.authored_by ? `Added by ${candidate.authored_by?.fullname} on ${created_date}` : ""

                    return (
                        <List.Item key={candidate.id}>
                            <List.Content>
                                <List.Header>
                                    <Link href={`/candidates/${candidate.id}`}>
                                        <a>
                                            {candidate.firstname} {candidate.lastname} {skill}
                                        </a>
                                    </Link>
                                </List.Header>
                                <List.Description>{addedmsg}</List.Description>
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
                <Icon name="user circle" />
                New candidates
            </Header>
            {content}
        </Container>
    )
}
