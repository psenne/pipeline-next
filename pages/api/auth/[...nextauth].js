import NextAuth from "next-auth"
// import Auth0Provider from "next-auth/providers/auth0"
import AzureADProvider from "next-auth/providers/azure-ad"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        // Auth0Provider({
        //     clientId: process.env.AUTH0_CLIENT_ID,
        //     clientSecret: process.env.AUTH0_CLIENT_SECRET,
        //     issuer: process.env.AUTH0_ISSUER,
        // }),
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.jwt = token.jwt
            session.userid = token.id
            session.username = token.user.name
            session.useravatar = token.user.image

            return session
        },
        async jwt({ token, user, account }) {
            if (account) {
                if (account.provider === "azure-ad") {
                    account.provider = "microsoft"
                }
                const url = new URL(`${process.env.NEXT_PUBLIC_DB_URL}/auth/${account.provider}/callback`)
                url.searchParams.set("access_token", account.access_token)
                const res = await fetch(url.toString())
                const data = await res.json()

                token.user = {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
                token.jwt = data.jwt
                token.id = data.user.id
            }
            return token
        },
        async signIn({ account }) {
            if (account.provider === "azure-ad") {
                account.provider = "microsoft"
            }
            const url = new URL(`${process.env.NEXT_PUBLIC_DB_URL}/auth/${account.provider}/callback`)
            url.searchParams.set("access_token", account.access_token)
            const res = await fetch(url.toString())
            const data = await res.json()

            if (res.status !== 200) {
                throw new Error(data.message[0]?.messages[0]?.id)
            } else {
                return true
            }
        },
    },
    debug: false,
    // pages: {
    //     // signIn: "/login",
    //     // signOut: "/logout",
    // },
    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "#990000", // Hex color code
        logo: "/images/RenegadeLogo_transparent.png", // Absolute URL to image
    },
})
