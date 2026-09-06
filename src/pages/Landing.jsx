import { Link } from 'react-router-dom'
import { ArrowRight, Waves, ShieldCheck, Radar } from 'lucide-react'
import Waveform from '../components/Waveform'
import StatCard from '../components/StatCard'
import GlassCard from '../components/GlassCard'

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-glow/25 text-cyan-glow text-xs mono-tag mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
            Real-time voice security prototype
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold leading-[1.05] text-slate-50">
            Trust Every <span className="text-gradient">Voice.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-lg">
            Real-time voice authentication with AI-powered synthetic voice
            detection.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/verify"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-glow text-void font-medium hover:brightness-110 transition-all shadow-glow"
            >
              Start Verification
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/12 text-slate-300 hover:bg-white/5 transition-colors"
            >
              Explore How It Works
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            <StatCard value="<200ms" label="Target Processing Time" />
            <StatCard value="99.4%" label="Detection Accuracy*" />
            <StatCard value="10K+" label="Training Samples*" />
          </div>
          <p className="mt-3 text-xs text-slate-600">
            *Prototype/project target or evaluation figure.
          </p>
        </div>

        <GlassCard glow className="p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
          <div className="relative flex flex-col items-center gap-8">
            <div className="w-24 h-24 rounded-full grid place-items-center border border-cyan-glow/30 bg-cyan-glow/5">
              <ShieldCheck size={40} className="text-cyan-glow" />
            </div>
            <Waveform active tone="cyan" className="w-full" />
            <div className="grid grid-cols-3 gap-3 w-full text-center">
              {['Voice Input', 'Detection Layer', 'Decision'].map((label) => (
                <div key={label} className="text-xs text-slate-500 mono-tag border-t border-white/8 pt-3">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Why AuthVoice */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/8">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12">
          <div>
            <h2 className="font-display text-3xl font-semibold text-slate-100">
              Why AuthVoice?
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              AI-generated voices are becoming increasingly difficult to
              distinguish from genuine voices. AuthVoice combines voice
              analysis, synthetic voice detection, liveness/channel checks
              and authentication into one verification pipeline.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <FeatureCard
              icon={Waves}
              title="Synthetic Detection"
              desc="Analyzes acoustic features for artifacts associated with AI-generated speech."
            />
            <FeatureCard
              icon={Radar}
              title="Liveness Check"
              desc="Signal-based check for whether audio appears live rather than replayed."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Biometric Match"
              desc="Compares voice characteristics against an enrolled profile."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <GlassCard className="p-5">
      <Icon size={18} className="text-cyan-glow mb-3" />
      <h3 className="font-medium text-slate-100 text-sm">{title}</h3>
      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{desc}</p>
    </GlassCard>
  )
}
