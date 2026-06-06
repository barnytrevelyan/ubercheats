import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { supabase } from '../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState('Verifying your login link...')

  useEffect(() => {
    async function handleCallback() {
      // Supabase magic link passes token_hash + type as query params
      const { token_hash, type } = router.query

      if (!token_hash || !type) {
        // The session may already be set via URL hash fragment — check it
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.replace('/my-complaints')
          return
        }
        setStatus('Invalid login link. Please try again.')
        return
      }

      const { error } = await supabase.auth.verifyOtp({ token_hash, type })

      if (error) {
        setStatus('Login link has expired or is invalid. Please request a new one.')
        return
      }

      setStatus('Logged in! Redirecting...')
      router.replace('/my-complaints')
    }

    if (router.isReady) {
      handleCallback()
    }
  }, [router.isReady, router.query])

  return (
    <>
      <Head>
        <title>Signing in — UberCheats</title>
      </Head>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-gray-700 text-lg">{status}</p>
          {status.includes('expired') || status.includes('Invalid') ? (
            <a href="/my-complaints" className="mt-4 inline-block text-blue-600 underline">
              ← Back to sign in
            </a>
          ) : (
            <div className="mt-4 text-sm text-gray-400">Please wait…</div>
          )}
        </div>
      </div>
    </>
  )
}
