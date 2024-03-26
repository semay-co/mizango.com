import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const authOptions: NextAuthOptions = {
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: '/admin/signin',
      error: '/admin/signin',
    },
    providers: [
      CredentialsProvider({
        name: 'Username',
        credentials: {
          username: {
            label: 'Username',
            type: 'text',
            placeholder: 'Username',
          },
          password: {
            label: 'Password',
            type: 'password',
            placeholder: 'password',
          },
        },
        async authorize(credentials: any, req: any) {
          const { username, password } = credentials

          console.log('credentials', credentials)

          console.log('process.env.ADMIN_PASSWORD', process.env.ADMIN_PASSWORD)
          if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
            console.log('admin login')
            return {
              id: 'admin',
              name: 'Admin',
            } as User
          } else {
            throw new Error('The username or password is incorrect.')
          }
        },
      }),
    ],
  }

  NextAuth(req, res, authOptions)
}
