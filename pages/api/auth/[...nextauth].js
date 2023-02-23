import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import {AuthController} from "@moonlay/controllers";
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'my-project',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                    placeholder: 'jsmith@example.com',
                },
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials, req) {
                //_contoller Auth
                const [ err, data ] = await new AuthController({
                    fields: credentials
                })._signIn()
                console.log(err,data,'nextauth login')
                if(err){
                    return {
                        error: true,
                        message: err?.message,
                        data: null
                    }
                }

                return {
                    error:false,
                    ...data,
                }
            },
        })
    ],
    secret: process.env.SECRET,
    pages: {
        signIn: '/auth/login',
        // signOut: "/auth/signout",
        // error: "/auth/error"
    },
    callbacks: {
        async redirect({url, baseUrl}) {
            return baseUrl
        },
        async signIn({account, profile, user, credentials}) {

            switch(account?.provider){
                case "credentials":
                    return user?.error === false
                default:
                    return false
            }
        },
        async jwt({token= {}, user, profile,account}){
            user && (token.user = user)
            profile && (token.profile = profile)
            account && (token.account = account)
            return {
                ...token,
                user: {
                    id: token.user.id,
                    token: token?.user?.token ?? null,
                    access_token: token?.user?.access_token ?? null,
                    email: token?.user?.email ?? null,
                    username: token?.user?.username ?? null,
                }
            }
        },
        async session({session, token, user, profile, account}) {
            session.user = {
                ...token?.user,
                ...token?.profile,
                ...token?.account,
                user,
                accessToken: {
                    exp: token.exp,
                    iat: token.iat,
                    jti: token.jti
                }
            };
            return session;
        },
    },
    theme: {
        colorScheme: 'dark', // "auto" | "dark" | "light"
        brandColor: '', // Hex color code #33FF5D
        logo: '/assets/icons/google-logo.svg', // Absolute URL to image
    },
    // Enable debug messages in the console if you are having problems
    debug: false,
});
