import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-white/8 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© 2026 AuthVoice. Prototype build — SIH demo.</span>
          <span className="mono-tag">Pipeline: Input → Features → Detection → Liveness → Biometrics → Decision</span>
        </div>
      </footer>
    </div>
  )
}
