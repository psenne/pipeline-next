import { useState } from "react"
import ContractDropdown from "@components/CommonComponents/ContractDropdown"
import { Form, Container, Segment, Button, Header, Tab } from "semantic-ui-react"
import tmplEmployee from "@constants/employee"
import SemanticDatepicker from "react-semantic-ui-datepickers"
import { subYears } from "date-fns"
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css"

export default function AddEmployeePage() {
    const [employee, setEmployee] = useState(tmplEmployee)
    const [files, setFiles] = useState([])
    const [error, seterror] = useState(false)

    const HandleInput = (ev) => {
        const name = ev.target.name
        const value = ev.target.value
        var field = {}
        field[name] = value
        setEmployee({ ...employee, ...field })
    }

    const HandleContractInput = (selected_contract) => {
        setEmployee({ ...employee, ...{ current_contract: selected_contract } })
    }

    const HandleFileUpload = (ev) => {
        let filenames = []
        const tmpFiles = ev.target.files
        setFiles(tmpFiles)

        for (var i = 0; i < tmpFiles.length; i++) {
            filenames.push(tmpFiles[i].name)
        }
        setEmployee({ ...employee, ...{ filenames } })
    }

    const ValidateAndSubmit = () => {
        if (employee.firstname.length === 0 || employee.lastname.length === 0) {
            seterror(true)
        } else {
            seterror(false)
            console.log({ employee })
        }
    }

    const panes = [
        {
            menuItem: { key: "notes", icon: "sticky note outline", content: "Notes" },
            render: () => (
                <Tab.Pane>
                    <Form.TextArea name="notes" label="Management Notes" onChange={HandleInput} value={employee.notes} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: { key: "resume", icon: "file text", content: "Resume Text" },
            render: () => (
                <Tab.Pane>
                    <Form.TextArea name="resume_text" label="Resume" onChange={HandleInput} value={employee.resume_text} />
                </Tab.Pane>
            ),
        },
    ]

    return (
        <Container>
            <Segment>
                <Form error={error}>
                    <Header>Personal Information</Header>
                    <Segment>
                        <Form.Group widths="equal">
                            <Form.Input name="firstname" type="text" required label="First name:" placeholder="First name" onChange={HandleInput} value={employee.firstname} />
                            <Form.Input name="lastname" type="text" required label="Last name:" placeholder="Last name" onChange={HandleInput} value={employee.lastname} />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input name="emailaddress" type="email" label="Email Address:" icon="mail" iconPosition="left" placeholder="Email Address" onChange={HandleInput} value={employee.emailaddress} />
                            <Form.Input name="telephone" type="tel" label="Phone Number:" icon="phone" iconPosition="left" placeholder="XXX-XXX-XXXX" onChange={HandleInput} value={employee.telephone} />
                            <SemanticDatepicker
                                name="birthday"
                                label="Birthday:"
                                datePickerOnly
                                showToday={false}
                                date={subYears(new Date(), 30)}
                                icon="birthday cake"
                                onChange={(ev, selected_date) => {
                                    const date = selected_date.value
                                    setEmployee({ ...employee, ...{ birthday: date } })
                                }}
                            />
                        </Form.Group>
                    </Segment>

                    <Header>Hiring Information</Header>
                    <Segment>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <Form.Input type="text" name="level" label="Level:" onChange={HandleInput} value={employee.level} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input type="text" name="title" label="Title:" onChange={HandleInput} value={employee.title} />
                            </Form.Field>
                            <Form.Field>
                                <label>Contract:</label>
                                <ContractDropdown selection clearable value={employee.current_contract} onChange={HandleContractInput} />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input name="salary" type="text" label="Salary:" icon="dollar" iconPosition="left" value={employee.salary} onChange={HandleInput} />
                            <Form.Input name="found_by" type="text" label="Referred by:" onChange={HandleInput} value={employee.found_by} />
                            <SemanticDatepicker
                                name="hired_on"
                                label="Date of hire:"
                                datePickerOnly
                                maxDate={new Date()}
                                showToday={false}
                                onChange={(ev, selected_date) => {
                                    const date = selected_date.value
                                    setEmployee({ ...employee, ...{ hired_on: date } })
                                }}
                            />
                        </Form.Group>
                    </Segment>
                    <Header>Notes</Header>
                    <Segment>
                        <Tab panes={panes} />
                        <Form.Field>
                            <label>Add document:</label>
                            <Form.Input name="doc_filename" type="file" multiple onChange={HandleFileUpload} />
                        </Form.Field>
                    </Segment>
                    <Button type="submit" icon="save" positive content="Add" onClick={ValidateAndSubmit} />
                </Form>
            </Segment>
        </Container>
    )
}
