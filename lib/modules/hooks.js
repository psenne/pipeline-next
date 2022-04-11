import { useQuery, useMutation } from "@apollo/client"
import { useSession } from "next-auth/react"

export function useAuthQuery(query, variables = null, skip = false) {
    const { data: session, status } = useSession()
    return useQuery(query, {
        variables,
        context: {
            headers: {
                authorization: "Bearer " + session?.jwt,
            },
        },
        skip: status === "loading" || skip,
        pollInterval: 3000,
    })
}

export function useAuthMutation(mutation, { ...rest }) {
    const { data: session, status } = useSession()
    return useMutation(mutation, {
        context: {
            headers: {
                authorization: "Bearer " + session?.jwt,
            },
        },
        skip: status === "loading",
        ...rest,
    })
}
