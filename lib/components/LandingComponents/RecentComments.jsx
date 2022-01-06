import { getRecentComments } from "@modules/queryhooks"
import CommentSection from "@components/CommonComponents/CommentSection"

export default function RecentComments() {
    const rescomments = getRecentComments(14)

    return <CommentSection title="Recent Comments" res={rescomments} />
}
