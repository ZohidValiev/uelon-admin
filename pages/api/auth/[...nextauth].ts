
import NextAuth, { Awaitable } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import * as api from "@/api/auth"
import { canUserLogin, Auth } from "@/types/users"
import { NextApiRequest, NextApiResponse } from "next"


export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
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
                    try {
                        return api.login(username, password) as any
                    } catch (error) {
                        return null
                    }
                },
            })
        ],
        // jwt: {
        //     maxAge: 300,
        // },
        callbacks: {
            async signIn({ user, account, profile, email, credentials }) {
                if (user) {
                    const authUser = user.data as Auth.User
                    return canUserLogin(authUser)
                }
                return false
            },
            async jwt({ token, user, account, profile, isNewUser }) {
                if (user) {
                    const payload = (user as any) as Auth.Data
                    token.accessToken = payload.token
                    token.refreshToken = payload.refreshToken
                    token.user = payload.data
                    return token
                }
                
                if (req.query["refresh-token"] == 1) {
                    try {
                        // @ts-ignore
                        const payload = await api.refreshAccessToken(token.refreshToken)   
                        token.accessToken = payload.token
                        token.refreshToken = payload.refreshToken
                        token.user = payload.data
                    } catch (error) {
                        token.signOut = true 
                    }
                }

                return token
            },
            async session({ session, token, user }) {
                session.accessToken = token.accessToken
                session.refreshToken = token.refreshToken
                session.signOut = token.signOut ? true : false
                
                if (token.user) {
                    const authUser = token.user as Auth.User
                    session.user = {
                        // @ts-ignore
                        id: authUser.id,
                        email: authUser.username,
                        name: authUser.nickname,
                        // @ts-ignore
                        roles: authUser.roles,
                    }
                }

                return session
            }
        },
        pages: {
            signIn: "/auth/login",
            error: "/auth/login"
        },
    })
}