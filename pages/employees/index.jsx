import { Get } from "@modules/requests"
import EmployeeLayout from "@layouts/EmployeeLayout"
import EmployeesTable from "@components/EmployeeComponents/EmployeesTable"
import EmployeeToolbar from "@components/EmployeeComponents/EmployeeToolbar"

export async function getServerSideProps({ query }) {
    const { searchterm, contract } = query

    const {
        data: { contracts },
    } = await Get("GETCONTRACTNAMES")
    const allcontracts = contracts.map((c) => c.name)
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

    const { data, error } = await Get("GETALLEMPLOYEES", whereclause)

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
