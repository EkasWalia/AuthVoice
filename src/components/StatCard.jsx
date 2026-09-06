import GlassCard from './GlassCard'

export default function StatCard({ value, label, note, accent = 'cyan', icon: Icon }) {
  const accentClass = accent === 'violet' ? 'text-violet-glow' : 'text-cyan-glow'

  return (
    <GlassCard className="p-5 flex flex-col gap-1.5 min-w-[150px]">
      <div className="flex items-center justify-between">
        <span className={`font-display text-3xl font-semibold ${accentClass}`}>{value}</span>
        {Icon && <Icon size={18} className="text-slate-500" />}
      </div>
      <span className="text-sm text-slate-400">{label}</span>
      {note && <span className="text-xs text-slate-600 mono-tag">{note}</span>}
    </GlassCard>
  )
}
