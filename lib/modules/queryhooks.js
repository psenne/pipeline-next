// import { GraphQLClient, request } from "graphql-request"
// import useSWR from "swr"
// import { subDays } from "date-fns"

// const endpoint = new URL(`${process.env.NEXT_PUBLIC_DB_URL}/graphql`)
// export function gqlclient(jwt) {
//     const client = new GraphQLClient(endpoint.toString())
//     console.log(jwt)
//     if (jwt) {
//         client.setHeader("Authorization", `Bearer ${jwt}`)
//     }
//     console.log(client)
//     return client
//return request({ url: endpoint, document: query, variables: vars, requestHeaders: headers })
// }

// export function getManagers({ jwt }) {
//     const { data, error } = useSWR(
//         `
//             query Managers {
//                 users(where: { role: { id_eq: 3 } }) {
//                     id
//                     username
//                     email
//                 }
//             }
//         `,
//         (query) => gqlfetcher({ query, jwt })
//     )
//     return {
//         managers: data?.users,
//     }
// }

// export function getRecentSubmissions({ jwt, vars: { num } }) {
//     const { data, error } = useSWR(
//         `
//             query RecentSubmissions($num: Int) {
//                 submissions(sort: "created_at:desc", limit: $num) {
//                     id
//                     position {
//                         id
//                         title
//                         contract {
//                             name
//                             number
//                         }
//                     }
//                     candidate {
//                         id
//                         firstname
//                         lastname
//                     }
//                     submitted_by {
//                         id
//                         username
//                     }
//                     created_at
//                 }
//             }
//         `,
//         (query) => gqlfetcher({ vars: { num }, jwt, query }),
//         { refreshInterval: 10000 }
//     )
//     return {
//         submissions: data?.submissions,
//         loading: !error && !data,
//         error: error,
//     }
// }

// export function getRecentCandidates({ jwt, num }) {
//     const { data, error } = useSWR(
//         `
//             query RecentCandidates($num: Int) {
//                 candidates(sort: "created_at:desc", limit: $num) {
//                     id
//                     firstname
//                     lastname
//                     skill
//                     authored_by {
//                         id
//                         username
//                     }
//                     created_at
//                 }
//             }
//         `,
//         (query) => gqlfetcher({ vars: { num }, jwt, query }),
//         { refreshInterval: 10000 }
//     )
//     return {
//         candidates: data?.candidates,
//         loading: !error && !data,
//         error: error,
//     }
// }

// export function getRecentComments({ daysback, jwt }) {
//     const { data, error } = useSWR(
//         `
//             query RecentComments($cdate: DateTime) {
//                 comments(sort: "created_at:desc", where: { created_at_gte: $cdate }) {
//                     id
//                     text
//                     candidate {
//                         id
//                         firstname
//                         lastname
//                     }
//                     author {
//                         username
//                         avatar {
//                             url
//                         }
//                     }
//                     created_at
//                 }
//             }
//         `,
//         (query) => gqlfetcher({ query, jwt, vars: { cdate: subDays(new Date(), daysback) } }),
//         { refreshInterval: 10000 }
//     )
//     return {
//         comments: data?.comments,
//         loading: !error && !data,
//         error: error,
//     }
// }

// export function getCommentsByCandidate({ candidateID, jwt }) {
//     console.log({ candidateID, jwt })
//     const { data, error } = useSWR(
//         `
//             query Comments($candidateID: ID!) {
//                 comments(sort: "created_at:desc", where: { candidate: { id_eq: $candidateID } }) {
//                     id
//                     text
//                     author {
//                         username
//                         avatar{
//                             url
//                         }
//                     }
//                     created_at
//                 }
//             }
//         `,

//         (query) => gqlfetcher({ query, jwt, vars: { candidateID } }),
//         { refreshInterval: 10000 }
//     )
//     return {
//         comments: data?.comments,
//         loading: !error && !data,
//         error: error,
//     }
// }

// export function getSubmissionsByCandidate({ candidateID, jwt }) {
//     const { data, error } = useSWR(
//         `
//             query Submissions($candidateID: ID!) {
//                 submissions(where:{candidate:{id_eq:$candidateID}}) {
//                     id
//                     position {
//                         id
//                         title
//                         position_id
//                         contract {
//                             name
//                         }
//                         title
//                     }
//                     candidate {
//                         id
//                         firstname
//                         lastname
//                     }
//                     created_at
//                 }
//             }
//         `,

//         (query) => gqlfetcher({ query, jwt, vars: { candidateID } }),
//         { refreshInterval: 10000 }
//     )
//     return {
//         submissions: data?.submissions,
//         loading: !error && !data,
//         error: error,
//     }
// }

// export function getSubmissionsByPosition({ positionID, jwt }) {
//     const { data, error } = useSWR(
//         `
//             query Submissions($positionID: ID!) {
//                 submissions(where:{position:{id_eq:$positionID}}) {
//                     id
//                     position {
//                         id
//                         title
//                         position_id
//                         contract {
//                             name
//                         }
//                         title
//                     }
//                     candidate {
//                         id
//                         firstname
//                         lastname
//                     }
//                     created_at
//                 }
//             }
//         `,

//         (query) => gqlfetcher({ query, jwt, vars: { positionID } }),
//         { refreshInterval: 10000 }
//     )
//     return {
//         submissions: data?.submissions,
//         loading: !error && !data,
//         error: error,
//     }
// }

// export function getPositionSummaries({ jwt }) {
//     const { data, error } = useSWR(
//         `
//             query Positions {
//                 positions {
//                     id
//                     position_id
//                     level
//                     title
//                     skill_summary
//                     contract {
//                         name
//                     }
//                 }
//             }
//         `,
//         (query) => gqlfetcher({ query, jwt })
//     )
//     return {
//         positions: data?.positions,
//         loading: !error && !data,
//         error: error,
//     }
// }
// export function getFlagsByCandidate({ candidateID, jwt }) {
//     const { data, error } = useSWR(
//         `
//             query Flags($candidateID: ID!) {
//                 flags(where: { candidate: { id_eq: $candidateID } }) {
//                     id
//                     created_at
//                     flag_note
//                     active
//                     actioned_to {
//                         id
//                         username
//                     }
//                     candidate {
//                         firstname
//                         lastname
//                     }
//                     flagged_by {
//                         username
//                     }
//                 }
//             }
//         `,
//         (query) => gqlfetcher({ query, jwt, vars: { candidateID } }),
//         { refreshInterval: 10000 }
//     )
//     return {
//         flags: data?.flags,
//         loading: !error && !data,
//         error: error,
//     }
// }

// export function getActiveFlagByCandidate({ jwt, candidateID, isOpen }) {
//     const { data, error } = useSWR(
//         isOpen
//             ? `
//             query Flags($where: JSON) {
//                 flags(where: $where) {
//                     id
//                     created_at
//                     flag_note
//                     active
//                     actioned_to {
//                         id
//                         username
//                     }
//                     candidate {
//                         firstname
//                         lastname
//                     }
//                     flagged_by {
//                         username
//                     }
//                 }
//             }
//         `
//             : null,
//         (query) =>
//             gqlfetcher({
//                 query,
//                 jwt,
//                 vars: {
//                     where: {
//                         candidate: {
//                             id_eq: candidateID,
//                         },
//                         active: true,
//                     },
//                 },
//             }),
//         { refreshInterval: 10000 }
//     )
//     return {
//         activeflags: data?.flags,
//         loading: !error && !data,
//         error: error,
//     }
// }
