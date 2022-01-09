import { useState } from "react"
import Link from "next/link"
import { Segment, Header, Label, Icon, Menu, Accordion, Transition } from "semantic-ui-react"
import classnames from "classnames"
import { format } from "date-fns"
import Markdown from "markdown-to-jsx"

function PositionSummary({ position }) {
    const [showdescription, setshowdescription] = useState(false)
    const key = position.id

    const position_id = position.position_id ? `(${position.position_id})` : ""
    const contract = position.contract?.name
    const level = position.level ? position.level : ""
    const location = position.location ? `Location: ${position.location}` : ""
    const submissions = position.submissions || []

    const created = position.created_at ? (
        <Header color="grey" size="tiny" textAlign="center" attached="bottom">
            <Icon name="wait" />
            {`Created on ${format(new Date(position.created_at), "MMM d, yyyy")}`}
        </Header>
    ) : (
        ""
    )
    const more_info = position.description ? (
        <Accordion>
            <Accordion.Title
                onClick={(ev) => {
                    ev.stopPropagation()
                    ev.preventDefault()
                    setshowdescription(!showdescription)
                }}
            >
                <Icon name="expand arrows alternate"></Icon>more info
            </Accordion.Title>
            <Transition visible={showdescription} animation="slide down" duration={250}>
                <Accordion.Content active={showdescription}>
                    <Markdown>{position.description || ""}</Markdown>
                </Accordion.Content>
            </Transition>
        </Accordion>
    ) : (
        ""
    )

    return (
        <div key={position.id} className={classnames({ "candidate-submitted": submissions.length > 0 })}>
            <Menu attached icon>
                <Link href={`/positions/${key}/edit`} passHref>
                    <Menu.Item as="a" title="Edit position" className="minitoolbar-edit" icon="edit"></Menu.Item>
                </Link>
            </Menu>
            <Segment attached>
                <Link href={`/positions/${position.id}`}>
                    <a>
                        <Header>
                            <Header.Content>
                                {contract} {level} {position.title} {position_id}
                            </Header.Content>
                            <Header.Subheader>
                                <div>{location}</div>
                            </Header.Subheader>
                        </Header>
                        <div>
                            <Markdown>{position.skill_summary}</Markdown>
                        </div>
                        <div>{more_info}</div>
                    </a>
                </Link>
                {submissions.length > 0 && (
                    <Header size="small">
                        Candidates submitted:
                        {submissions.map((submission) => {
                            const candidate = submission.candidate
                            return (
                                <Link key={candidate.id} href={`/candidates/${candidate.id}`}>
                                    <a>
                                        <Label color="blue" key={candidate.id} content={`${candidate.firstname} ${candidate.lastname}`} icon="user secret" />
                                    </a>
                                </Link>
                            )
                        })}
                    </Header>
                )}
            </Segment>
            {created}
        </div>
    )
}

export default PositionSummary
