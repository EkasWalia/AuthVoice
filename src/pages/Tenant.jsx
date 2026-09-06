import { useEffect, useState } from 'react'
import GlassCard from '../components/GlassCard'
import StatusBadge from '../components/StatusBadge'
import LoadingAnimation from '../components/LoadingAnimation'
import { getTenant } from '../services/api'

export default function Tenant() {
  const [tenant, setTenant] = useState(null)

  useEffect(() => {
    getTenant().then(setTenant)
  }, [])

  if (!tenant) {
    return (
      <div className="px-6 sm:px-10 py-10">
        <LoadingAnimation label="Loading tenant information..." />
      </div>
    )
  }

  return (
    <div className="px-6 sm:px-10 py-10 max-w-3xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-slate-50">Tenant / Organization</h1>
        <p className="text-sm text-slate-500 mt-1">Represents GET /tenant.</p>
      </div>

      <GlassCard glow className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-medium text-slate-100">
              {tenant.organization}
            </h2>
            <p className="text-sm text-slate-500 mono-tag mt-1">{tenant.tenantId}</p>
          </div>
          <StatusBadge status={tenant.securityStatus} />
        </div>

        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/8">
          <Stat label="Total Users" value={tenant.totalUsers.toLocaleString()} />
          <Stat label="Voice Verifications" value={tenant.voiceVerifications.toLocaleString()} />
          <Stat label="Blocked Attempts" value={tenant.blockedAttempts.toLocaleString()} />
        </div>
      </GlassCard>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-cyan-glow">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  )
}
