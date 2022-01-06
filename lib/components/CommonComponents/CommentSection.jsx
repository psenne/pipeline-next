import { Comment, Header, Icon } from "semantic-ui-react"
import CommentLine from "@components/CommonComponents/CommentLine"
import ComponentPlaceholder from "@components/CommonComponents/ComponentPlaceholder"

export default function CommentSection({ title, res, children }) {
    const { comments, loading, error } = res
    let content = ""

    if (loading) {
        content = <ComponentPlaceholder lines="6" />
    }
    if (error) {
        console.error(error)
        content = <p>Error loading comments.</p>
    }
    if (comments) {
        content = comments.length > 0 ? comments.map((comment) => <CommentLine key={comment.id} comment={comment} />) : <p>No comments.</p>
    }

    return (
        <Comment.Group style={{ maxWidth: "none" }}>
            <Header>
                <Icon name="comments" />
                {title}
            </Header>
            {content}
            {children}
        </Comment.Group>
    )
}
