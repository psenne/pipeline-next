import Head from "next/head"
import { useState } from "react"
import { useRouter } from "next/router"
import { useAuthMutation } from "@modules/hooks"
import { UPDATECANDIDATE, DELETECANDIDATE, ADDEMPLOYEE } from "@modules/queries"
import tmplEmployee from "@constants/employee"
import classnames from "classnames"
import { sentence } from "to-case"
import LOIStatusDropdown from "@components/CommonComponents/LOIStatusDropdown"
import ContractDropdown from "@components/CommonComponents/ContractDropdown"
import ManagerDropdown from "@components/CommonComponents/ManagerDropdown"
import ModalConvertToEmployee from "@components/CandidateComponents/ModalConvertToEmployee"
// import Files from "../CommonComponents/Files";
import { Form, Segment, Button, Header, Menu, Icon, Checkbox, Tab } from "semantic-ui-react"
import SemanticDatepicker from "react-semantic-ui-datepickers"
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css"

export default function EditCandidateForm({ candidateinfo, id }) {
    const router = useRouter()
    const [candidate, setCandidate] = useState({ ...candidateinfo })
    const [error, setError] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const [updatecandidate] = useAuthMutation(UPDATECANDIDATE, {
        onCompleted: (data) => {
            router.push(`/candidates/${id}`)
        },
        onError: (error) => {
            alert("That didn't work!")
            console.error(error)
        },
    })

    const [deletecandidate] = useAuthMutation(DELETECANDIDATE, {
        onCompleted: (data) => {
            router.push(`/candidates`)
        },
    })

    const [addemployee] = useAuthMutation(ADDEMPLOYEE, {
        onCompleted: (data) => {
            const employee = data?.createEmployee?.employee
            DeleteCandidate()
            router.push(`/employees/${employee?.id}`)
        },
    })

    const archiveLabel = candidate.archived === "archived" ? "Unarchive Candidate" : "Archive Candidate"

    function updateSelectedCandidate(name, value) {
        candidate[name] = value
        setCandidate({ ...candidate })
    }

    function HandleTextInput(ev) {
        const name = ev.target.name
        const value = ev.target.value
        updateSelectedCandidate(name, value)
    }

    function HandleTextInputUpper(ev) {
        const name = ev.target.name
        const value = ev.target.value

        updateSelectedCandidate(name, value.toUpperCase())
    }

    function HandlePContractInput(value) {
        updateSelectedCandidate("potential_contracts", value)
    }

    function HandleLOIStatusChange(value) {
        updateSelectedCandidate("loi_status", value)
        if (value === "notsent") updateSelectedCandidate("status", "interviewed") //if LOI was not sent, update status to interviewed
        if (value === "sent") updateSelectedCandidate("status", "recruiting") //if LOI was sent, update status to recruiting
        if (value === "accepted") updateSelectedCandidate("status", "active") //if LOI was accepted, update status to active
    }

    function HandleManagerDropdown(managers) {
        updateSelectedCandidate("interviewed_by", managers)
    }

    //callback for interview date.
    function HandleInterviewDateChange(ev, newdate) {
        updateSelectedCandidate("interview_date", newdate.value)
        if (candidate.status === "initial" && newdate) {
            updateSelectedCandidate("status", "interviewed") //if interview took place, set status to interviewed
        }
        if (newdate === null) {
            updateSelectedCandidate("status", "initial") //if no interview date has been entered, set status to initial
        }
    }

    //callback for LOI date.
    function HandleLOIDateChange(ev, newdate) {
        updateSelectedCandidate("loi_sent_date", newdate.value)
    }

    function HandleFileUpload(ev) {
        //add files to state for later uploading
        const files = ev.target.files
        //add filenames to candidate info for later retrieving
        let newfilenames = [...filenames]
        for (var i = 0; i < files.length; i++) {
            newfilenames.push(files[i].name)
        }
        updateSelectedCandidate("filenames", [...newfilenames])
    }

    function DeleteFile(ev, filename) {
        ev.stopPropagation()
        ev.preventDefault()
        const filenames = candidate.filenames
        const newFilenames = filenames.filter((f) => f !== filename)

        if (window.confirm(`Are you sure you want to delete ${filename}?`)) {
            console.log("file deleted")
        }
    }

    function ConvertToEmployee({ hired_on, salary, birthday, notes, level, title, current_contract }) {
        const employee = {
            firstname: candidate.firstname,
            lastname: candidate.lastname,
            emailaddress: candidate.emailaddress,
            telephone: candidate.telephone,
            found_by: candidate.found_by,
            filenames: candidate.filenames,
            current_contract,
            hired_on,
            level,
            notes,
            title,
            salary,
            birthday,
            authored_by: candidate.modified_by,
            resume_text: candidate.resume_text,
        }
        const variables = {
            input: { data: { ...tmplEmployee, ...employee } },
        }
        addemployee({ variables })
    }

    // only required fields are first and last name of candidate. If those aren't set return false and show error message
    function ValidateAndSubmit() {
        setError(false)

        if (candidate.firstname.length > 0 && candidate.lastname.length > 0) {
            const variables = {
                input: {
                    where: {
                        id: id,
                    },
                    data: candidate,
                },
            }
            updatecandidate({ variables })
        } else {
            setError(true)
        }
    }

    //callback for checkbox for setting candidate to archive
    function ToggleArchive(ev, data) {
        const { candidate, key } = state

        candidate.archived = data.checked ? "archived" : "current"
        console.log("candidate archived")
    }

    //callback for Delete button. needed this for confirmation prompt
    function ConfirmDelete() {
        const confirmationMsg = "Are you sure you want to delete " + candidate.firstname + " " + candidate.lastname + "?"
        const deleteConfirmed = window.confirm(confirmationMsg)

        if (deleteConfirmed) {
            DeleteCandidate()
        }
    }

    function DeleteCandidate() {
        const variables = {
            input: {
                where: {
                    id: id,
                },
            },
        }
        deletecandidate({ variables })
    }

    const panes = [
        {
            menuItem: { key: "notes", icon: "sticky note outline", content: "Notes" },
            render: () => (
                <Tab.Pane>
                    <Form.TextArea name="notes" style={{ minHeight: 300 }} onChange={HandleTextInput} value={candidate.notes} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: { key: "resume", icon: "file text", content: "Resume Text" },
            render: () => (
                <Tab.Pane>
                    <Form.TextArea name="resume_text" style={{ minHeight: 300 }} onChange={HandleTextInput} value={candidate.resume_text} />
                </Tab.Pane>
            ),
        },
    ]

    return (
        <>
            <Head>
                <title>
                    Editing {candidate.firstname} {candidate.lastname} - RenX Portal
                </title>
            </Head>

            <Menu fluid attached="top" size="huge" borderless className={classnames("no-print", `status-${candidate.status}`)}>
                <Menu.Item>
                    <Header>
                        {candidate.firstname} {candidate.lastname} ({sentence(candidate.status)})
                    </Header>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Checkbox toggle label={archiveLabel} checked={candidate.archived === "archived" ? true : false} onChange={ToggleArchive} />
                    </Menu.Item>
                    <Menu.Item title="Close" onClick={() => history.goBack()}>
                        <Icon name="cancel" />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Segment attached>
                <Form error={error}>
                    <Header>Personal Information</Header>
                    <Segment>
                        <Form.Group widths="equal">
                            <Form.Input name="firstname" type="text" required label="First name" placeholder="First name" onChange={HandleTextInput} value={candidate.firstname} />
                            <Form.Input name="lastname" type="text" required label="Last name" placeholder="Last name" onChange={HandleTextInput} value={candidate.lastname} />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input name="emailaddress" type="email" label="Email Address:" icon="mail" iconPosition="left" placeholder="Email Address" onChange={HandleTextInput} value={candidate.emailaddress} />
                            <Form.Input name="telephone" type="tel" label="Phone Number:" icon="phone" iconPosition="left" placeholder="XXX-XXX-XXXX" onChange={HandleTextInput} value={candidate.telephone} />
                            <Form.Input name="prefered_location" type="text" label="Prefered work location:" icon="globe" iconPosition="left" placeholder="City / State" onChange={HandleTextInput} value={candidate.prefered_location} />
                        </Form.Group>
                    </Segment>

                    <Header>Hiring Information</Header>
                    <Segment>
                        <Form.Group inline>
                            <Form.Input inline type="text" name="skill" label="Skill / Role:" onChange={HandleTextInput} value={candidate.skill} />{" "}
                            <Form.Input type="text" name="current_company" label="with current company" onChange={HandleTextInput} value={candidate.current_company} />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input type="text" name="level" label="Level:" onChange={HandleTextInput} value={candidate.level} />
                            <Form.Input type="text" name="current_contract" label="Current contract:" onChange={HandleTextInput} value={candidate.current_contract} />
                            <Form.Field>
                                <label>Potential contracts: </label>
                                <ContractDropdown multiple selection onChange={HandlePContractInput} value={candidate.potential_contracts} />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field>
                                <label>Interview date: </label>
                                <SemanticDatepicker
                                    name="interview_date"
                                    datePickerOnly
                                    showToday={false}
                                    format="MMM D, YYYY"
                                    maxDate={new Date()}
                                    value={candidate.interview_date ? new Date(candidate.interview_date) : null}
                                    onChange={HandleInterviewDateChange}
                                />
                            </Form.Field>
                            <Form.Field width={6}>
                                <label>Interviewers: </label>
                                <ManagerDropdown name="interviewed_by" multiple value={candidate.interviewed_by} onChange={HandleManagerDropdown} />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group className={classnames({ "form-hidden": ["initial"].includes(candidate.status) })}>
                            <Form.Field width={6}>
                                <label>LOI Status:</label>
                                <LOIStatusDropdown name="loi_status" value={candidate.loi_status} onChange={HandleLOIStatusChange} />
                            </Form.Field>
                            <Form.Field>
                                <label> sent on </label>
                                <SemanticDatepicker
                                    name="loi_sent_date"
                                    datePickerOnly
                                    showToday={false}
                                    format="MMM D, YYYY"
                                    maxDate={new Date()}
                                    value={candidate.loi_sent_date ? new Date(candidate.loi_sent_date) : null}
                                    onChange={HandleLOIDateChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group width="equal">
                            <Form.Input name="salary" type="text" icon="dollar" iconPosition="left" label="Salary Requirement" onChange={HandleTextInput} value={candidate.salary} />
                        </Form.Group>
                    </Segment>
                    <Header>Documents</Header>
                    <Segment>
                        <Form.Group inline>
                            <label>Add document:</label>
                            <Form.Input name="doc_filename" type="file" multiple onChange={HandleFileUpload} />
                        </Form.Group>
                        {/* <Files deletable id={props.match.params.id} filenames={candidate.filenames} onDelete={DeleteFile} /> */}
                    </Segment>
                    <Header>Notes</Header>
                    <Segment>
                        <Tab panes={panes} />
                        <Form.Input name="found_by" type="text" label="Referred By" onChange={HandleTextInput} value={candidate.found_by} />
                    </Segment>
                </Form>
            </Segment>
            <Segment>
                {(candidate.status === "active" || candidate.status === "processing") && (
                    <ModalConvertToEmployee isOpen={modalOpen} setOpen={setModalOpen} candidate={candidate} CompleteConversion={ConvertToEmployee}>
                        <Button type="submit" icon="right arrow" labelPosition="right" floated="right" positive content="Convert to Employee" />
                    </ModalConvertToEmployee>
                )}
                <Button type="submit" icon="save" color="blue" content="Update" onClick={ValidateAndSubmit} />
                <Button type="submit" icon="trash" negative content="Delete" onClick={ConfirmDelete} />
            </Segment>
        </>
    )
}
