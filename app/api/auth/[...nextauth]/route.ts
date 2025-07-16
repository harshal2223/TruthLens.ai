import NextAuth from 'next-auth'
import { NextAuthOptions, NextAuthRequest } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    verifyRequest: '/auth/verify-request',
  },
}

export async function GET(req: NextRequest) {
  return NextAuth(req, authOptions)
}

export async function POST(req: NextRequest) {
  return NextAuth(req, authOptions)
}

export { authOptions }