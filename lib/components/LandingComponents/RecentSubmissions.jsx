import Link from "next/link"
import { getRecentSubmissions } from "@modules/queryhooks"
import { Container, Header, List, Icon } from "semantic-ui-react"
import ComponentPlaceholder from "@components/CommonComponents/ComponentPlaceholder"
import { format } from "date-fns"

const RecentSubmissions = () => {
    const { submissions, loading, error } = getRecentSubmissions(5)
    let content = <ComponentPlaceholder lines="5" />

    if (error) {
        console.error(error)
        content = <p>Error loading candidates.</p>
    }

    if (submissions) {
        content = (
            <List selection verticalAlign="middle" divided relaxed>
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
