import AppHeader from "@components/AppHeader"

export default function AppLayout({ children }) {
    return (
        <>
            <AppHeader />
            {children}
        </>
    )
}
