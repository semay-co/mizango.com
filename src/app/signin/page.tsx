import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from '@/lib/auth'

import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

const SignIn = () => {
  return (
    <div className='justify-center items-center grid w-full h-full'>
      <Card className='w-full max-w-[800px]'>
        <CardHeader>
          <h1 className=''>Sign In</h1>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              'use server'
              try {
                await signIn('credentials', formData).then(() =>
                  redirect('/admin')
                )
              } catch (error) {
                if (error instanceof AuthError) {
                  // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                }
                throw error
              }
            }}
          >
            <div>
              <Label>Username</Label>
              <Input name='username' type='text' />
            </div>
            <div>
              <Label>Password</Label>
              <Input name='password' type='password' />
            </div>
            <div className='flex justify-stretch mt-4'>
              <Button>Sign In</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignIn
