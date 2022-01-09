import { useRouter } from "next/router"
import { Get } from "@modules/requests"
import CandidatesTable from "@components/CandidateComponents/CandidatesTable"
import CandidateLayout from "@layouts/CandidateLayout"
import CandidateToolbar from "@components/CandidateComponents/CandidateToolbar"
import { Pagination } from "semantic-ui-react"
import statuses from "@constants/statuses"

export async function getServerSideProps({ query }) {
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

    const { data, error } = await Get("GETALLCANDIDATES", queryobj)
    if (error) {
        console.error({ error })
        return { notFound: true }
    }
    if (data) {
        candidates = data.candidates
        const {
            data: { candidatesConnection },
        } = await Get("COUNTFILTEREDCANDIDATES", whereclause)

        if (candidatesConnection) {
            numcandidates = candidatesConnection?.aggregate?.count
        }
        return {
            props: { candidates, candidatesperpage, page, numcandidates },
        }
    }
}

export default function CandidatesPage({ candidates, candidatesperpage, page, numcandidates }) {
    const router = useRouter()
    const url = router.pathname
    const queryobj = router.query
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
