import { useQuery } from "@apollo/client"
import { useSession } from "next-auth/react"

export function useAuthQuery(query, variables) {
    const { data: session, status } = useSession()

    return useQuery(query, {
        variables,
        context: {
            headers: {
                authorization: "Bearer " + session?.jwt,
            },
        },
        skip: status === "loading",
    })
}

export function useAuthMutation() {
    return false
}
