import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import { Get } from "@modules/requests"
import Head from "next/head"
import Link from "next/link"
import Error from "next/error"
import { Menu, Icon } from "semantic-ui-react"
import CandidateLayout from "@layouts/CandidateLayout"
import CandidateProfile from "@components/CandidateComponents/CandidateProfile"
import FlagMessagePopup from "@components/CommonComponents/FlagMessagePopup"

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
    const id = params.id
    const { data, error } = await Get("GETCANDIDATEBYID", { id }, jwt)
    if (error) {
        return { props: { data, error: { status: error.status, message: error.message } } }
    } else if (!data?.candidate) {
        return { notFound: true }
    } else {
        return { props: { candidate: data.candidate } }
    }
}

export default function CandidateDetailPage({ candidate, error }) {
    const router = useRouter()

    const GoBack = () => {
        router.back()
    }

    if (error) {
        return <Error statusCode={error.status} title={error.message} />
    }

    return (
        <>
            <Head>
                <title>
                    RenX Portal: {candidate.firstname} {candidate.lastname}
                </title>
            </Head>
            <Menu fluid attached="top" size="huge" borderless className="no-print">
                <Menu.Item onClick={GoBack}>
                    <Icon name="arrow left" />
                </Menu.Item>
                <Menu.Menu position="right">
                    <FlagMessagePopup candidateID={candidate.id}>
                        <Menu.Item as="a" title="Set follow up flag">
                            <Icon name="flag" color="red" />
                        </Menu.Item>
                    </FlagMessagePopup>
                    <Link href={`/candidates/${candidate.id}/edit`}>
                        <Menu.Item as="a">
                            <Icon name="edit" />
                        </Menu.Item>
                    </Link>
                </Menu.Menu>
            </Menu>
            <CandidateProfile candidate={candidate} />
        </>
    )
}

CandidateDetailPage.Layout = CandidateLayout
