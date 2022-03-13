import { getSession } from "next-auth/react"
import AddPositionForm from "@components/PositionComponents/AddPositionForm"
import PositionLayout from "@layouts/PositionLayout"

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

export default function AddPositionPage() {
    return <AddPositionForm />
}

AddPositionPage.Layout = PositionLayout
