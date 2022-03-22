import Link from "next/link"
import FlagMessagePopup from "@components/CommonComponents/FlagMessagePopup"
import { Card, Icon, Button } from "semantic-ui-react"
import { format } from "date-fns"

export default function Flag({ flag }) {
    const flagdate = format(new Date(flag.created_at), "MMM d, yyyy")
    const candidate_name = `${flag.candidate.firstname} ${flag.candidate.lastname}`
    const candidatelink = <Link href={`/candidates/${flag.candidate.id}`}>{candidate_name}</Link>

    const action = flag.actioned_to ? <h5>Actioned to: {flag.actioned_to.map((to) => to.username).join(", ")}</h5> : ""

    return (
        <Card>
            <Card.Content>
                <Card.Header>{candidatelink}</Card.Header>
                <Card.Meta>
                    Added by {flag.flagged_by.username} on {flagdate}
                </Card.Meta>
                <Card.Description>
                    {action}
                    <div>{flag.flag_note}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <FlagMessagePopup candidateID={flag.candidate.id}>
                    <Button>
                        <Icon name="flag" color="red" />
                        Edit note
                    </Button>
                </FlagMessagePopup>
            </Card.Content>
        </Card>
    )
}
