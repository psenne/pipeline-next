import { useState } from "react"
import Head from "next/head"
import axios from "axios"
import tmplPosition from "@constants/positionInfo"
import ContractDropdown from "@components/CommonComponents/ContractDropdown"
import { Form, Segment, Button, Header, Message } from "semantic-ui-react"

export default function AddPositionForm() {
    const [position, setposition] = useState({ ...tmplPosition })
    const [formError, setformError] = useState(false)

    const HandleTextInput = (ev) => {
        const name = ev.target.name
        const value = ev.target.value
        updatePositionInfo(name, value)
    }

    const HandleContractInput = (value) => {
        updatePositionInfo("contract", value)
    }

    const updatePositionInfo = (name, value) => {
        let newval = {}
        newval[name] = value
        setposition({ ...position, ...newval })
    }

    const AddNewPosition = () => {
        if (position.title && position.contract) {
            console.log({ position })
        } else {
            setformError(true)
        }
    }

    return (
        <>
            <Head>
                <title>RenX Portal: Add Position</title>
            </Head>
            <Segment>
                <Form>
                    <Header>Position Information</Header>
                    <Form.Group widths="equal">
                        <Form.Input name="title" type="text" required label="Title" onChange={HandleTextInput} value={position.title} />
                        <Form.Input name="level" type="text" label="Level" onChange={HandleTextInput} value={position.level} />
                        <Form.Input name="location" type="text" label="Location" onChange={HandleTextInput} value={position.location} />
                    </Form.Group>
                    <Form.TextArea style={{ minHeight: 200 }} name="skill_summary" label="Skill Summary" onChange={HandleTextInput} value={position.skill_summary} />
                    <Form.TextArea style={{ minHeight: 200 }} name="description" label="Description" onChange={HandleTextInput} value={position.description} />
                    <Header>Contract Information</Header>
                    <Form.Group widths="equal">
                        <Form.Input name="position_id" type="text" label="Position ID" placeholder="Position ID" onChange={HandleTextInput} value={position.position_id} />
                        <div className="field">
                            <label>Contract</label>
                            <ContractDropdown required selection onChange={HandleContractInput} value={position.contract} />
                        </div>
                    </Form.Group>
                </Form>
            </Segment>
            <Segment>
                {formError && <Message error floating compact icon="warning" header="Required fields missing" content="Title and contract are both required." />}
                <Button type="submit" icon="save" positive content="Add" onClick={AddNewPosition} />
            </Segment>
        </>
    )
}
