import PositionSummary from "@components/PositionComponents/PositionSummary"

export default function PositionsTable({ positions }) {
    return (
        <>
            {positions.map((position) => (
                <PositionSummary key={position.id} position={position} />
            ))}
        </>
    )
}
