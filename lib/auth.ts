import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //     credentials: {
    //       email: { label: "Email", type: "email" },
    //       password: { label: "Password", type: "password" }
    //     }
    // )
  ],
}
