import * as join from "url-join"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import queries from "./queries.js"

export const serverurl = (path) => join(process.env.NEXT_PUBLIC_DB_URL, path)

export async function Get(queryname, variables, jwt = null) {
    return send({ method: "GET", gqlquery: queries[queryname], variables, jwt })
}

export function Del(path) {
    return send({ method: "DELETE", path })
}

export function Post(path, formdata) {
    return send({ method: "POST", path, formdata })
}

export function Put(path, formdata) {
    return send({ method: "PUT", path, formdata })
}

async function send({ method, gqlquery, variables, jwt = null }) {
    const headers = jwt ? { authorization: `Bearer ${jwt}` } : null
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        ssrMode: true,
        link: createHttpLink({
            uri: join(process.env.NEXT_PUBLIC_DB_URL, "/graphql"),
            credentials: "same-origin",
            headers,
        }),
    })
    try {
        const res = await client.query({ query: gqlquery, variables })
        if (res.data) {
            return res
        } else {
            throw new Error("Entry not found.")
        }
    } catch (error) {
        console.log(JSON.stringify(error))
        if (error.networkError) {
            console.log(JSON.stringify(error.networkError))
            return { data: null, error: { message: error.networkError.message, status: 500 } }
        }
        if (error.graphQLErrors) {
            console.log(JSON.stringify(error.graphQLErrors))
            return { data: null, error: { message: error.graphQLErrors[0].message, status: 400 } }
        }
        if (error.clientErrors) {
            console.log(JSON.stringify(error.clientErrors))
            return { data: null, error: { message: error.clientErrors[0].message, status: 500 } }
        }

        console.log(error)
        return { data: null, error: { status: 500, message: error } }
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
