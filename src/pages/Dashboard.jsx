import { ShieldCheck, ShieldX, ShieldAlert, Activity } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import StatCard from '../components/StatCard'
import ActivityTable from '../components/ActivityTable'
import { ActivityLineChart, DetectionBarChart } from '../components/DetectionChart'
import {
  DASHBOARD_STATS,
  VERIFICATION_ACTIVITY,
  DETECTION_RESULTS,
  ACTIVITY_TABLE,
} from '../data/mock'

export default function Dashboard() {
  return (
    <div className="px-6 sm:px-10 py-10 max-w-[1400px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-slate-50">Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Live snapshot of the AuthVoice verification pipeline.
          </p>
        </div>
        <span className="text-xs mono-tag text-slate-500 hidden sm:block">
          Mock data — connects to GET /logs, GET /tenant
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard value={DASHBOARD_STATS.totalVerifications.toLocaleString()} label="Total Verifications" icon={Activity} />
        <StatCard value={DASHBOARD_STATS.verified.toLocaleString()} label="Verified" icon={ShieldCheck} />
        <StatCard value={DASHBOARD_STATS.blocked.toLocaleString()} label="Blocked" icon={ShieldX} accent="violet" />
        <StatCard value={DASHBOARD_STATS.suspicious.toLocaleString()} label="Suspicious" icon={ShieldAlert} accent="violet" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <GlassCard className="p-6">
          <h2 className="font-display text-sm font-medium text-slate-300 mb-4">
            Verification Activity
          </h2>
          <ActivityLineChart data={VERIFICATION_ACTIVITY} />
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="font-display text-sm font-medium text-slate-300 mb-4">
            Voice Detection Results
          </h2>
          <DetectionBarChart data={DETECTION_RESULTS} />
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="font-display text-sm font-medium text-slate-300 mb-4">
          Live Activity
        </h2>
        <ActivityTable rows={ACTIVITY_TABLE} />
      </GlassCard>
    </div>
  )
}
