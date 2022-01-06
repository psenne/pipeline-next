import { gql } from "@apollo/client"

const COUNTFILTEREDCANDIDATES = gql`
    query CandidatesConnection($where: JSON) {
        candidatesConnection(where: $where) {
            aggregate {
                count
            }
        }
    }
`

const GETALLCANDIDATES = gql`
    query Candidates($where: JSON, $limit: Int, $start: Int) {
        candidates(where: $where, limit: $limit, start: $start) {
            id
            firstname
            lastname
            status
            current_contract
            current_company
            title
            skill
            level
            notes
            potential_contracts {
                name
            }
            comments(sort: "created_at:desc") {
                created_at
                text
                author {
                    username
                }
            }
            submissions {
                id
                position {
                    id
                    title
                    contract {
                        name
                    }
                }
            }
            flags {
                id
                active
            }
            archived
            created_at
            updated_at
        }
    }
`

const GETCANDIDATEBYID = gql`
    query Candidate($candidateID: ID!) {
        candidate(id: $candidateID) {
            id
            firstname
            lastname
            emailaddress
            telephone
            status
            current_contract
            current_company
            title
            found_by
            interview_date
            interviewed_by {
                username
            }
            level
            loi_sent_date
            loi_sent_by {
                username
            }
            prefered_location
            notes
            flags {
                id
                active
            }
            potential_contracts {
                name
            }
            prefered_location
            skill
            salary
            archived
            resume_text
            created_at
        }
    }
`

const GETALLPOSITIONS = gql`
    query Positions {
        positions {
            id
            position_id
            level
            title
            skill_summary
            description
            location
            contract {
                name
            }
            created_at
        }
    }
`

const GETPOSITIONSBYID = gql`
    query Positions($id: ID!) {
        position(id: $id) {
            id
            position_id
            level
            title
            skill_summary
            description
            location
            contract {
                name
            }
            created_at
        }
    }
`

const queries = {}
queries["COUNTFILTEREDCANDIDATES"] = COUNTFILTEREDCANDIDATES
queries["GETALLCANDIDATES"] = GETALLCANDIDATES
queries["GETCANDIDATEBYID"] = GETCANDIDATEBYID
queries["GETALLPOSITIONS"] = GETALLPOSITIONS
queries["GETPOSITIONSBYID"] = GETPOSITIONSBYID

export default queries
