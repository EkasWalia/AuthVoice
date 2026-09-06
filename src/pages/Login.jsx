import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // Frontend-only demo: no real auth call yet.
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center px-6 py-16">
      <GlassCard glow className="w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <span className="grid place-items-center w-12 h-12 rounded-xl bg-cyan-glow/10 border border-cyan-glow/20 mb-4">
            <ShieldCheck size={22} className="text-cyan-glow" />
          </span>
          <h1 className="font-display text-2xl font-semibold text-slate-50">AuthVoice</h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Secure access to your voice security dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-600 focus:border-cyan-glow/50"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-600 focus:border-cyan-glow/50"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-glow text-void font-medium hover:brightness-110 transition-all shadow-glow"
          >
            Sign In
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-xl border border-white/12 text-slate-300 hover:bg-white/5 transition-colors text-sm"
          >
            Continue with Organization SSO
          </button>
        </form>

        <div className="text-center mt-5">
          <button className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Forgot Password?
          </button>
        </div>
      </GlassCard>
    </div>
  )
}
