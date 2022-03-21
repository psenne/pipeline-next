import { ApolloProvider } from "@apollo/client"
import { client } from "@modules/requests"
import { SessionProvider } from "next-auth/react"
import Router from "next/router"
import NProgress from "nprogress"
import AppLayout from "@layouts/AppLayout"
import "../styles/globals.css"
import "nprogress/nprogress.css"
import "semantic-ui-css/semantic.css"

NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => {
    NProgress.start()
}

Router.onRouteChangeComplete = () => {
    NProgress.done()
}

Router.onRouteChangeError = () => {
    NProgress.done()
}

function DefaultLayout({ children }) {
    return <main>{children}</main>
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const Layout = Component.Layout || DefaultLayout
    //const client = ApolloClientCreator()
    return (
        <SessionProvider session={session}>
            <ApolloProvider client={client}>
                <AppLayout>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AppLayout>
            </ApolloProvider>
        </SessionProvider>
    )
}

export default MyApp
