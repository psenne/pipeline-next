import React, { useState, useContext } from "react"
import axios from "axios"
import { Form, Input } from "semantic-ui-react"

export default function CommentForm({ candidateID }) {
    const [text, settext] = useState("")
    // const currentuser = useContext(UserContext);

    function AddComment() {
        const comment = {
            text,
            candidate: candidateID,
        }
        console.log({ comment })
        // axios.post("/api/comments", comment)
    }

    return (
        <Form reply>
            <Input
                fluid
                placeholder="Add your comment"
                value={text}
                action={{
                    icon: "add",
                    onClick: () => {
                        AddComment()
                    },
                    disabled: !text,
                }}
                icon="comment"
                iconPosition="left"
                onChange={(ev) => settext(ev.target.value)}
            />
        </Form>
    )
}
