import { serialize } from "cookie"

export default async function handler(req, res) {
    const access_token = req.query.access_token
    const url = `http://localhost:1337/auth/auth0/callback?access_token=${access_token}`
    const resp = await fetch(url)
    const respjson = await resp.json()

    if (respjson.statusCode > 400) {
        console.log("unauthorized")
        res.status(respjson.statusCode).json({ resp, respjson })
    } else {
        const user = {
            id: respjson.user?.id || 0,
            username: respjson.user?.username || "",
            email: respjson.user?.email || "",
        }

        const jwtcookie = serialize("jwt", respjson.jwt, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        })
        const usercookie = serialize("user", JSON.stringify(user), { httpOnly: true, path: "/" })

        try {
            res.setHeader("Set-Cookie", [jwtcookie, usercookie])
            res.redirect("/logout")
        } catch (err) {
            console.log(err)
        }
    }
}
