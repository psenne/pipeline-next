import { useState } from "react"
import Head from "next/head"
import { tmplCandidate } from "@constants/candidateInfo"
import ContractDropdown from "@components/CommonComponents/ContractDropdown"
import { Form, Segment, Button, Message, Header, Tab } from "semantic-ui-react"

export default function AddCandidateForm() {
    const [candidate, setcandidate] = useState({ ...tmplCandidate })
    const [formError, setformError] = useState(false)
    const [files, setfiles] = useState([])

    function HandleTextInput(ev) {
        const name = ev.target.name
        const value = ev.target.value
        updateSelectedCandidate(name, value)
    }

    //generic callback for dropdowns
    function HandlePContractInput(value) {
        updateSelectedCandidate("potential_contracts", value)
    }

    function HandleFileUpload(ev) {
        //add files to state for later uploading
        const files = ev.target.files
        setfiles({
            files,
        })

        //add filenames to candidate info for later retrieving
        let filenames = []
        for (var i = 0; i < files.length; i++) {
            filenames.push(files[i].name)
        }
        updateSelectedCandidate("filenames", filenames)
    }

    function updateSelectedCandidate(name, value) {
        let newval = {}
        newval[name] = value
        setcandidate({ ...candidate, ...newval })
    }

    //callback function when form editing is done.
    function updateDB() {
        console.log(candidate)
        // axios.post("/api/candidates", candidate)
    }

    // only required fields are first and last name of candidate. If those aren't set return false and show error message
    function ValidateAndSubmit() {
        setformError(false)

        if (candidate.firstname && candidate.lastname) {
            updateDB()
        } else {
            setformError(true)
        }
    }

    const panes = [
        {
            menuItem: { key: "notes", icon: "sticky note outline", content: "Notes" },
            render: () => (
                <Tab.Pane>
                    <Form.TextArea style={{ minHeight: 300 }} name="notes" onChange={HandleTextInput} value={candidate.notes} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: { key: "resume", icon: "file text", content: "Resume Text" },
            render: () => (
                <Tab.Pane>
                    <Form.TextArea style={{ minHeight: 300 }} name="resume_text" onChange={HandleTextInput} value={candidate.resume_text} />
                </Tab.Pane>
            ),
        },
    ]

    return (
        <>
            <Head>
                <title>RenX Portal: Add Candidate</title>
            </Head>
            <Segment>
                <Form>
                    <Header>Personal Information</Header>
                    <Segment>
                        <Form.Group widths="equal">
                            <Form.Input name="firstname" type="text" required label="First name" placeholder="First name" onChange={HandleTextInput} value={candidate.firstname} />
                            <Form.Input name="lastname" type="text" required label="Last name" placeholder="Last name" onChange={HandleTextInput} value={candidate.lastname} />
                        </Form.Group>
                        <Form.Input name="emailaddress" type="email" label="Email Address:" icon="mail" iconPosition="left" placeholder="Email Address" onChange={HandleTextInput} value={candidate.emailaddress} />
                        <Form.Input name="telephone" type="tel" label="Phone Number:" icon="phone" iconPosition="left" placeholder="XXX-XXX-XXXX" onChange={HandleTextInput} value={candidate.telephone} />
                        <Form.Input name="prefered_location" type="text" label="Prefered work location:" icon="globe" iconPosition="left" placeholder="City / State" onChange={HandleTextInput} value={candidate.prefered_location} />
                    </Segment>

                    <Header>Hiring Information</Header>
                    <Segment>
                        <Form.Group inline>
                            <Form.Input inline type="text" name="skill" label="Skill / Role:" onChange={HandleTextInput} value={candidate.skill} />{" "}
                            <Form.Input inline type="text" name="current_company" label="with current company" onChange={HandleTextInput} value={candidate.current_company} />
                        </Form.Group>
                        <Form.Input inline type="text" name="level" label="Level:" onChange={HandleTextInput} value={candidate.level} />
                        <Form.Input inline type="text" name="current_contract" label="Current contract:" onChange={HandleTextInput} value={candidate.current_contract} />
                        <Form.Group inline>
                            <label>Potential contracts: </label>
                            <ContractDropdown multiple selection onChange={HandlePContractInput} value={candidate.potential_contracts} />
                        </Form.Group>
                        <Form.Group inline>
                            <label>Add document:</label>
                            <Form.Input name="doc_filename" type="file" multiple onChange={HandleFileUpload} />
                        </Form.Group>
                    </Segment>
                    <Header>Notes</Header>
                    <Segment>
                        <Tab panes={panes} />
                        <Form.Input name="found_by" type="text" label="Referred By" onChange={HandleTextInput} value={candidate.found_by} />
                    </Segment>
                </Form>
            </Segment>
            <Segment>
                {formError && <Message error floating compact icon="warning" header="Required fields missing" content="First and last names are both required." />}
                <Button type="submit" icon="save" positive content="Add" onClick={ValidateAndSubmit} />
            </Segment>
        </>
    )
}
