import React, { useState } from "react"
import Link from "next/link"
import { Segment, Header, Label, Icon, Menu, Accordion, Transition } from "semantic-ui-react"
import classnames from "classnames"
import { format } from "date-fns"
import Markdown from "markdown-to-jsx"

function PositionSummary({ position }) {
    const [submissions, setsubmissions] = useState([])
    const [showdescription, setshowdescription] = useState(false)
    const key = position.key

    const position_id = position.info.position_id ? `(${position.info.position_id})` : ""
    const contract = position.info.contract ? `${position.info.contract}: ` : ""
    const level = position.info.level ? position.info.level : ""
    const location = position.info.location ? `Location: ${position.info.location}` : ""
    const created = position.info.added_on ? (
        <Header color="grey" size="tiny" textAlign="center" attached="bottom">
            <Icon name="wait" />
            Created on {format(position.info.added_on.toDate(), "MMM d, yyyy")}
        </Header>
    ) : (
        ""
    )
    const more_info = position.info.description ? (
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
                    <Markdown>{position.info.description}</Markdown>
                </Accordion.Content>
            </Transition>
        </Accordion>
    ) : (
        ""
    )

    return (
        <div key={position.key} className={classnames({ "candidate-submitted": submissions.length > 0 }, "candidate-table-row")}>
            <Menu attached icon className="minitoolbar-inline">
                <Menu.Item as={Link} title="Edit position" className="minitoolbar-edit" to={`/positions/${key}/edit`} icon="edit"></Menu.Item>
            </Menu>
            <Segment attached>
                <Link href={`/positions/${position.key}`}>
                    <a>
                        <Header>
                            <Header.Content>
                                {contract} {level} {position.info.title} {position_id}
                            </Header.Content>
                            <Header.Subheader>
                                <div>{location}</div>
                            </Header.Subheader>
                        </Header>
                        <p>
                            <Markdown>{position.info.skill_summary}</Markdown>
                        </p>
                        <p>{more_info}</p>
                    </a>
                </Link>
                {submissions.length > 0 && (
                    <Header size="small">
                        Candidates submitted:
                        {submissions.map((candidate) => {
                            return (
                                <Link key={candidate.key} href={`/candidates/${candidate.key}`}>
                                    <a>
                                        <Label color="blue" key={candidate.key} content={candidate.info.candidate_name} icon="user secret" />
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
