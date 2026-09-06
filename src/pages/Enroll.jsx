import { useState } from 'react'
import { Check } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import Waveform from '../components/Waveform'
import StatusBadge from '../components/StatusBadge'
import { enrollVoice } from '../services/api'

const STEPS = ['Enter User ID', 'Record Voice', 'Analyze Voice', 'Create Voice Profile']

export default function Enroll() {
  const [stage, setStage] = useState(0) // 0..3, 4 = done
  const [userId, setUserId] = useState('')
  const [recording, setRecording] = useState(false)
  const [profile, setProfile] = useState(null)

  function handleRecordToggle() {
    if (!recording) {
      setRecording(true)
      setTimeout(() => {
        setRecording(false)
        setStage(2)
      }, 2200)
    }
  }

  async function handleAnalyze() {
    setStage(3)
    const res = await enrollVoice({ userId: userId || undefined })
    setProfile(res)
    setStage(4)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-semibold text-slate-50">Voice Enrollment</h1>
        <p className="mt-3 text-slate-400">
          Register a trusted voice profile for future authentication.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8 px-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1 flex items-center">
            <div
              className={`w-7 h-7 rounded-full grid place-items-center text-xs mono-tag border ${
                stage > i
                  ? 'bg-signal-pass/20 border-signal-pass/40 text-signal-pass'
                  : stage === i
                  ? 'border-cyan-glow/50 text-cyan-glow'
                  : 'border-white/10 text-slate-600'
              }`}
            >
              {stage > i ? <Check size={13} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 ${stage > i ? 'bg-signal-pass/40' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      <GlassCard glow className="p-8">
        {stage === 0 && (
          <div className="space-y-4">
            <label className="block text-sm text-slate-400">User ID</label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. AV-1024"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder:text-slate-600 focus:border-cyan-glow/50"
            />
            <button
              onClick={() => setStage(1)}
              className="w-full py-3 rounded-xl bg-cyan-glow text-void font-medium hover:brightness-110 transition-all"
            >
              Continue
            </button>
          </div>
        )}

        {stage === 1 && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Waveform active={recording} tone={recording ? 'cyan' : 'violet'} className="w-full" />
            <p className="text-sm text-slate-400">
              {recording ? 'Recording... speak naturally for a few seconds.' : 'Tap record to capture a voice sample.'}
            </p>
            <button
              onClick={handleRecordToggle}
              disabled={recording}
              className="px-6 py-3 rounded-xl bg-cyan-glow text-void font-medium hover:brightness-110 transition-all disabled:opacity-60"
            >
              {recording ? 'Recording...' : 'Record Voice'}
            </button>
            {recording && (
              <p className="text-xs text-slate-600 mono-tag">Duration: 00:0{Math.min(9, 3)}s (demo)</p>
            )}
          </div>
        )}

        {stage === 2 && (
          <div className="space-y-4 text-center">
            <p className="text-sm text-slate-400">
              Sample captured. Duration: 3.2s · Audio Quality: Good
            </p>
            <button
              onClick={handleAnalyze}
              className="px-6 py-3 rounded-xl bg-cyan-glow text-void font-medium hover:brightness-110 transition-all"
            >
              Analyze Voice
            </button>
          </div>
        )}

        {stage === 3 && (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-8 h-8 border-2 border-cyan-glow/30 border-t-cyan-glow rounded-full animate-spin" />
            <p className="text-sm text-slate-500">
              Extracting features and creating voice profile...
            </p>
          </div>
        )}

        {stage === 4 && profile && (
          <div className="text-center space-y-4">
            <Check size={36} className="text-signal-pass mx-auto" />
            <h3 className="font-display text-xl font-semibold text-slate-100">
              Voice Profile Created
            </h3>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
              <div>
                <div className="text-xs text-slate-600">User ID</div>
                <div className="mono-tag text-slate-200">{profile.userId}</div>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-1">Status</div>
                <StatusBadge status={profile.status} />
              </div>
            </div>
            <p className="text-xs text-slate-600 mono-tag pt-2">
              Ready to connect to POST /enroll
            </p>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
