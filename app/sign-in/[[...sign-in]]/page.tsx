'use client'

import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useEffect, useState } from 'react'

export default function SignInPage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark')
      setIsDark(hasDarkClass)
    }

    setTimeout(checkTheme, 100)

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 text-transparent bg-clip-text">
          welcome back
        </h1>
        <SignIn 
          appearance={{
            baseTheme: isDark ? dark : undefined,
            elements: {
              formButtonPrimary: isDark
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800',
              card: isDark ? 'glass-effect shadow-2xl border-0 dark:bg-gray-900 dark:text-white' : 'glass-effect shadow-2xl border-0',
              rootBox: 'mx-auto',
              cardBox: 'shadow-none border-0',
              formButtonReset: 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200',
            }
          }}
        />
      </div>
    </div>
  )
}