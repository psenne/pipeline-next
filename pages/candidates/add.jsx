import { getSession } from "next-auth/react"
import AddCandidateForm from "@components/CandidateComponents/AddCandidateForm"
import CandidateLayout from "@layouts/CandidateLayout"

export async function getServerSideProps({ req }) {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}

export default function AddCandidatePage() {
    return <AddCandidateForm />
}

AddCandidatePage.Layout = CandidateLayout
