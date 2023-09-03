import './globals.css'
import type { Metadata } from 'next'
import { NextAuthProvider } from './provider'

export const metadata: Metadata = {
  title: 'Next Auth App',
  description: 'Learn how to build a personal website using Next.js and Auth0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
