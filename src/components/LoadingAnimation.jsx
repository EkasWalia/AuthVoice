import { Loader2 } from 'lucide-react'

export default function LoadingAnimation({ label = 'Loading...' }) {
  return (
    <div className="flex items-center gap-2.5 text-slate-400 text-sm">
      <Loader2 size={16} className="animate-spin text-cyan-glow" />
      {label}
    </div>
  )
}
