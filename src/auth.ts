import NextAuth from 'next-auth'
import type { NextAuthConfig} from 'next-auth'
import google from 'next-auth/providers/google'




export const { handlers, auth,signIn,signOut } = NextAuth({
    providers: [google],
    session: {
        strategy: 'jwt',
        maxAge: 432000,
        
    },
    callbacks:{
        async session({ session, token }) {
            return session;
          },
    },
   
    debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig)