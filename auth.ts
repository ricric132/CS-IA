import type { JWT } from '@auth/core/jwt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { Session, User } from 'next-auth'

import authConfig from './auth.config'
import { db } from './lib/db'
import { getUserById } from './lib/user'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    async session({ session, token }: { session: Session; token?: JWT }) {
      if (session.user && token?.sub) {
        session.user.id = token.sub
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
