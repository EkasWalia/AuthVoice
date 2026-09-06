import { useEffect, useState } from 'react'
import GlassCard from '../components/GlassCard'
import LogTable from '../components/LogTable'
import Modal from '../components/Modal'
import StatusBadge from '../components/StatusBadge'
import { getLogs } from '../services/api'

const FILTERS = ['All', 'Verified', 'Blocked', 'Suspicious']

export default function Logs() {
  const [filter, setFilter] = useState('All')
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    getLogs({ filter }).then((data) => {
      setLogs(data)
      setLoading(false)
    })
  }, [filter])

  const visible = logs.filter((log) =>
    log.userId.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="px-6 sm:px-10 py-10 max-w-[1400px]">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-slate-50">Verification Logs</h1>
        <p className="text-sm text-slate-500 mt-1">Represents GET /logs.</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-sm border transition-colors ${
                filter === f
                  ? 'border-cyan-glow/40 text-cyan-glow bg-cyan-glow/10'
                  : 'border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by User ID..."
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-200 placeholder:text-slate-600 focus:border-cyan-glow/40 w-56"
        />
      </div>

      <GlassCard className="p-6">
        {loading ? (
          <p className="text-sm text-slate-500">Loading logs...</p>
        ) : (
          <LogTable logs={visible} onSelect={setSelected} />
        )}
      </GlassCard>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.id}>
        {selected && (
          <div className="space-y-3 text-sm">
            <Row label="Timestamp" value={selected.timestamp} />
            <Row label="User ID" value={selected.userId} />
            <Row label="Result" value={<StatusBadge status={selected.result} />} />
            <Row label="Synthetic Probability" value={`${selected.syntheticProbability}%`} />
            <Row label="Liveness" value={<StatusBadge status={selected.liveness} />} />
            <Row label="Processing Time" value={`${selected.processingTimeMs}ms`} />
          </div>
        )}
      </Modal>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-200">{value}</span>
    </div>
  )
}
