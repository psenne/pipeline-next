import { useState, useEffect } from "react"
import { getActiveFlagByCandidate } from "@modules/queryhooks"
import { Modal, Header, Icon, Button, Form } from "semantic-ui-react"
import ManagerDropdown from "@components/CommonComponents/ManagerDropdown"

export default function FlagMessagePopup({ candidateID, children }) {
    const [isediting, setediting] = useState(false)
    const [isopen, setOpen] = useState(false)
    const { activeflags } = getActiveFlagByCandidate(candidateID, isopen)
    const [flag_note, setflag_note] = useState("")
    const [actioned_to, setactioned_to] = useState([])

    useEffect(() => {
        if (activeflags && activeflags.length > 0) {
            setflag_note(activeflags[0].flag_note)
            setactioned_to(activeflags[0].actioned_to?.map((m) => m.id))
        } else {
            setflag_note("")
            setactioned_to([])
        }
    }, [activeflags])

    function updateText(ev) {
        setflag_note(ev.currentTarget.value)
        setediting(true)
    }

    function updateAction(managers) {
        setactioned_to(managers)
        setediting(true)
    }

    function addFlagMessage(ev, flag_note, currentuser) {
        return false
    }

    function AddNote(ev) {
        console.log({ flag_note, actioned_to })
        setOpen(false)
    }

    function RemoveNote(ev) {
        console.log("removing note")
        setOpen(false)
    }

    return (
        <Modal closeIcon dimmer="blurring" size="small" trigger={children} open={isopen} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} onClick={(ev) => ev.stopPropagation()}>
            <Header icon="flag" color="red" content="Flag for follow up" />
            <Modal.Content>
                <Form>
                    <Form.Field required>
                        <label>Action for:</label>
                        <ManagerDropdown name="actioned_to" fluid multiple value={actioned_to} onChange={updateAction} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Note:</label>
                        <Form.TextArea name="flag_note" value={flag_note} onChange={updateText} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                {!isediting && activeflags?.length === 0 && (
                    <Button color="green" onClick={AddNote}>
                        <Icon name="checkmark" /> Add Note
                    </Button>
                )}
                {!isediting && activeflags?.length > 0 && (
                    <Button color="red" onClick={RemoveNote}>
                        <Icon name="delete" /> Remove Note
                    </Button>
                )}
                {isediting && (
                    <Button color="green" onClick={AddNote}>
                        <Icon name="edit" /> Edit Note
                    </Button>
                )}
            </Modal.Actions>
        </Modal>
    )
}
