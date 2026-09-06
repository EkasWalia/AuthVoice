import { useEffect, useRef, useState } from 'react'
import MicrophoneButton from '../components/MicrophoneButton'
import Waveform from '../components/Waveform'
import VerificationPipeline from '../components/VerificationPipeline'
import VerificationResult from '../components/VerificationResult'
import GlassCard from '../components/GlassCard'
import Toast from '../components/Toast'
import { useToasts } from '../hooks/useToasts'
import { verifyVoice } from '../services/api'
import { PIPELINE_STEPS } from '../data/mock'

const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  DONE: 'done',
}

export default function Verify() {
  const [status, setStatus] = useState(STATUS.IDLE)
  const [stepIndex, setStepIndex] = useState(-1)
  const [result, setResult] = useState(null)
  const [elapsedMs, setElapsedMs] = useState(0)
  const timers = useRef([])
  const { toasts, pushToast } = useToasts()

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  async function handleStart() {
    setStatus(STATUS.RUNNING)
    setResult(null)
    setStepIndex(0)
    const start = performance.now()

    // Try to briefly request mic access for a realistic demo moment.
    // Frontend-only: we don't record or transmit audio here.
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        stream.getTracks().forEach((track) => track.stop())
      }
    } catch {
      pushToast('Microphone access denied — continuing with demo audio.', 'info')
    }

    // Step through the pipeline stages visually.
    const stepDuration = 230
    PIPELINE_STEPS.forEach((_, i) => {
      const t = setTimeout(() => setStepIndex(i), i === 0 ? 0 : i * stepDuration)
      timers.current.push(t)
    })

    const apiResult = await verifyVoice()
    const finalDelay = PIPELINE_STEPS.length * stepDuration
    const t = setTimeout(() => {
      setElapsedMs(Math.round(performance.now() - start))
      setResult(apiResult)
      setStatus(STATUS.DONE)
    }, finalDelay)
    timers.current.push(t)
  }

  function handleReset() {
    timers.current.forEach(clearTimeout)
    setStatus(STATUS.IDLE)
    setStepIndex(-1)
    setResult(null)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-semibold text-slate-50">
          Voice Verification
        </h1>
        <p className="mt-3 text-slate-400">
          Speak naturally and let AuthVoice analyze the audio.
        </p>
      </div>

      {status === STATUS.IDLE && (
        <GlassCard glow className="p-12 flex flex-col items-center gap-6 text-center">
          <MicrophoneButton size={104} onClick={handleStart} />
          <div>
            <h2 className="font-display text-xl font-medium text-slate-100">Ready to Verify</h2>
            <p className="text-sm text-slate-500 mt-1">
              Your browser will request microphone access to begin.
            </p>
          </div>
          <button
            onClick={handleStart}
            className="px-6 py-3 rounded-xl bg-cyan-glow text-void font-medium hover:brightness-110 transition-all shadow-glow"
          >
            Start Verification
          </button>
        </GlassCard>
      )}

      {status === STATUS.RUNNING && (
        <GlassCard glow className="p-8">
          <Waveform active tone="cyan" className="mb-6" />
          <VerificationPipeline currentIndex={stepIndex} />
          <p className="text-center text-xs text-slate-600 mono-tag mt-6">
            Processing...
          </p>
        </GlassCard>
      )}

      {status === STATUS.DONE && result && (
        <div className="space-y-4">
          <div className="text-center text-xs text-slate-500 mono-tag">
            Processing Time: {elapsedMs}ms (demo timing) · Reported: {result.processingTimeMs}ms
          </div>
          <VerificationResult result={result} onReset={handleReset} />
        </div>
      )}

      <p className="text-center text-xs text-slate-600 mt-10">
        Synthetic voice detection is the trained ML component. Tone/stress
        analysis is not shown here — it is simulated in the current build and
        labeled as such where it appears.
      </p>

      <Toast toasts={toasts} />
    </div>
  )
}
