import * as join from "url-join"
import { request } from "graphql-request"
import useSWR from "swr"
import { subDays } from "date-fns"

export const gqlfetcher = (query, vars) => request(join(process.env.NEXT_PUBLIC_DB_URL, "graphql"), query, vars)

export function getContracts() {
    const { data, error } = useSWR(
        `
            query Contracts {
                contracts{
                    id
                    name
                }
            }
        `,
        gqlfetcher
    )
    return {
        contracts: data?.contracts,
    }
}

export function getManagers() {
    const { data, error } = useSWR(
        `
            query Managers {
                users(where: { role: { id_eq: 3 } }) {
                    id
                    username
                    email
                }
            }
        `,
        gqlfetcher
    )
    return {
        managers: data?.users,
    }
}

export function getRecentSubmissions(num) {
    const { data, error } = useSWR(
        `
            query RecentSubmissions($num: Int) {
                submissions(sort: "created_at:desc", limit: $num) {
                    id
                    position {
                        id
                        title
                        contract {
                            name
                            number
                        }
                    }
                    candidate {
                        id
                        firstname
                        lastname
                    }
                    submitted_by {
                        id
                        username
                    }
                    created_at
                }
            }
        `,
        (query) => gqlfetcher(query, { num: num }),
        { refreshInterval: 10000 }
    )
    return {
        submissions: data?.submissions,
        loading: !error && !data,
        error: error,
    }
}

export function getRecentCandidates(num) {
    const { data, error } = useSWR(
        `
            query RecentComments($num: Int) {
                candidates(sort: "created_at:desc", limit: $num) {
                    id
                    firstname
                    lastname
                    skill
                    authored_by {
                        id
                        username    
                    }
                    created_at
                }
            }
        `,
        (query) => gqlfetcher(query, { num: num }),
        { refreshInterval: 10000 }
    )
    return {
        candidates: data?.candidates,
        loading: !error && !data,
        error: error,
    }
}

export function getRecentComments(daysback) {
    const { data, error } = useSWR(
        `
            query RecentComments($cdate: DateTime) {
                comments(sort: "created_at:desc", where: { created_at_gte: $cdate }) {
                    id
                    text
                    candidate {
                        id
                        firstname
                        lastname
                    }
                    author {
                        username
                        avatar {
                            url
                        }
                    }
                    created_at
                }
            }
        `,
        (query) => gqlfetcher(query, { cdate: subDays(new Date(), daysback) }),
        { refreshInterval: 10000 }
    )
    return {
        comments: data?.comments,
        loading: !error && !data,
        error: error,
    }
}

export function getCommentsByCandidate(candidateID) {
    const { data, error } = useSWR(
        `
            query Comments($candidateID: ID!) {
                comments(sort: "created_at:desc", where: { candidate: { id_eq: $candidateID } }) {
                    id
                    text
                    author {
                        username
                        avatar{
                            url
                        }
                    }
                    created_at
                }
            }
        `,

        (query) => gqlfetcher(query, { candidateID }),
        { refreshInterval: 10000 }
    )
    return {
        comments: data?.comments,
        loading: !error && !data,
        error: error,
    }
}

export function getSubmissionsByCandidate(candidateID) {
    const { data, error } = useSWR(
        `
            query Submissions($candidateID: ID!) {
                submissions(where:{candidate:{id_eq:$candidateID}}) {
                    id
                    position {
                        id
                        title
                        position_id
                        contract {
                            name
                        }
                        title
                    }
                    candidate {
                        id
                        firstname
                        lastname
                    }
                    created_at
                }
            }
        `,

        (query) => gqlfetcher(query, { candidateID }),
        { refreshInterval: 10000 }
    )
    return {
        submissions: data?.submissions,
        loading: !error && !data,
        error: error,
    }
}

export function getPositionSummaries() {
    const { data, error } = useSWR(
        `
            query Positions {
                positions {
                    id
                    position_id
                    level
                    title
                    skill_summary
                    contract {
                        name
                    }
                }
            }
        `,
        gqlfetcher
    )
    return {
        positions: data?.positions,
        loading: !error && !data,
        error: error,
    }
}
export function getFlagsByCandidate(candidateID) {
    const { data, error } = useSWR(
        `
            query Flags($candidateID: ID!) {
                flags(where: { candidate: { id_eq: $candidateID } }) {
                    id
                    created_at
                    flag_note
                    active
                    actioned_to {
                        id
                        username
                    }
                    candidate {
                        firstname
                        lastname
                    }
                    flagged_by {
                        username
                    }
                }
            }
        `,
        (query) => gqlfetcher(query, { candidateID }),
        { refreshInterval: 10000 }
    )
    return {
        flags: data?.flags,
        loading: !error && !data,
        error: error,
    }
}

export function getActiveFlagByCandidate(candidateID, isOpen) {
    const { data, error } = useSWR(
        isOpen
            ? `
            query Flags($candidateID: ID!) {
                flags(where: { candidate: { id_eq: $candidateID }, active: true }) {
                    id
                    created_at
                    flag_note
                    active
                    actioned_to {
                        id
                        username
                    }
                    candidate {
                        firstname
                        lastname
                    }
                    flagged_by {
                        username
                    }
                }
            }
        `
            : null,
        (query) => gqlfetcher(query, { candidateID }),
        { refreshInterval: 10000 }
    )
    return {
        activeflags: data?.flags,
        loading: !error && !data,
        error: error,
    }
}
