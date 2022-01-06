import { Get } from "@modules/requests"
import PositionLayout from "@layouts/PositionLayout"
import PositionsTable from "@components/PositionComponents/PositionsTable"

export async function getServerSideProps() {
    const { data } = await Get("GETALLPOSITIONS")
    return {
        props: { positions: data?.positions },
    }
}

function PositionsPage({ positions }) {
    if (!positions) {
        return null
    }
    return <PositionsTable positions={positions} />
}

PositionsPage.Layout = PositionLayout

export default PositionsPage
