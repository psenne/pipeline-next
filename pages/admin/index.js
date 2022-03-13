import Link from "next/link"
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

export default function Admin() {
    return (
        <p>
            This page isn't created yet.
            <Link href="/">
                <a>Go Home</a>
            </Link>
        </p>
    )
}
