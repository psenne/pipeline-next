import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { get } from "@modules/requests"
import { GETCONTRACTNAMES, GETALLPOSITIONS, COUNTFILTEREDPOSITIONS } from "@modules/queries"
import PositionLayout from "@layouts/PositionLayout"
import PositionsTable from "@components/PositionComponents/PositionsTable"
import PositionsToolbar from "@components/PositionComponents/PositionsToolbar"
import { Pagination } from "semantic-ui-react"

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

    const jwt = session.jwt || null

    const { searchterm, page = 1, contract } = query
    const positionsperpage = 5
    let numpositions = 0

    const { data: rescontracts } = await get({ query: GETCONTRACTNAMES, jwt })

    const allcontracts = rescontracts ? rescontracts.contracts.map((c) => c.name) : []
    const whereclause = {
        where: {
            _or: [
                {
                    location_contains: searchterm,
                },
                {
                    title_contains: searchterm,
                },
                {
                    description_contains: searchterm,
                },
                {
                    skill_summary_contains: searchterm,
                },
                {
                    level_contains: searchterm,
                },
            ],
            contract: { name_in: contract ? allcontracts.filter((c) => c === contract) : allcontracts },
        },
    }

    const queryobj = {
        ...whereclause,
        limit: positionsperpage,
        start: (page - 1) * positionsperpage,
    }

    const { data, error } = await get({ query: GETALLPOSITIONS, variables: queryobj, jwt })
    if (error) {
        console.error({ error })
        return { notFound: true }
    }
    if (data) {
        const {
            data: { positionsConnection },
        } = await get({ query: COUNTFILTEREDPOSITIONS, variables: whereclause, jwt })

        if (positionsConnection) {
            numpositions = positionsConnection?.aggregate?.count
        }
        return {
            props: { positions: data.positions, positionsperpage, page, numpositions },
        }
    }
}

function PositionsPage({ positions, positionsperpage, page, numpositions }) {
    const router = useRouter()
    const url = router.pathname
    const queryobj = router.query

    return (
        <>
            <PositionsToolbar />
            <PositionsTable positions={positions} />
            {numpositions > positionsperpage && (
                <div className="pages">
                    <Pagination
                        activePage={page}
                        // ellipsisItem={false}
                        totalPages={Math.ceil(numpositions / positionsperpage)}
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

PositionsPage.Layout = PositionLayout

export default PositionsPage
