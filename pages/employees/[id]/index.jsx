import { getSession } from "next-auth/react"
import Link from "next/link"
import Head from "next/head"
import { get } from "@modules/requests"
import { GETEMPLOYEEBYID } from "@modules/queries"
import Employee from "@components/EmployeeComponents/Employee"
import EmployeeLayout from "@layouts/EmployeeLayout"
import { Menu, Icon } from "semantic-ui-react"

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

    const id = params.id
    const jwt = session.jwt || null

    const { data, error } = await get({ query: GETEMPLOYEEBYID, variables: { id }, jwt })
    if (error || !data.employee) {
        return { notFound: true }
    }

    if (data) {
        return { props: { employee: data?.employee } }
    }
}

export default function EmployeeDetailPage({ employee }) {
    return (
        <>
            <Head>
                <title>
                    RenX Portal: {employee.firstname} {employee.lastname}
                </title>
            </Head>
            <Menu fluid attached="top" size="huge" borderless className="no-print">
                <Link href={`/employees`}>
                    <Menu.Item as="a">
                        <Icon name="arrow left" />
                    </Menu.Item>
                </Link>
                <Menu.Menu position="right">
                    <Link href={`/employees/${employee.id}/edit`}>
                        <Menu.Item as="a">
                            <Icon name="edit" />
                        </Menu.Item>
                    </Link>
                </Menu.Menu>
            </Menu>
            <Employee employee={employee} />
        </>
    )
}

EmployeeDetailPage.Layout = EmployeeLayout
