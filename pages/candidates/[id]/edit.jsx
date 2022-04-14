import { get } from "@modules/requests"
import { GETCANDIDATEBYID } from "@modules/queries"
import { getSession } from "next-auth/react"
import { tmplCandidate } from "@constants/candidateInfo"
import EditCandidateForm from "@components/CandidateComponents/EditCandidateForm"
import CandidateLayout from "@layouts/CandidateLayout"

export async function getServerSideProps({ req, params }) {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        }
    }

    const jwt = session.jwt
    const userid = session.userid
    const id = params.id

    const { data, error } = await get({ query: GETCANDIDATEBYID, variables: { id }, jwt })

    if (error) {
        return { props: { data, error: { status: error.status, message: error.message } } }
    } else if (!data?.candidate) {
        return { notFound: true }
    } else {
        const candidate = {
            ...data.candidate,
            modified_by: userid,
            potential_contracts: data.candidate.potential_contracts.map((c) => c.id),
            interviewed_by: data.candidate.interviewed_by.map((m) => m.id),
        }

        delete candidate.__typename
        delete candidate.id
        delete candidate.flags
        return { props: { candidate, id } }
    }
}

export default function EditCandidatePage({ candidate, id }) {
    return <EditCandidateForm candidateinfo={candidate} id={id} />
}

EditCandidatePage.Layout = CandidateLayout
