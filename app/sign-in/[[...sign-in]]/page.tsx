import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text">
          welcome back
        </h1>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
              card: 'glass-effect shadow-2xl',
              rootBox: 'mx-auto',
              cardBox: 'shadow-none',
            }
          }}
        />
      </div>
    </div>
  )
}