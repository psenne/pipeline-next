import { useRouter } from "next/router"
import Link from "next/link"
import { Get } from "@modules/requests"
import { format } from "date-fns"
import PositionLayout from "@layouts/PositionLayout"
import { Header, Segment, Menu, Icon } from "semantic-ui-react"
import Markdown from "markdown-to-jsx"

export async function getServerSideProps({ params }) {
    const id = params.id

    const { data, error } = await Get("GETPOSITIONSBYID", { id })
    if (!data.position || error) {
        return { notFound: true }
    } else {
        return { props: { position: data.position } }
    }
}

export default function PositionDetailPage({ position }) {
    const router = useRouter()

    const position_id = position.position_id ? `Position #${position.position_id}` : ""
    const contract = position.contract ? `${position.contract.name} ` : ""
    const level = position.level ? `${position.level}` : ""
    const skill_summary = position.skill_summary ? (
        <Segment vertical>
            <Markdown>{position.skill_summary}</Markdown>
        </Segment>
    ) : (
        ""
    )
    const location = position.location ? `Location: ${position.location}` : ""
    const created = position.added_on ? (
        <Header color="grey" size="tiny" textAlign="center" attached="bottom">
            <Icon name="wait" />
            Created on {format(position.created_at, "MMM d, yyyy")}
        </Header>
    ) : (
        ""
    )
    const description = position.description ? (
        <Segment vertical>
            <Markdown>{position.description || ""}</Markdown>
        </Segment>
    ) : (
        ""
    )

    return (
        <>
            <Menu attached="top" size="huge" borderless className="no-print">
                <Menu.Item
                    onClick={() => {
                        router.back()
                    }}
                >
                    <Icon name="arrow left" />
                </Menu.Item>
                <Menu.Menu position="right">
                    <Link href={`/positions/${position.id}/edit`} passHref>
                        <Menu.Item as="a" icon="edit" className="minitoolbar-edit"></Menu.Item>
                    </Link>
                </Menu.Menu>
            </Menu>
            <Segment attached>
                <Segment vertical>
                    <Header>
                        <Header.Content>
                            {level} {position.title}
                        </Header.Content>
                        <Header.Subheader>
                            <div>Contract: {contract} </div>
                            <div>{position_id}</div>
                            <div>{location}</div>
                        </Header.Subheader>
                    </Header>
                    {skill_summary}
                </Segment>
                {description}
                {position.submissions.length > 0 && (
                    <Segment vertical>
                        <Header size="small">
                            <Header.Content>Candidates submitted:</Header.Content>
                            <Header.Subheader>
                                {position.submissions.map((submission) => {
                                    const candidate = submission.candidate
                                    return (
                                        <div key={candidate.id}>
                                            <Link href={`/candidates/${candidate.id}`}>
                                                <a>
                                                    {candidate.firstname} {candidate.lastname}
                                                </a>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </Header.Subheader>
                        </Header>
                    </Segment>
                )}
            </Segment>
            {created}
        </>
    )
}

PositionDetailPage.Layout = PositionLayout
