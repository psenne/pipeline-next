import { gql } from "@apollo/client"

///////////// CANDIDATE PAGE ////////////////

export const COUNTFILTEREDCANDIDATES = gql`
    query CandidatesConnection($where: JSON) {
        candidatesConnection(where: $where) {
            aggregate {
                count
            }
        }
    }
`

export const GETALLCANDIDATES = gql`
    query Candidates($where: JSON, $limit: Int, $start: Int) {
        candidates(where: $where, limit: $limit, start: $start, sort: "created_at:desc") {
            id
            firstname
            lastname
            status
            current_contract
            current_company
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

export const ADDCANDIDATE = gql`
    mutation AddCandidate($input: createCandidateInput!) {
        createCandidate(input: $input) {
            candidate {
                id
                firstname
                lastname
            }
        }
    }
`

export const DELETECANDIDATE = gql`
    mutation DeleteCandidate($input: deleteCandidateInput) {
        deleteCandidate(input: $input) {
            candidate {
                id
            }
        }
    }
`

export const GETCANDIDATEBYID = gql`
    query Candidate($id: ID!) {
        candidate(id: $id) {
            id
            firstname
            lastname
            emailaddress
            telephone
            status
            current_contract
            current_company
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

export const GETFLAGSBYCANDIDATE = gql`
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
`

export const GETACTIVEFLAGBYCANDIDATE = gql`
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

///////////// POSITION PAGE ////////////////

export const COUNTFILTEREDPOSITIONS = gql`
    query PositionsConnection($where: JSON) {
        positionsConnection(where: $where) {
            aggregate {
                count
            }
        }
    }
`

export const GETPOSITIONSUMMARIES = gql`
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
`

export const GETALLPOSITIONS = gql`
    query Positions($where: JSON, $limit: Int, $start: Int) {
        positions(where: $where, limit: $limit, start: $start) {
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
            submissions {
                candidate {
                    id
                    firstname
                    lastname
                }
            }
            created_at
        }
    }
`

export const GETPOSITIONSBYID = gql`
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
            submissions {
                candidate {
                    id
                    firstname
                    lastname
                }
            }
            created_at
        }
    }
`

export const ADDPOSITION = gql`
    mutation AddPosition($input: createPositionInput!) {
        createPosition(input: $input) {
            position {
                id
            }
        }
    }
`

///////////// EMPLOYEE PAGE ////////////////

export const GETALLEMPLOYEES = gql`
    query Employees($where: JSON) {
        employees(sort: "lastname:desc", where: $where) {
            id
            firstname
            lastname
            emailaddress
            telephone
            found_by
            level
            title
            salary
            resume_text
            hired_on
            birthday
            at_risk
            notes
            contract {
                id
                name
                updated_at
            }
        }
    }
`

export const GETEMPLOYEEBYID = gql`
    query Employee($id: ID!) {
        employee(id: $id) {
            id
            firstname
            lastname
            emailaddress
            telephone
            found_by
            level
            title
            salary
            resume_text
            hired_on
            birthday
            at_risk
            notes
            contract {
                id
                name
                updated_at
            }
        }
    }
`

export const GETATRISKEMPLOYEES = gql`
    query AtRiskEmployees {
        employees(where: { at_risk: true }) {
            id
            firstname
            lastname
            contract {
                name
                number
            }
            hired_on
        }
    }
`

export const ADDEMPLOYEE = gql`
    mutation AddEmployee($input: createEmployeeInput!) {
        createEmployee(input: $input) {
            employee {
                id
                firstname
                lastname
            }
        }
    }
`

///////////// LANDING PAGE //////////////////

export const GETEMPLOYEESTATS = gql`
    query EmployeeStats {
        employees {
            id
            contract {
                name
            }
        }
    }
`

export const GETSUBMISSIONSTATS = gql`
    query SubmissionStats {
        submissions {
            id
            position {
                contract {
                    name
                }
            }
        }
    }
`

export const GETRECENTPOSITIONS = gql`
    query RecentPositions($num: Int) {
        positions(sort: "created_at:desc", limit: $num) {
            id
            title
            contract {
                name
                number
            }
            authored_by {
                id
                fullname
            }
            created_at
        }
    }
`

export const GETRECENTSUBMISSIONS = gql`
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
`

export const GETRECENTCOMMENTS = gql`
    query RecentComments($cdate: DateTime) {
        comments(sort: "created_at:desc", where: { created_at_gte: $cdate }) {
            id
            created_at
            text
            author {
                username
                avatar {
                    url
                }
            }
            candidate {
                id
                firstname
                lastname
            }
        }
    }
`

export const GETRECENTCANDIDATES = gql`
    query RecentCandidates($num: Int) {
        candidates(sort: "created_at:desc", limit: $num) {
            id
            firstname
            lastname
            skill
            authored_by {
                id
                username
                fullname
            }
            created_at
        }
    }
`

export const GETALLACTIVEFLAGS = gql`
    query GetAllActiveFlags {
        flags(where: { active: true }) {
            id
            candidate {
                id
                firstname
                lastname
            }
            flag_note
            flagged_by {
                username
            }
            actioned_to {
                username
            }
            created_at
        }
    }
`

///////////// DROPDOWNS //////////////////

export const GETCONTRACTNAMES = gql`
    query Contracts {
        contracts {
            name
        }
    }
`

export const GETALLCONTRACTS = gql`
    query Contracts {
        contracts(sort: "name") {
            id
            name
            employees {
                id
                firstname
                lastname
            }
            positions {
                id
                title
            }
        }
    }
`

export const GETMANAGERS = gql`
    query Managers {
        users(where: { role: { id_eq: 3 } }) {
            id
            username
            email
        }
    }
`

export const GETSUBMISSIONSBYCANDIDATE = gql`
    query Submissions($candidateID: ID!) {
        submissions(where: { candidate: { id_eq: $candidateID } }) {
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
`

export const GETSUBMISSIONSBYPOSITION = gql`
    query Submissions($positionID: ID!) {
        submissions(where: { position: { id_eq: $positionID } }) {
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
`

export const GETCOMMENTSBYCANDIDATE = gql`
    query Comments($candidateID: ID!) {
        comments(sort: "created_at:desc", where: { candidate: { id_eq: $candidateID } }) {
            id
            text
            author {
                username
                avatar {
                    url
                }
            }
            created_at
        }
    }
`

export const GETSTATUSES = gql`
    query GetStatuses {
        candidatesConnection(where: { archived: false }) {
            aggregate {
                count
            }
            groupBy {
                status {
                    key
                    connection {
                        aggregate {
                            count
                        }
                    }
                }
            }
        }
    }
`
