import StatusBadge from './StatusBadge'

export default function ActivityTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-white/8">
            <th className="py-2.5 pr-4 font-medium">Time</th>
            <th className="py-2.5 pr-4 font-medium">User</th>
            <th className="py-2.5 pr-4 font-medium">Result</th>
            <th className="py-2.5 pr-4 font-medium">Detection</th>
            <th className="py-2.5 pr-4 font-medium">Processing</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0">
              <td className="py-2.5 pr-4 mono-tag text-slate-500">{row.time}</td>
              <td className="py-2.5 pr-4 text-slate-300">{row.user}</td>
              <td className="py-2.5 pr-4">
                <StatusBadge status={row.result} />
              </td>
              <td className="py-2.5 pr-4 text-slate-400">{row.detection}</td>
              <td className="py-2.5 pr-4 mono-tag text-slate-500">{row.processing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
