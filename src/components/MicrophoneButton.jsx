import { Mic } from 'lucide-react'

export default function MicrophoneButton({ active = false, size = 96, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={active ? 'Listening' : 'Start verification'}
      className={`relative grid place-items-center rounded-full transition-all duration-300
        ${active ? 'bg-cyan-glow/15' : 'bg-white/5 hover:bg-white/10'}
        border ${active ? 'border-cyan-glow/60' : 'border-white/10'}
        disabled:opacity-60 disabled:cursor-not-allowed`}
      style={{ width: size, height: size }}
    >
      {active && (
        <span
          className="absolute inset-0 rounded-full border border-cyan-glow/40 animate-ping"
          style={{ animationDuration: '1.8s' }}
        />
      )}
      <Mic size={size * 0.38} className={active ? 'text-cyan-glow' : 'text-slate-300'} />
    </button>
  )
}
