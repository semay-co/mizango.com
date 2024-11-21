import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { User } from 'next-auth'
import { signInSchema } from './zod'

export const { auth, handlers, signIn, signOut } = NextAuth({
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
        const { username, password } = await signInSchema.parseAsync(
          credentials
        )

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
})
