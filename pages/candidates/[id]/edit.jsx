import { useRouter } from "next/router"
import { getSession } from "next-auth/react"

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

export default function EditCandidate() {
    const router = useRouter()
    const { id } = router.query
    return "Editing candidate " + id
}
