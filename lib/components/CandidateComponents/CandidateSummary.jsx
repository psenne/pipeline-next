import Link from "next/link"
import { Icon, Header, Segment, Label } from "semantic-ui-react"
import { format, formatDistance } from "date-fns"
import Markdown from "markdown-to-jsx"
import classnames from "classnames"
import statuses from "@constants/statuses"
import MiniToolbar from "@components/CandidateComponents/MiniToolbar"

function CandidateSummary({ candidate }) {
    // const potential_contracts = candidate.potential_contracts ? candidate.potential_contracts.map(c=>c.name).join(", ") : ""
    const company = candidate.company ? `with ${candidate.company}` : ""
    const current_contract = candidate.current_contract ? `on ${candidate.current_contract}` : ""
    const created = candidate.created_at ? `Created on ${format(new Date(candidate.created_at), "MMM d, yyyy")}` : "" // by ${candidate.created_by}` : ""
    const updated = candidate.updated_at ? `Updated on ${format(new Date(candidate.updated_at), "MMM d, yyyy")}` : "" // by ${candidate.modified_by}` : ""
    const status_color = statuses.filter((s) => s.name === candidate.status)[0]
    const comments = candidate.comments
    const submissions = candidate.submissions
    const isFlagged = candidate.flags.filter((flag) => flag.active).length > 0

    return (
        <Segment.Group className={classnames({ archived: candidate.archived === "archived" })}>
            <MiniToolbar attached="top" candidateID={candidate.id} isFlagged={isFlagged} archived={candidate.archived} />
            <Segment key={candidate.id} attached padded color={status_color && status_color.dot}>
                <Link href={`/candidates/${candidate.id}`}>
                    <a className="candidate-link">
                        <Header>
                            <Header.Content>
                                {candidate.firstname} {candidate.lastname}
                            </Header.Content>
                            <Header.Subheader>
                                {candidate.level} {candidate.skill} {company} {current_contract}
                            </Header.Subheader>
                        </Header>
                        <div className="candidate-table-row-info">
                            <div className="candidate-table-field">Potential contracts:</div> {candidate.potential_contracts.map((c) => c.name).join(", ")}
                        </div>
                        <div className="candidate-table-row-info">
                            <div className="candidate-table-field">Notes:</div>
                            <Markdown>{candidate.notes || ""}</Markdown>
                        </div>
                        {comments.length > 0 && (
                            <>
                                <div className="candidate-table-row-info">
                                    <div className="candidate-table-field">Last comment:</div>
                                    {comments[0].author.username} ({formatDistance(new Date(comments[0].created_at), new Date(), { addSuffix: true })}) - <Markdown>{comments[0].text}</Markdown>
                                </div>
                                <Label attached="bottom right" color="pink">
                                    <Icon name="comments" /> {comments.length}
                                </Label>
                            </>
                        )}
                    </a>
                </Link>
                {submissions.length > 0 && (
                    <Header size="small">
                        Submitted to:
                        {submissions.map((submission) => {
                            return (
                                <Link key={submission.id} href={`/positions/${submission.position.id}`}>
                                    <a>
                                        <Label color="blue" key={submission.id}>
                                            <Icon name="briefcase" /> {submission.position.contract.name} - {submission.position.title}
                                        </Label>
                                    </a>
                                </Link>
                            )
                        })}
                    </Header>
                )}
            </Segment>
            <Header color="grey" size="tiny" textAlign="center" attached="bottom">
                <Icon name="wait" />
                {created} | {updated}
            </Header>
        </Segment.Group>
    )
}

export default CandidateSummary
