const STYLES = {
  VERIFIED: 'text-signal-pass border-signal-pass/40 bg-signal-pass/10',
  BLOCKED: 'text-signal-fail border-signal-fail/40 bg-signal-fail/10',
  SUSPICIOUS: 'text-signal-warn border-signal-warn/40 bg-signal-warn/10',
  PASSED: 'text-signal-pass border-signal-pass/40 bg-signal-pass/10',
  FAILED: 'text-signal-fail border-signal-fail/40 bg-signal-fail/10',
  ACTIVE: 'text-signal-pass border-signal-pass/40 bg-signal-pass/10',
  ENROLLED: 'text-signal-pass border-signal-pass/40 bg-signal-pass/10',
}

export default function StatusBadge({ status }) {
  const style = STYLES[status] || 'text-slate-300 border-white/15 bg-white/5'
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mono-tag border ${style}`}
    >
      {status}
    </span>
  )
}
