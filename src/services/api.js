// src/services/api.js
//
// Mock implementation of the AuthVoice backend contract.
// Every function returns the same shape the real FastAPI endpoints
// (http://localhost:8000/enroll, /verify, /logs, /tenant) are expected to return.
//
// To connect the real backend, replace the body of each function below
// with a fetch() call — the rest of the app (components/pages) does not
// need to change, since it only depends on these function signatures.

import { MOCK_RESULTS, VERIFICATION_LOGS, TENANT_INFO } from '../data/mock'

const USE_MOCKS = true
const BASE_URL = 'http://localhost:8000'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * POST /verify
 * Runs the verification pipeline on a captured audio sample.
 * Real backend: multipart/form-data audio upload -> pipeline result.
 */
export async function verifyVoice(/* audioBlob */) {
  if (USE_MOCKS) {
    await delay(1400)
    // Deterministic-ish demo split: mostly verified, sometimes blocked.
    const isVerified = Math.random() > 0.3
    return isVerified ? MOCK_RESULTS.verified : MOCK_RESULTS.blocked
  }

  const response = await fetch(`${BASE_URL}/verify`, {
    method: 'POST',
    // body: formDataWithAudio,
  })
  if (!response.ok) throw new Error('Verification request failed')
  return response.json()
}

/**
 * POST /enroll
 * Registers a new trusted voice profile.
 */
export async function enrollVoice({ userId } = {}) {
  if (USE_MOCKS) {
    await delay(1600)
    return {
      userId: userId || 'AV-1024',
      status: 'ENROLLED',
      audioQuality: 'GOOD',
      featureExtraction: 'COMPLETE',
    }
  }

  const response = await fetch(`${BASE_URL}/enroll`, {
    method: 'POST',
    // body: formDataWithAudioAndUserId,
  })
  if (!response.ok) throw new Error('Enrollment request failed')
  return response.json()
}

/**
 * GET /logs
 * Returns verification log history, optionally filtered.
 */
export async function getLogs({ filter = 'All' } = {}) {
  if (USE_MOCKS) {
    await delay(400)
    if (filter === 'All') return VERIFICATION_LOGS
    return VERIFICATION_LOGS.filter(
      (log) => log.result.toLowerCase() === filter.toLowerCase(),
    )
  }

  const response = await fetch(`${BASE_URL}/logs?filter=${encodeURIComponent(filter)}`)
  if (!response.ok) throw new Error('Failed to fetch logs')
  return response.json()
}

/**
 * GET /tenant
 * Returns organization / tenant metadata.
 */
export async function getTenant() {
  if (USE_MOCKS) {
    await delay(300)
    return TENANT_INFO
  }

  const response = await fetch(`${BASE_URL}/tenant`)
  if (!response.ok) throw new Error('Failed to fetch tenant info')
  return response.json()
}
