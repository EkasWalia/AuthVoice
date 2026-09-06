import StatusBadge from './StatusBadge'

export default function LogTable({ logs, onSelect }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-white/8">
            <th className="py-2.5 pr-4 font-medium">Timestamp</th>
            <th className="py-2.5 pr-4 font-medium">User ID</th>
            <th className="py-2.5 pr-4 font-medium">Result</th>
            <th className="py-2.5 pr-4 font-medium">Synthetic Probability</th>
            <th className="py-2.5 pr-4 font-medium">Liveness</th>
            <th className="py-2.5 pr-4 font-medium">Processing Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr
              key={log.id}
              onClick={() => onSelect(log)}
              className="border-b border-white/5 last:border-0 cursor-pointer hover:bg-white/[0.03] transition-colors"
            >
              <td className="py-2.5 pr-4 mono-tag text-slate-500">{log.timestamp}</td>
              <td className="py-2.5 pr-4 text-slate-300">{log.userId}</td>
              <td className="py-2.5 pr-4">
                <StatusBadge status={log.result} />
              </td>
              <td className="py-2.5 pr-4 text-slate-400">{log.syntheticProbability}%</td>
              <td className="py-2.5 pr-4">
                <StatusBadge status={log.liveness} />
              </td>
              <td className="py-2.5 pr-4 mono-tag text-slate-500">{log.processingTimeMs}ms</td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan={6} className="py-8 text-center text-slate-600 text-sm">
                No logs match this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
