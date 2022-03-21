import { useAuthQuery } from "@modules/hooks"
import { GETRECENTCOMMENTS } from "@modules/queries"
import { subDays, formatISO } from "date-fns"
import CommentSection from "@components/CommonComponents/CommentSection"

export default function RecentComments() {
    const earliest = formatISO(subDays(new Date(), 14))
    const rescomments = useAuthQuery(GETRECENTCOMMENTS, { cdate: earliest })

    return <CommentSection title="Recent Comments" res={rescomments} />
}
