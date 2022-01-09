import * as cookie from "cookie"
import * as join from "url-join"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import queries from "./queries.js"

export const serverurl = (path) => join(process.env.NEXT_PUBLIC_DB_URL, path)
const client = new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: createHttpLink({
        uri: join(process.env.NEXT_PUBLIC_DB_URL, "/graphql"),
        credentials: "same-origin",
    }),
})

export async function Get(queryname, variables, cookies) {
    return send({ method: "GET", gqlquery: queries[queryname], variables, cookies })
}

export function Del(path, cookies) {
    return send({ method: "DELETE", path, cookies })
}

export function Post(path, formdata, cookies) {
    return send({ method: "POST", path, formdata, cookies })
}

export function Put(path, formdata, cookies) {
    return send({ method: "PUT", path, formdata, cookies })
}

async function send({ method, gqlquery, variables, cookies }) {
    try {
        const res = await client.query({ query: gqlquery, variables })
        if (res.data) {
            return res
        } else {
            throw new Error("Entry not found.")
        }
    } catch (error) {
        console.log({ error })
        return { data: null, error }
    }
    // let jwt = ""
    // let user = ""
    // try {
    //     jwt = cookie.parse(cookies).jwt || ""
    //     user = JSON.parse(cookie.parse(cookies).user) || ""
    // } catch (e) {
    //     jwt = ""
    //     user = ""
    // }
    // const opts = { method, headers: {} }

    // if (formdata) {
    //     opts.headers["Content-Type"] = "application/json"
    //     formdata["author"] = user.id
    //     opts.body = JSON.stringify(formdata)
    // }

    // if (jwt) {
    //     opts.headers["Authorization"] = `Bearer ${jwt}`
    // }

    // try {
    //     const res = await fetch(join(process.env.NEXT_PUBLIC_DB_URL, path), opts)

    //     if (res.status === 404) {
    //         return { status: res.status, error: "Recipe not found." }
    //     } else if (res.status === 401) {
    //         return { status: res.status, error: "You need to log on first." }
    //     } else if (res.status === 500) {
    //         return { status: res.status, error: "Server error" }
    //     } else if (!res.ok) {
    //         return { status: res.status, error: res.statusText }
    //     } else {
    //         return await res.json()
    //     }
    // } catch (err) {
    //     return { status: 500, error: err.message }
    // }
}
