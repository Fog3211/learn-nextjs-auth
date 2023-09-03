import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GitlibProvider from "next-auth/providers/gitlab"
import GoogleProvider from "next-auth/providers/google"

const ProviderList = [
  {
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    provider: GithubProvider
  },
  {
    clientId: process.env.GITLAB_ID,
    clientSecret: process.env.GITLAB_SECRET,
    provider: GitlibProvider
  },
  {
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    provider: GoogleProvider
  },
]

const authOptions: NextAuthOptions = {
  providers: ProviderList
    .filter(u => (u.clientId && u.clientSecret))
    // @ts-ignore
    .map(item => item.provider({
      clientId: item.clientId,
      clientSecret: item.clientSecret,
    })),

  pages: {
    signIn: 'login',
    // signOut: 'logout',
    // newUser: 'register'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }