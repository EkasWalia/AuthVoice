import { NavLink, Link } from 'react-router-dom'
import {
  LayoutGrid,
  Mic,
  UserPlus,
  ScrollText,
  AlertTriangle,
  BarChart3,
  Building2,
  Settings,
  ShieldCheck,
} from 'lucide-react'

const ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/verify', label: 'Live Verification', icon: Mic },
  { to: '/enroll', label: 'Enrollment', icon: UserPlus },
  { to: '/logs', label: 'Verification Logs', icon: ScrollText },
  { to: '/dashboard?panel=alerts', label: 'Fraud Alerts', icon: AlertTriangle },
  { to: '/dashboard?panel=analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/tenant', label: 'Tenant', icon: Building2 },
  { to: '/dashboard?panel=settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-white/8 bg-panel/60 min-h-screen hidden lg:flex flex-col">
      <Link to="/" className="flex items-center gap-2 px-6 h-16 font-display font-semibold">
        <ShieldCheck size={18} className="text-cyan-glow" />
        AuthVoice
      </Link>
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-6 py-4 text-xs text-slate-600 border-t border-white/8 mono-tag">
        AuthVoice Demo Bank
        <br />
        TEN-001
      </div>
    </aside>
  )
}
