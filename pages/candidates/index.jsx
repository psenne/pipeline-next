import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { get } from "@modules/requests"
import { GETALLCANDIDATES, COUNTFILTEREDCANDIDATES } from "@modules/queries"
import Error from "next/error"
import CandidatesTable from "@components/CandidateComponents/CandidatesTable"
import CandidateLayout from "@layouts/CandidateLayout"
import CandidateToolbar from "@components/CandidateComponents/CandidateToolbar"
import { Pagination } from "semantic-ui-react"
import statuses from "@constants/statuses"

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
    const jwt = session.jwt
    const { searchterm, status, page = 1 } = query
    const candidatesperpage = 5
    let candidates = []
    let numcandidates = 0
    const allstatuses = statuses.map((s) => s.name)
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
                    level_contains: searchterm,
                },
                {
                    skill_contains: searchterm,
                },
                {
                    prefered_location_contains: searchterm,
                },
                {
                    notes_contains: searchterm,
                },
                {
                    resume_text_contains: searchterm,
                },
            ],
            status_in: status ? allstatuses.filter((s) => s === status) : allstatuses,
        },
    }
    const queryobj = {
        ...whereclause,
        limit: candidatesperpage,
        start: (page - 1) * candidatesperpage,
    }

    const { data, error } = await get({ query: GETALLCANDIDATES, variables: queryobj, jwt })

    if (error) {
        return { props: { data, error: { status: error.status, message: error.message } } }
    } else if (!data.candidates) {
        return { notFound: true }
    } else {
        candidates = data.candidates
        const {
            data: { candidatesConnection },
        } = await get({ query: COUNTFILTEREDCANDIDATES, variables: whereclause, jwt })

        if (candidatesConnection) {
            numcandidates = candidatesConnection?.aggregate?.count
        }
        return {
            props: { candidates, candidatesperpage, page, numcandidates },
        }
    }
}

export default function CandidatesPage({ candidates = [], candidatesperpage, page, numcandidates, error }) {
    const router = useRouter()
    const url = router.pathname
    const queryobj = router.query

    if (error) {
        console.error(error)
        return <Error statusCode={error.status} title={error.message} />
    }

    return (
        <>
            <CandidateToolbar />
            <CandidatesTable candidates={candidates} />
            {numcandidates > candidatesperpage && (
                <div className="pages">
                    <Pagination
                        activePage={page}
                        // ellipsisItem={false}
                        totalPages={Math.ceil(numcandidates / candidatesperpage)}
                        onPageChange={(ev, { activePage }) => {
                            router.push({
                                pathname: url,
                                query: { ...queryobj, page: activePage },
                            })
                        }}
                    />
                </div>
            )}
        </>
    )
}

CandidatesPage.Layout = CandidateLayout
