import CandidateSummary from "@components/CandidateComponents/CandidateSummary"

const CandidatesTable = ({ candidates }) => {
    return (
        <>
            {candidates.map((candidate) => (
                <CandidateSummary key={candidate.id} candidate={candidate}></CandidateSummary>
            ))}
        </>
    )
}

export default CandidatesTable
