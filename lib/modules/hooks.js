import { useQuery } from "@apollo/client"
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
    })
}

export function useAuthMutation() {
    return false
}
