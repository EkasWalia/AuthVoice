import { CheckCircle2, XCircle } from 'lucide-react'
import GlassCard from './GlassCard'

export default function VerificationResult({ result, onReset }) {
  const isVerified = result.outcome === 'VERIFIED'

  return (
    <GlassCard
      glow
      className={`p-8 border-2 ${
        isVerified ? 'border-signal-pass/30' : 'border-signal-fail/30'
      }`}
    >
      <div className="flex items-center gap-3">
        {isVerified ? (
          <CheckCircle2 size={32} className="text-signal-pass" />
        ) : (
          <XCircle size={32} className="text-signal-fail" />
        )}
        <div>
          <h3
            className={`font-display text-2xl font-semibold ${
              isVerified ? 'text-signal-pass' : 'text-signal-fail'
            }`}
          >
            {isVerified ? 'VERIFIED' : 'BLOCKED'}
          </h3>
          <p className="text-sm text-slate-400">{result.headline}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <Metric label="Synthetic Voice Probability" value={`${result.syntheticProbability}%`} />
        <Metric label="Liveness Check" value={result.livenessCheck} />
        <Metric label="Voice Match" value={`${result.voiceMatch}%`} />
        <Metric label="Processing Time" value={`${result.processingTimeMs} ms`} />
      </div>

      <div
        className={`mt-6 flex items-center justify-between px-4 py-3 rounded-xl border ${
          isVerified ? 'border-signal-pass/30 bg-signal-pass/5' : 'border-signal-fail/30 bg-signal-fail/5'
        }`}
      >
        <span className="text-sm text-slate-400">Decision</span>
        <span
          className={`font-display font-semibold ${
            isVerified ? 'text-signal-pass' : 'text-signal-fail'
          }`}
        >
          {result.decision}
        </span>
      </div>

      <button
        onClick={onReset}
        className="mt-6 w-full py-3 rounded-xl border border-white/12 text-sm text-slate-300 hover:bg-white/5 transition-colors"
      >
        Run Another Verification
      </button>
    </GlassCard>
  )
}

function Metric({ label, value }) {
  return (
    <div>
      <div className="text-lg font-display font-semibold text-slate-100">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  )
}
