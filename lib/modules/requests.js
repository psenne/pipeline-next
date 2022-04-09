import * as join from "url-join"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

export const serverurl = (path) => join(process.env.NEXT_PUBLIC_DB_URL, path)

const httplink = createHttpLink({
    uri: join(process.env.NEXT_PUBLIC_DB_URL, "/graphql"),
    credentials: "include",
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: httplink,
})

export async function get({ query, variables = null, jwt = null }) {
    const headers = jwt ? { authorization: `Bearer ${jwt}` } : null
    try {
        const res = await client.query({
            query,
            variables,
            context: {
                headers,
            },
        })
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
}

export async function post({ mutation, variables = null, jwt = null }) {
    const headers = jwt ? { authorization: `Bearer ${jwt}` } : null

    try {
        const res = await client.mutate({
            mutation,
            variables,
            context: {
                headers,
            },
        })
        if (res.data) {
            return res
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
}
