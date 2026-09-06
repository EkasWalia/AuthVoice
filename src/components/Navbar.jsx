import { NavLink, Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/verify', label: 'Verification' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/use-cases', label: 'Use Cases' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-void/80 backdrop-blur-lg">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
          <ShieldCheck size={20} className="text-cyan-glow" />
          AuthVoice
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'text-cyan-glow bg-white/5' : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/login"
          className="px-4 py-2 rounded-lg text-sm font-medium border border-cyan-glow/30 text-cyan-glow hover:bg-cyan-glow/10 transition-colors"
        >
          Login
        </Link>
      </nav>
    </header>
  )
}
