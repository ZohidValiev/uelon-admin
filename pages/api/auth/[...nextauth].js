
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByCredentials } from "@/api/users"


export default NextAuth({
    secret: "e5PAGYR5/Go+H0gh7h0uMLUXQ2rW1eWXhfKXM9PctlE=",
    providers: [
        CredentialsProvider({
            name: "credentials",
            debug: true,
            credentials: {
                username: { 
                    label: "Email", 
                    type: "text", 
                    placeholder: "Email" 
                },
                password: { 
                    label: "Password", 
                    type: "password" 
                }
            },
            async authorize(credentials) {
                let res
                try {
                    res = await getUserByCredentials(
                        credentials.username, 
                        credentials.password,
                    )    
                } catch (error) {
                    return null
                }

                const user = res.data
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                }
                
                return null
            },
            callbacks: {
                async signIn(args) {
                    console.log("signIn: ", args)
                    return true
                },
                async jwt(args) {
                    console.log("jwt: ", args)
                    
                    const { token, account } = args
                    if (account) {
                        token.accessToken = account.access_token
                    }
                    return token
                },
                async session(args) {
                    console.log("session: ", args)

                    const { session, token } = args
                    session.accessToken = token.accessToken
                    return session
                }
            },
            pages: {
                signIn: "/auth/signin"
            }
        })
    ]
})