import { useState } from "react"
import { getCommentsByCandidate, getSubmissionsByCandidate } from "@modules/queryhooks"
import { format, parseISO } from "date-fns"
import SubmissionModal from "@components/CandidateComponents/SubmissionModal"
import CommentSection from "@components/CommonComponents/CommentSection"
import CommentForm from "@components/CommonComponents/CommentForm"
import Link from "next/link"
import { Grid, Header, Segment, Tab, Icon, Button } from "semantic-ui-react"
import Markdown from "markdown-to-jsx"
import classnames from "classnames"
import FlagMessage from "@components/CommonComponents/FlagMessage"
// import Files from "@components/CommonComponents/Files"

export default function CandidateProfile({ candidate }) {
    const [showResume, setshowResume] = useState(false)
    const rescomments = getCommentsByCandidate(candidate.id)
    console.log(rescomments)
    const { submissions } = getSubmissionsByCandidate(candidate.id)

    const SelectPosition = (position) => {
        console.log(position)
        // const candidate_name = candidate.firstname + " " + candidate.lastname;
        // const updatedSubmissionInfo = {
        //     submission_date: firebase.firestore.FieldValue.serverTimestamp(),
        //     candidate_id: candidateID,
        //     candidate_name: candidate_name,
        //     position_id: position.position_id,
        //     position_key: position.key,
        //     position_title: position.title,
        //     position_contract: position.contract
        // };
        // const candidateRef = fbCandidatesDB.doc(candidateID).collection("submitted_positions").doc(position.key);
        // const positionRef = fbPositionsDB.doc(position.key).collection("submitted_candidates").doc(candidateID);
        // var batch = firebase.firestore().batch();
        // batch.set(positionRef, updatedSubmissionInfo);
        // batch.set(candidateRef, updatedSubmissionInfo);
        // batch.commit().catch(err => console.error(err));
    }

    const RemoveCandidateFromPosition = (positionkey) => {
        // const { candidate } = state;
        // const candidate_name = candidate.firstname + " " + candidate.lastname;
        // const { candidateID } = props;
        // if (window.confirm(`Are you sure you want to unsubmit ${candidate_name}?`)) {
        //     const candidateRef = fbCandidatesDB.doc(candidateID).collection("submitted_positions").doc(positionkey);
        //     const positionRef = fbPositionsDB.doc(positionkey).collection("submitted_candidates").doc(candidateID);
        //     var batch = firebase.firestore().batch();
        //     batch.delete(positionRef);
        //     batch.delete(candidateRef);
        //     batch.commit().catch(err => console.error(err));
        // }
    }

    let interviewed = "Candidate has not been interviewed."
    let loi_message = "LOI has not been sent."
    let referedby = ""
    let company_info = ""

    const archived = candidate["archived"] || false

    let interview_date = candidate.interview_date ? format(parseISO(candidate.interview_date), "M/d/yyyy") : ""
    let loi_sent_date = candidate.loi_sent_date ? `LOI was sent on ${format(parseISO(candidate.loi_sent_date), "M/d/yyyy")}.` : ""

    if (interview_date && candidate.interviewed_by) {
        interviewed = `Interviewed on ${interview_date} by ${candidate.interviewed_by.map((c) => c.username).join(", ")}.`
    } else if (interview_date) {
        interviewed = `Interviewed on ${interview_date}.`
    } else if (candidate.interviewed_by) {
        interviewed = `Interviewed by ${candidate.interviewed_by.map((c) => c.username).join(", ")}.`
    } else {
        interviewed = "Candidate has not been interviewed."
    }

    if (candidate.found_by) {
        referedby = `Referred by ${candidate.found_by}`
    }

    if (candidate.current_company) {
        company_info = ` with ${candidate.current_company}`
    }

    if (candidate.loi_status === "accepted") {
        loi_message = `${loi_sent_date} LOI was accepted.`
    } else if (candidate.loi_status === "sent") {
        loi_message = `${loi_sent_date}`
    } else {
        loi_message = "LOI has not been sent."
    }

    const panes = [
        {
            menuItem: { key: "notes", icon: "sticky note outline", content: "Notes" },
            render: () => (
                <Tab.Pane>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <div className="markdown">
                                    <h3>Management Notes:</h3>
                                    <Markdown>{candidate.notes || ""}</Markdown>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <div className="markdown">
                                    <h3>Next Steps:</h3>
                                    <Markdown>{candidate.next_steps || ""}</Markdown>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Tab.Pane>
            ),
        },
        {
            menuItem: { key: "resume", icon: "file text", content: "Resume Text" },
            render: () => (
                <Tab.Pane>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Markdown>{candidate.resume_text || ""}</Markdown>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Tab.Pane>
            ),
        },
    ]

    return (
        <>
            {candidate && (
                <Segment attached padded className={classnames({ "status-archived": archived })}>
                    <Segment vertical padded>
                        <Grid>
                            <Grid.Row>
                                <FlagMessage candidateID={candidate.id} />
                            </Grid.Row>
                            <Grid.Row verticalAlign="middle" columns={2}>
                                <Grid.Column>
                                    <Header size="huge">
                                        {candidate.firstname} {candidate.lastname}
                                        <h5>{[candidate.emailaddress, candidate.telephone].filter(Boolean).join(" / ")}</h5>
                                        <Header.Subheader>
                                            {candidate.level} {candidate.skill} {company_info}
                                        </Header.Subheader>
                                    </Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <span className={classnames("padded-span", `status-${candidate.status}`)}>{candidate.status.toUpperCase()}</span>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>

                    <Segment vertical padded>
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <div>Current contract: {candidate.current_contract}</div>
                                    <div>Potential contracts: {candidate.potential_contracts.map((c) => c.name).join(", ")}</div>
                                    <div>Prefered work location: {candidate.prefered_location}</div>
                                    <div>Salary: {candidate.salary}</div>
                                    <div>{referedby}</div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div>{interviewed}</div>
                                    <div>{loi_message}</div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>

                    <Segment vertical padded>
                        <Tab panes={panes} />
                    </Segment>
                    {/* <Segment vertical padded className={classnames({ "form-hidden": candidate.filenames }, "minitoolbar-inline")}>
                        <h3>Documents</h3>
                        <Files id={candidateID} filenames={candidate.filenames} />
                    </Segment> */}
                    {(candidate.status === "processing" || candidate.status === "active") && (
                        <Segment vertical>
                            <h3>
                                <Icon name="tasks" /> Position submissions
                            </h3>
                            {submissions?.length == 0 && "This candidate has not been submitted to a position."}
                            {submissions?.length > 0 && (
                                <div>
                                    {submissions.map((submission) => {
                                        const position = submission.position
                                        const contract = position.contract
                                        const submission_date = `- submitted on ${format(new Date(submission.created_at), "MMM d, yyyy")}`
                                        return (
                                            <p key={submission.id}>
                                                <Link href={`/positions/${position.id}`}>
                                                    <a>
                                                        {contract.name}, {position.title} {position.position_id} {submission_date}
                                                    </a>
                                                </Link>
                                                <Icon name="close" color="red" link onClick={() => RemoveCandidateFromPosition(position.id)} />
                                            </p>
                                        )
                                    })}
                                </div>
                            )}
                            <Segment basic>
                                <SubmissionModal onSelect={SelectPosition}>
                                    <Button basic icon labelPosition="left">
                                        <Icon name="add" color="blue" />
                                        Submit to position
                                    </Button>
                                </SubmissionModal>
                            </Segment>
                        </Segment>
                    )}
                    <CommentSection title="Comments" res={rescomments}>
                        <CommentForm candidateID={candidate.id} />
                    </CommentSection>
                </Segment>
            )}
        </>
    )
}
