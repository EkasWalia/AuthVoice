import { CheckCircle2, XCircle, Info } from 'lucide-react'

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const COLORS = {
  success: 'border-signal-pass/30 text-signal-pass',
  error: 'border-signal-fail/30 text-signal-fail',
  info: 'border-cyan-glow/30 text-cyan-glow',
}

export default function Toast({ toasts = [] }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2 w-72">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] || Info
        return (
          <div
            key={toast.id}
            className={`glass rounded-xl px-4 py-3 flex items-center gap-2.5 text-sm border ${
              COLORS[toast.type] || COLORS.info
            }`}
          >
            <Icon size={16} className="shrink-0" />
            <span className="text-slate-200">{toast.message}</span>
          </div>
        )
      })}
    </div>
  )
}
