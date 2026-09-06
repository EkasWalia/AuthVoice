import { X } from 'lucide-react'
import GlassCard from './GlassCard'

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-void/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <GlassCard
        glow
        className="w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-slate-100">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-500 hover:text-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </GlassCard>
    </div>
  )
}
