import Link from "next/link"
import { format, parseISO } from "date-fns"
import classnames from "classnames"
import FlagMessagePopup from "@components/CommonComponents/FlagMessagePopup"
import { Icon, Menu, Button } from "semantic-ui-react"

export default function MiniToolbar({ candidateID, isFlagged, archived }) {
    const setArchiveStatusText = archived ? "Unarchive candidate" : "Archive candidate"

    function ArchiveCandidate(ev) {
        ev.stopPropagation()

        let updatedinfo
        if (archived) {
            //remove flag if setting canddiate to archived. Otherwise there's no way to filter the FlaggedCandidates cpnt.
            updatedinfo = {
                archived: true,
                isFlagged: false,
                flagged_by: "",
                flag_note: "",
                flagged_on: "",
                actioned_to: "",
            }
        } else {
            updatedinfo = {
                archived: "current",
            }
        }
        console.log(updatedinfo)
    }

    return (
        <Button.Group attached="top" icon basic widths="10">
            <FlagMessagePopup candidateID={candidateID}>
                <Button title="Add/edit flag">
                    <Icon link name="flag" color={isFlagged ? "red" : "grey"} />
                </Button>
            </FlagMessagePopup>
            <Link href={`/candidates/edit/${candidateID}`} passHref>
                <Button name="edit" title="Edit candidate" className="minitoolbar-edit">
                    <Icon link name="edit" />
                </Button>
            </Link>
            <Button name="archive" className="minitoolbar-archive" title={setArchiveStatusText} onClick={ArchiveCandidate}>
                <Icon link name="archive" />
            </Button>
        </Button.Group>
    )
}
