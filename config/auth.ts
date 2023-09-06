import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GitlibProvider from "next-auth/providers/gitlab"
import GoogleProvider from "next-auth/providers/google"

const ProviderList = [
  {
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    provider: GithubProvider,
    icon: 'https://authjs.dev/img/providers/github.svg',
    name: 'github'
  },
  {
    clientId: process.env.GITLAB_ID,
    clientSecret: process.env.GITLAB_SECRET,
    provider: GitlibProvider,
    icon: 'https://authjs.dev/img/providers/gitlab.svg',
    name: 'gitlab'
  },
  {
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    provider: GoogleProvider,
    icon: 'https://authjs.dev/img/providers/google.svg',
    name: 'google'
  },
]

export const LoginIcons = ProviderList.map(u => ({
  icon: u.icon,
  name: u.name,
}))

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    ...ProviderList
      .filter(u => (u.clientId && u.clientSecret))
      // @ts-ignore
      .map(item => item.provider({
        clientId: item.clientId,
        clientSecret: item.clientSecret,
      }))
  ],

  pages: {
    signIn: 'login',
    // signOut: 'logout',
    // newUser: 'register'
  }
}
