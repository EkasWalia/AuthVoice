// Realistic mock data for frontend-only demo state.
// Replace with live values once the FastAPI backend is connected.

export const PIPELINE_STEPS = [
  {
    id: 'input',
    step: 'STEP 01',
    title: 'Voice Input',
    message: 'Listening to audio...',
  },
  {
    id: 'features',
    step: 'STEP 02',
    title: 'Feature Extraction',
    message: 'Extracting acoustic features using Librosa...',
  },
  {
    id: 'synthetic',
    step: 'STEP 03',
    title: 'Synthetic Voice Detection',
    message: 'Analyzing voice for AI-generated artifacts...',
  },
  {
    id: 'liveness',
    step: 'STEP 04',
    title: 'Liveness / Channel Check',
    message: 'Checking whether the audio appears live...',
  },
  {
    id: 'biometric',
    step: 'STEP 05',
    title: 'Biometric Verification',
    message: 'Comparing voice characteristics...',
  },
  {
    id: 'decision',
    step: 'STEP 06',
    title: 'Decision',
    message: 'Generating verification result...',
  },
]

export const MOCK_RESULTS = {
  verified: {
    outcome: 'VERIFIED',
    headline: 'Voice passed authentication checks.',
    syntheticProbability: 4,
    livenessCheck: 'PASSED',
    voiceMatch: 96,
    processingTimeMs: 147,
    decision: 'ACCESS GRANTED',
  },
  blocked: {
    outcome: 'BLOCKED',
    headline: 'Potential synthetic or suspicious voice detected.',
    syntheticProbability: 94,
    livenessCheck: 'FAILED',
    voiceMatch: 62,
    processingTimeMs: 178,
    decision: 'ACCESS BLOCKED',
  },
}

export const DASHBOARD_STATS = {
  totalVerifications: 1284,
  verified: 1167,
  blocked: 87,
  suspicious: 30,
}

export const VERIFICATION_ACTIVITY = [
  { label: 'Mon', verified: 142, blocked: 8 },
  { label: 'Tue', verified: 168, blocked: 11 },
  { label: 'Wed', verified: 155, blocked: 14 },
  { label: 'Thu', verified: 189, blocked: 9 },
  { label: 'Fri', verified: 201, blocked: 19 },
  { label: 'Sat', verified: 164, blocked: 13 },
  { label: 'Sun', verified: 148, blocked: 13 },
]

export const DETECTION_RESULTS = [
  { name: 'Authentic', value: 1167 },
  { name: 'Synthetic', value: 87 },
  { name: 'Suspicious', value: 30 },
]

export const ACTIVITY_TABLE = [
  { time: '10:42', user: 'User-1024', result: 'VERIFIED', detection: 'Authentic', processing: '142ms' },
  { time: '10:40', user: 'User-1048', result: 'BLOCKED', detection: 'Synthetic', processing: '178ms' },
  { time: '10:38', user: 'User-1007', result: 'VERIFIED', detection: 'Authentic', processing: '153ms' },
  { time: '10:35', user: 'User-1091', result: 'VERIFIED', detection: 'Authentic', processing: '139ms' },
  { time: '10:31', user: 'User-1063', result: 'SUSPICIOUS', detection: 'Suspicious', processing: '164ms' },
  { time: '10:27', user: 'User-1012', result: 'VERIFIED', detection: 'Authentic', processing: '148ms' },
]

export const VERIFICATION_LOGS = [
  { id: 'LOG-8841', timestamp: '2026-09-06 10:42:11', userId: 'AV-1024', result: 'VERIFIED', syntheticProbability: 4, liveness: 'PASSED', processingTimeMs: 142 },
  { id: 'LOG-8840', timestamp: '2026-09-06 10:40:52', userId: 'AV-1048', result: 'BLOCKED', syntheticProbability: 94, liveness: 'FAILED', processingTimeMs: 178 },
  { id: 'LOG-8839', timestamp: '2026-09-06 10:38:07', userId: 'AV-1007', result: 'VERIFIED', syntheticProbability: 6, liveness: 'PASSED', processingTimeMs: 153 },
  { id: 'LOG-8838', timestamp: '2026-09-06 10:35:44', userId: 'AV-1091', result: 'VERIFIED', syntheticProbability: 3, liveness: 'PASSED', processingTimeMs: 139 },
  { id: 'LOG-8837', timestamp: '2026-09-06 10:31:19', userId: 'AV-1063', result: 'SUSPICIOUS', syntheticProbability: 58, liveness: 'PASSED', processingTimeMs: 164 },
  { id: 'LOG-8836', timestamp: '2026-09-06 10:27:03', userId: 'AV-1012', result: 'VERIFIED', syntheticProbability: 5, liveness: 'PASSED', processingTimeMs: 148 },
  { id: 'LOG-8835', timestamp: '2026-09-06 10:22:41', userId: 'AV-1077', result: 'BLOCKED', syntheticProbability: 89, liveness: 'FAILED', processingTimeMs: 171 },
  { id: 'LOG-8834', timestamp: '2026-09-06 10:19:58', userId: 'AV-1033', result: 'VERIFIED', syntheticProbability: 2, liveness: 'PASSED', processingTimeMs: 144 },
]

export const TENANT_INFO = {
  organization: 'AuthVoice Demo Bank',
  tenantId: 'TEN-001',
  securityStatus: 'ACTIVE',
  totalUsers: 2481,
  voiceVerifications: 12842,
  blockedAttempts: 327,
}

export const USE_CASES = [
  {
    title: 'Banking & Fintech',
    points: [
      'Secure voice authentication',
      'Detect AI voice fraud',
      'Protect voice-based verification',
    ],
  },
  {
    title: 'Call Centers & Enterprises',
    points: [
      'Detect spoofed callers',
      'Verify customers',
      'Protect executives from impersonation',
    ],
  },
  {
    title: 'Security & Law Enforcement',
    points: [
      'Validate suspicious calls',
      'Support audio verification',
      'Reduce false alerts',
    ],
  },
]

export const HOW_IT_WORKS_STAGES = [
  {
    number: '01',
    title: 'Voice Input',
    description: 'User speaks naturally through a microphone or audio stream.',
  },
  {
    number: '02',
    title: 'Feature Extraction',
    description: 'Audio characteristics are extracted using Librosa.',
  },
  {
    number: '03',
    title: 'Synthetic Voice Detection',
    description: 'The ML layer analyzes the voice for patterns associated with AI-generated/synthetic speech.',
  },
  {
    number: '04',
    title: 'Liveness / Channel Check',
    description: 'The system checks whether the audio appears to be live rather than a simple replay.',
  },
  {
    number: '05',
    title: 'Authentication',
    description: 'Voice characteristics are compared against the enrolled profile.',
  },
  {
    number: '06',
    title: 'Decision',
    description: 'The checks are combined into a final: VERIFIED or BLOCKED.',
  },
]
