import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GitlibProvider from "next-auth/providers/gitlab"

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
]

export const authOptions: NextAuthOptions = {

  providers: ProviderList
    .filter(u => (u.clientId && u.clientSecret))
    // @ts-ignore
    .map(item => item.provider({
      clientId: item.clientId,
      clientSecret: item.clientSecret,
    })),
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }