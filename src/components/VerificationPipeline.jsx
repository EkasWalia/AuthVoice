import { Check, Loader2 } from 'lucide-react'
import { PIPELINE_STEPS } from '../data/mock'

// currentIndex: index of the step in progress. Steps before it are complete.
export default function VerificationPipeline({ currentIndex }) {
  return (
    <ol className="space-y-2">
      {PIPELINE_STEPS.map((step, i) => {
        const isDone = i < currentIndex
        const isActive = i === currentIndex
        return (
          <li
            key={step.id}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl border transition-colors ${
              isActive
                ? 'border-cyan-glow/40 bg-cyan-glow/5'
                : isDone
                ? 'border-white/8 bg-white/[0.02]'
                : 'border-white/5 bg-transparent opacity-40'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isDone ? (
                <span className="grid place-items-center w-5 h-5 rounded-full bg-signal-pass/20 text-signal-pass">
                  <Check size={12} />
                </span>
              ) : isActive ? (
                <Loader2 size={18} className="text-cyan-glow animate-spin" />
              ) : (
                <span className="block w-5 h-5 rounded-full border border-white/15" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] mono-tag text-slate-500">{step.step}</span>
                <span className="text-sm font-medium text-slate-200">{step.title}</span>
              </div>
              {(isActive || isDone) && (
                <p className="text-xs text-slate-500 mt-0.5">{step.message}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
