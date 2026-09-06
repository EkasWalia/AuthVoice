import { Check } from 'lucide-react'
import GlassCard from './GlassCard'

export default function UseCaseCard({ title, points, icon: Icon }) {
  return (
    <GlassCard className="p-7 flex flex-col gap-4 hover:shadow-glow transition-shadow duration-300">
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-cyan-glow/10 border border-cyan-glow/20 text-cyan-glow">
            <Icon size={18} />
          </span>
        )}
        <h3 className="font-display text-lg font-semibold text-slate-100">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-slate-400">
            <Check size={15} className="text-cyan-glow mt-0.5 shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}
