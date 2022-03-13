import NextAuth from "next-auth"
// import Auth0Provider from "next-auth/providers/auth0"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        // Auth0Provider({
        //     clientId: process.env.AUTH0_CLIENT_ID,
        //     clientSecret: process.env.AUTH0_CLIENT_SECRET,
        //     issuer: process.env.AUTH0_ISSUER,
        // }),
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
            //console.log(token, user, account)
            if (account) {
                //only set on login
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
    debug: true,
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
