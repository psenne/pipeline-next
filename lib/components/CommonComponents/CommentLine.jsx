import React from "react"
import { formatDistance } from "date-fns"
import { Comment } from "semantic-ui-react"
import Markdown from "markdown-to-jsx"
import { serverurl } from "@modules/requests"
import Link from "next/link"

function CommentLine({ comment }) {
    const comment_date = comment.created_at ? formatDistance(new Date(comment.created_at), new Date(), { addSuffix: true }) : ""
    return (
        <Comment>
            <Comment.Avatar src={serverurl(comment.author.avatar.url) || ""} />
            <Comment.Content>
                <Comment.Author>
                    {comment.author.username}{" "}
                    {comment.candidate && (
                        <>
                            commented on{" "}
                            <Link href={`/candidates/${comment.candidate.id}`}>
                                <a>
                                    {comment.candidate.firstname} {comment.candidate.lastname}
                                </a>
                            </Link>
                        </>
                    )}
                </Comment.Author>
                <Comment.Text>
                    <Markdown>{comment.text || ""}</Markdown>
                </Comment.Text>
                <Comment.Metadata>
                    <div>{comment_date}</div>
                </Comment.Metadata>
            </Comment.Content>
        </Comment>
    )
}

export default CommentLine
