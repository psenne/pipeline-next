import Link from "next/link"
import Head from "next/head"
import { Get } from "@modules/requests"
import Employee from "@components/EmployeeComponents/Employee"
import EmployeeLayout from "@layouts/EmployeeLayout"
import { Menu, Icon } from "semantic-ui-react"

export async function getServerSideProps({ params }) {
    const id = params.id

    const { data, error } = await Get("GETEMPLOYEEBYID", { id })
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
