import { useState } from "react"
import { useAuthQuery } from "@modules/hooks"
import { GETFLAGSBYCANDIDATE } from "@modules/queries"
import { Icon, Message, Accordion } from "semantic-ui-react"
import { format } from "date-fns"
import FlagMessagePopup from "@components/CommonComponents/FlagMessagePopup"

export default function FlagMessage({ candidateID }) {
    const [historyOpen, setHistoryOpen] = useState(false)
    const { data } = useAuthQuery(GETFLAGSBYCANDIDATE, { candidateID })

    const toggleHistory = (ev) => {
        ev.stopPropagation()
        setHistoryOpen(!historyOpen)
    }
    if (!data || data?.flags.length === 0) {
        return null
    }

    const active = data.flags.filter((flag) => flag.active)
    const inactive = data.flags.filter((flag) => !flag.active)

    return (
        <div style={{ width: "100%", cursor: "pointer" }} title="Edit flag">
            <FlagMessagePopup candidateID={candidateID}>
                <Message icon>
                    <Icon name="flag" color="red" />
                    <Message.Content>
                        {active.map((flag) => {
                            const action = flag.actioned_to.length > 0 ? <Message.Header>Actioned to: {flag.actioned_to.map((mgr) => mgr.username).join(", ")}</Message.Header> : ""
                            return (
                                <div key={flag.id}>
                                    {action}
                                    <div>{flag.flag_note}</div>
                                    <div style={{ color: "#808080" }}>
                                        Added by {flag.flagged_by.username} on {flag.flagged_on} {format(new Date(flag.created_at), "MMM d, yyyy")}
                                    </div>
                                </div>
                            )
                        })}
                        {inactive.length > 0 && (
                            <Accordion>
                                <Accordion.Title active={historyOpen} index={0} onClick={toggleHistory}>
                                    <Icon name="dropdown" />
                                    Flag history
                                </Accordion.Title>
                                <Accordion.Content active={historyOpen}>
                                    {inactive.map((flag) => {
                                        const action = flag.actioned_to.length > 0 ? <Message.Header>Actioned to: {flag.actioned_to.map((mgr) => mgr.name).join(", ")}</Message.Header> : ""
                                        return (
                                            <Message key={flag.id}>
                                                <Message.Content>
                                                    {action}
                                                    <div>{flag.flag_note}</div>
                                                    <div style={{ color: "#808080" }}>
                                                        Added by {flag.flagged_by.username} on {flag.flagged_on} {format(new Date(flag.created_at), "MMM d, yyyy")}
                                                    </div>
                                                </Message.Content>
                                            </Message>
                                        )
                                    })}
                                </Accordion.Content>
                            </Accordion>
                        )}
                    </Message.Content>
                </Message>
            </FlagMessagePopup>
        </div>
    )
}
