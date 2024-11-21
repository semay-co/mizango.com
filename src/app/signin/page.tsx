import { signIn } from '@/lib/auth'
import { signInSchema } from '@/lib/zod'
import { AuthError } from 'next-auth'
import { z } from 'zod'

const SignIn = () => {
  return (
    <form
      action={async (formData) => {
        'use server'
        try {
          await signIn('credentials', formData)
        } catch (error) {
          if (error instanceof AuthError) {
            // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
          }
          throw error
        }
      }}
    >
      <label>
        Username
        <input name='username' type='text' />
      </label>
      <label>
        Password
        <input name='password' type='password' />
      </label>
      <button>Sign In</button>
    </form>
  )
}

export default SignIn
