import { getSession } from "next-auth/react"
import AddEmployeeForm from "@components/EmployeeComponents/AddEmployeeForm"
import EmployeeLayout from "@layouts/EmployeeLayout"

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

export default function AddEmployeePage() {
    return <AddEmployeeForm />
}

AddEmployeePage.Layout = EmployeeLayout
