import Link from "next/link"
import { useAuthQuery } from "@modules/hooks"
import { GETRECENTSUBMISSIONS } from "@modules/queries"
import { Container, Header, List, Icon } from "semantic-ui-react"
import ComponentPlaceholder from "@components/CommonComponents/ComponentPlaceholder"
import { format } from "date-fns"

const RecentSubmissions = () => {
    const { data, loading, error } = useAuthQuery(GETRECENTSUBMISSIONS, { num: 5 })

    let content = ""

    if (loading) {
        content = <ComponentPlaceholder lines="5" />
    }

    if (error) {
        console.error(error)
        content = <p>[Error loading submissions]</p>
    }

    if (!data) {
        return false
    }

    if (data.submissions) {
        const { submissions } = data
        content = (
            <List selection verticalAlign="middle" relaxed>
                {submissions.map((submission) => {
                    const candidate_name = `${submission.candidate.firstname} ${submission.candidate.lastname}`
                    return (
                        <List.Item key={submission.id}>
                            <List.Content>
                                <List.Header>
                                    <Link href={`/candidates/${submission.candidate.id}`}>{candidate_name}</Link> submitted for <Link href={`/positions/${submission.position.id}`}>{submission.position.title}</Link> on{" "}
                                    {submission.position.contract.name}
                                </List.Header>
                                {format(new Date(submission.created_at), "MMM d, yyyy")}
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
                <Icon name="smile" />
                Submitted candidates
            </Header>
            {content}
        </Container>
    )
}

export default RecentSubmissions
