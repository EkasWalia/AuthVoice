import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'

import Landing from './pages/Landing'
import Verify from './pages/Verify'
import Enroll from './pages/Enroll'
import Dashboard from './pages/Dashboard'
import Logs from './pages/Logs'
import HowItWorks from './pages/HowItWorks'
import UseCases from './pages/UseCases'
import Tenant from './pages/Tenant'
import Login from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/verify" element={<Verify />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/tenant" element={<Tenant />} />
      </Route>
    </Routes>
  )
}
