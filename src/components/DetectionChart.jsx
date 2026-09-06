import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from 'recharts'

const TOOLTIP_STYLE = {
  background: '#0d1220',
  border: '1px solid rgba(148,197,255,0.18)',
  borderRadius: 10,
  fontSize: 12,
}

export function ActivityLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,197,255,0.08)" />
        <XAxis dataKey="label" stroke="#5b6b85" fontSize={12} />
        <YAxis stroke="#5b6b85" fontSize={12} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Line type="monotone" dataKey="verified" stroke="#4fd8ff" strokeWidth={2} dot={false} name="Verified" />
        <Line type="monotone" dataKey="blocked" stroke="#ff5c72" strokeWidth={2} dot={false} name="Blocked" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function DetectionBarChart({ data }) {
  const colors = { Authentic: '#3ee6a8', Synthetic: '#ff5c72', Suspicious: '#ffb84f' }
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,197,255,0.08)" />
        <XAxis dataKey="name" stroke="#5b6b85" fontSize={12} />
        <YAxis stroke="#5b6b85" fontSize={12} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={colors[entry.name] || '#4fd8ff'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
