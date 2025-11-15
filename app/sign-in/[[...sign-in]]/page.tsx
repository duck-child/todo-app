import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 text-transparent bg-clip-text">
          Welcome Back
        </h1>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
              card: 'glass-effect shadow-2xl',
            }
          }}
        />
      </div>
    </div>
  )
}