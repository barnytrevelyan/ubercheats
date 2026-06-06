import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ubercheats.info'

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

// ── Upload a file to Supabase Storage and return its public URL ──────────────
async function uploadFile(file, complaintId) {
  const ext = file.name.split('.').pop()
  const path = `complaint-${complaintId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { data, error } = await supabase.storage.from('complaints').upload(path, file, { upsert: false })
  if (error) throw error
  const { data: urlData } = supabase.storage.from('complaints').getPublicUrl(data.path)
  return urlData.publicUrl
}

// ── Sign-in form ─────────────────────────────────────────────────────────────
function SignInForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${SITE_URL}/auth/callback` },
    })

    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <div className="text-5xl mb-4">✉️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
        <p className="text-gray-600">
          We sent a login link to <strong>{email}</strong>. Click it to access your complaints.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          No email? Check your spam folder. The link expires in 1 hour.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Manage your cases</h1>
      <p className="text-gray-600 mb-6 text-sm">
        Enter the email you used when submitting your complaint. We&apos;ll send you a one-click login link — no password needed.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {loading ? 'Sending…' : 'Send login link'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        No complaint yet?{' '}
        <Link href="/" className="text-blue-600 underline">Submit one here</Link>
      </p>
    </div>
  )
}

// ── Add-update form for a single complaint ───────────────────────────────────
function AddUpdateForm({ complaint, onUpdateAdded }) {
  const [text, setText] = useState('')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() && files.length === 0) return
    setLoading(true)
    setError('')

    try {
      // Upload files
      const uploadedUrls = await Promise.all(files.map((f) => uploadFile(f, complaint.id)))

      // Insert update
      const { data: { session } } = await supabase.auth.getSession()
      const { error: insertError } = await supabase
        .from('complaint_updates')
        .insert([{
          complaint_id: complaint.id,
          update_text: text.trim() || null,
          file_urls: uploadedUrls.length ? uploadedUrls : null,
        }])

      if (insertError) throw insertError

      setText('')
      setFiles([])
      if (fileRef.current) fileRef.current.value = ''
      onUpdateAdded()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h4 className="font-semibold text-gray-700 mb-3 text-sm">Add an update</h4>

      {error && (
        <div className="mb-3 p-2 bg-red-100 border border-red-300 text-red-700 rounded text-sm">{error}</div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Describe what's happened since — Uber's response, new charges, escalation steps, resolution status…"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
      />

      <div className="mb-3">
        <label className="block text-xs text-gray-600 font-semibold mb-1">Add photos or documents</label>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 file:text-sm file:font-medium hover:file:bg-blue-100"
        />
        {files.length > 0 && (
          <p className="text-xs text-gray-500 mt-1">{files.length} file(s) selected</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || (!text.trim() && files.length === 0)}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
      >
        {loading ? 'Saving…' : 'Post update'}
      </button>
    </form>
  )
}

// ── Complaint card with update thread ────────────────────────────────────────
function ComplaintCard({ complaint: initialComplaint }) {
  const [complaint, setComplaint] = useState(initialComplaint)
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const reload = async () => {
    const res = await fetch(`/api/complaints/${complaint.id}`)
    const { complaint: fresh } = await res.json()
    setComplaint(fresh)
    setShowUpdateForm(false)
  }

  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <Link href={`/complaints/${complaint.id}`} className="text-lg font-bold text-gray-800 hover:text-blue-700 hover:underline">
            {complaint.title}
          </Link>
          <p className="text-sm text-gray-500 mt-0.5">
            {complaint.category} · {formatDate(complaint.created_at)}
            {complaint.order_amount && (
              <span className="ml-2 font-medium text-gray-700">
                {complaint.order_currency || 'USD'} {parseFloat(complaint.order_amount).toFixed(2)}
              </span>
            )}
          </p>
        </div>
        <span className="shrink-0 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
          #{complaint.id}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-3 line-clamp-3">{complaint.description}</p>

      {/* Updates */}
      {complaint.updates && complaint.updates.length > 0 && (
        <div className="mb-3 border-l-2 border-blue-200 pl-3 space-y-3">
          {complaint.updates.map((u) => (
            <div key={u.id}>
              <p className="text-xs text-gray-400 mb-0.5">{formatDate(u.created_at)}</p>
              {u.update_text && <p className="text-sm text-gray-700">{u.update_text}</p>}
              {u.file_urls && u.file_urls.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {u.file_urls.map((url, i) =>
                    url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                        <img src={url} alt="update" className="h-16 w-16 object-cover rounded border border-gray-200" />
                      </a>
                    ) : (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-blue-600 underline">📎 file {i + 1}</a>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-3 text-sm">
        <button
          onClick={() => setShowUpdateForm((v) => !v)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {showUpdateForm ? 'Cancel' : '+ Add update / photos'}
        </button>
        <Link href={`/complaints/${complaint.id}`} className="text-gray-500 hover:text-gray-700">
          View public page →
        </Link>
        {!complaint.resolved && (
          <button
            onClick={async () => {
              const note = prompt('(Optional) What resolved it? e.g. "Chargeback succeeded" or "Uber refunded after tweet"')
              const { supabase: sb } = await import('../lib/supabase')
              await sb.from('complaints').update({ resolved: true, resolved_at: new Date().toISOString(), resolution_note: note || null }).eq('id', complaint.id)
              reload()
            }}
            className="text-green-600 hover:text-green-800 font-medium"
          >
            ✅ Mark resolved
          </button>
        )}
        {complaint.resolved && (
          <span className="text-green-600 font-semibold text-xs">✅ Resolved</span>
        )}
      </div>

      {showUpdateForm && (
        <AddUpdateForm complaint={complaint} onUpdateAdded={reload} />
      )}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function MyComplaints() {
  const [session, setSession] = useState(null)
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) loadComplaints(session.user.email)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) loadComplaints(session.user.email)
      else setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadComplaints = async (email) => {
    setLoading(true)
    const res = await fetch(`/api/complaints?email=${encodeURIComponent(email)}`)
    const data = await res.json()

    // Fetch updates for each complaint
    const withUpdates = await Promise.all(
      (data.complaints || []).map(async (c) => {
        const r = await fetch(`/api/complaints/${c.id}`)
        const d = await r.json()
        return d.complaint || c
      })
    )
    setComplaints(withUpdates)
    setLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setComplaints([])
  }

  return (
    <>
      <Head>
        <title>My Cases — UberCheats</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-white">
        <nav className="bg-gray-900 text-white px-4 py-3 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline font-bold text-base">UberCheats</Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">My Cases</span>
          </div>
          {session && (
            <div className="flex items-center gap-4 text-xs">
              <span className="text-gray-400">{session.user.email}</span>
              <button onClick={handleSignOut} className="text-gray-300 hover:text-white underline">
                Sign out
              </button>
            </div>
          )}
        </nav>

        <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6">
          {!session ? (
            <SignInForm />
          ) : loading ? (
            <div className="text-center py-16 text-gray-500">Loading your cases…</div>
          ) : complaints.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">No complaints found for <strong>{session.user.email}</strong>.</p>
              <Link href="/" className="text-blue-600 underline">Submit a complaint</Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Your cases</h1>
              <p className="text-sm text-gray-500 mb-6">
                {complaints.length} {complaints.length === 1 ? 'case' : 'cases'} filed under {session.user.email}
              </p>
              <div className="space-y-5">
                {complaints.map((c) => (
                  <ComplaintCard key={c.id} complaint={c} />
                ))}
              </div>
            </>
          )}
        </div>

        <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-12 text-sm">
          <p>UberCheats &copy; 2026 &nbsp;|&nbsp; Not affiliated with Uber Technologies Inc.</p>
        </footer>
      </div>
    </>
  )
}
