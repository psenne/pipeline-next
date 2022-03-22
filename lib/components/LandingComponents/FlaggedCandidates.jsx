import { useAuthQuery } from "@modules/hooks"
import { GETALLACTIVEFLAGS } from "@modules/queries"
import ComponentPlaceholder from "@components/CommonComponents/ComponentPlaceholder"
import Flag from "@components/LandingComponents/Flag"
import { Card, Header, Icon } from "semantic-ui-react"

export default function FlaggedCandidates() {
    const { data, loading, error } = useAuthQuery(GETALLACTIVEFLAGS)

    if (loading) {
        return <ComponentPlaceholder lines="5" />
    }

    if (error) {
        console.error(error)
        return <p>[Error loading positions]</p>
    }

    if (!data) {
        return false
    }

    if (data.flags) {
        const { flags } = data
        return (
            <div>
                <Header>
                    <Icon name="flag" />
                    Flagged candidates
                </Header>
                <Card.Group>
                    {flags.map((flag) => (
                        <Flag key={flag.id} flag={flag} />
                    ))}
                </Card.Group>
            </div>
        )
    }
}
