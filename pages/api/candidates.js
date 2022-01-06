import { Get, Post, Put, Delete } from "@modules/requests"

export default function handler(req, res) {
    if (req.method === "POST") {
        const resp = Post("/candidates", req.body)
        return res.status(200).json({ message: "Added candidate", ...resp })
    } else {
        // Handle any other HTTP method
    }
}
