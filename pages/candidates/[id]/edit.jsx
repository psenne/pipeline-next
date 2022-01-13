import { useRouter } from "next/router"

export default function EditCandidate() {
    const router = useRouter()
    const { id } = router.query
    return "Editing candidate " + id
}
