import { useRouter } from "next/router"
import { Get } from "@modules/requests"
import Head from "next/head"
import Link from "next/link"
import { Menu, Icon } from "semantic-ui-react"
import CandidateLayout from "@layouts/CandidateLayout"
import CandidateProfile from "@components/CandidateComponents/CandidateProfile"
import FlagMessagePopup from "@components/CommonComponents/FlagMessagePopup"

export async function getServerSideProps({ params }) {
    const candidateID = params.id

    const { data, error } = await Get("GETCANDIDATEBYID", { candidateID })
    if (!data.candidate || error) {
        return { notFound: true }
    } else {
        return { props: { candidate: data.candidate } }
    }
}

export default function CandidateDetailPage({ candidate }) {
    const router = useRouter()

    const GoBack = () => {
        router.back()
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
