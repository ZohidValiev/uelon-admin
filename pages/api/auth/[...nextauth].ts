
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { login } from "@/api/users"
import { AxiosResponse } from "axios"
import { canUserSignIn, Auth } from "@/types/users"
import { tokenStore } from "@/types/token"


export default NextAuth({
    secret: "e5PAGYR5/Go+H0gh7h0uMLUXQ2rW1eWXhfKXM9PctlE=",
    providers: [
        CredentialsProvider({
            name: "credentials",
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
            async authorize({ username, password }) {
                let res: AxiosResponse<any, any>
                try {
                    res = await login(username, password)    
                    return res.data
                } catch (error) {
                    return null
                }
            },
        })
    ],
    callbacks: {
        // async redirect({ url, baseUrl }) {
        //     if (url.startsWith(baseUrl)) {
        //         return url
        //     }

        //     if (url.startsWith("/")) {
        //         return new URL(url, baseUrl).toString()
        //     }

        //     return baseUrl
        // },
        async signIn({ user, account, profile, email, credentials }) {
            if (user) {
                const authUser = user.data as Auth.User
                return canUserSignIn(authUser)
            }
                
            return false
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                const payload = (user as any) as Auth.Data
                tokenStore.setAccessToken(payload.token)
                token.accessToken = payload.token
                token.user = payload.data
            }
            return token
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken
            
            if (token.user) {
                const authUser = token.user as Auth.User
                session.user = {
                    id: authUser.id,
                    email: authUser.username,
                    name: authUser.nickname,
                    roles: authUser.roles,
                }
            }

            return session
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login"
    }
})