import { getSession } from "next-auth/react"
import { get } from "@modules/requests"
import { GETCONTRACTNAMES, GETALLEMPLOYEES } from "@modules/queries"
import EmployeeLayout from "@layouts/EmployeeLayout"
import EmployeesTable from "@components/EmployeeComponents/EmployeesTable"
import EmployeeToolbar from "@components/EmployeeComponents/EmployeeToolbar"

export async function getServerSideProps({ req, query }) {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        }
    }

    const { searchterm, contract } = query
    const jwt = session.jwt || null

    const { data: rescontracts } = await get({ query: GETCONTRACTNAMES, jwt })

    const allcontracts = rescontracts ? rescontracts.contracts.map((c) => c.name) : []

    const whereclause = {
        where: {
            _or: [
                {
                    firstname_contains: searchterm,
                },
                {
                    lastname_contains: searchterm,
                },
                {
                    title_contains: searchterm,
                },
                {
                    resume_text_contains: searchterm,
                },
                {
                    notes_contains: searchterm,
                },
            ],
            currentcontract: { name_in: contract ? allcontracts.filter((c) => c === contract) : allcontracts },
        },
    }

    const { data, error } = await get({ query: GETALLEMPLOYEES, variables: whereclause, jwt })

    if (error) {
        console.error({ error })
        return { notFound: true }
    }
    if (data) {
        return {
            props: { employees: data.employees },
        }
    }
}

export default function EmployeesPage({ employees }) {
    return (
        <>
            <EmployeeToolbar />
            <EmployeesTable employees={employees} />
        </>
    )
}

EmployeesPage.Layout = EmployeeLayout
