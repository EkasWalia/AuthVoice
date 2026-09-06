import GlassCard from '../components/GlassCard'
import { HOW_IT_WORKS_STAGES } from '../data/mock'

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-14">
        <h1 className="font-display text-4xl font-semibold text-slate-50">How It Works</h1>
        <p className="mt-3 text-slate-400">
          A six-stage pipeline from raw audio to a verified decision.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-glow/40 via-violet-glow/30 to-transparent hidden sm:block" />
        <div className="space-y-4">
          {HOW_IT_WORKS_STAGES.map((stage) => (
            <div key={stage.number} className="flex gap-5 items-start">
              <div className="hidden sm:grid place-items-center w-12 h-12 shrink-0 rounded-full border border-cyan-glow/30 bg-void font-display text-sm text-cyan-glow z-10">
                {stage.number}
              </div>
              <GlassCard className="flex-1 p-5">
                <div className="flex items-center gap-2 sm:hidden mb-1">
                  <span className="mono-tag text-xs text-cyan-glow">{stage.number}</span>
                </div>
                <h3 className="font-display text-lg font-medium text-slate-100">{stage.title}</h3>
                <p className="text-sm text-slate-400 mt-1.5">{stage.description}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-slate-600 mt-12">
        Synthetic voice detection is the trained ML component in this build.
        Liveness/channel checks are signal-based/heuristic. The final decision
        is a rule-based aggregation of the available checks.
      </p>
    </div>
  )
}
