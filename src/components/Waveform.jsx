// Animated bar waveform. `active` controls whether bars pulse (listening/processing)
// or sit static (idle/finished).
const BAR_COUNT = 32

// Fixed heights so the "idle" waveform looks like a real voice trace,
// not a flat line — but stays deterministic across renders.
const BASE_HEIGHTS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const wave = Math.sin(i / 2.1) * 0.35 + Math.sin(i / 5.3) * 0.25
  return 0.3 + Math.abs(wave)
})

export default function Waveform({ active = false, tone = 'cyan', className = '' }) {
  const color = tone === 'violet' ? '#8b7bff' : tone === 'signal-fail' ? '#ff5c72' : '#4fd8ff'

  return (
    <div className={`flex items-center justify-center gap-[3px] h-16 ${className}`}>
      {BASE_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className={active ? 'animate-pulseLine' : ''}
          style={{
            width: 3,
            height: `${Math.round(h * 100)}%`,
            background: color,
            borderRadius: 2,
            opacity: active ? undefined : 0.45,
            animationDelay: active ? `${(i % 8) * 0.07}s` : undefined,
          }}
        />
      ))}
    </div>
  )
}
