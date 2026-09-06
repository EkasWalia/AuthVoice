import { Landmark, Headset, Siren } from 'lucide-react'
import UseCaseCard from '../components/UseCaseCard'
import { USE_CASES } from '../data/mock'

const ICONS = [Landmark, Headset, Siren]

export default function UseCases() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-semibold text-slate-50">Use Cases</h1>
        <p className="mt-3 text-slate-400">
          Built for real-time protection in high-risk voice systems.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {USE_CASES.map((useCase, i) => (
          <UseCaseCard key={useCase.title} {...useCase} icon={ICONS[i]} />
        ))}
      </div>
    </div>
  )
}
