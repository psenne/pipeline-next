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

function MyApp({ Component, pageProps }) {
    const Layout = Component.Layout || DefaultLayout

    return (
        <AppLayout>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppLayout>
    )
}

export default MyApp
