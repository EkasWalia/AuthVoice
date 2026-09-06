/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05070d',
        abyss: '#0a0e18',
        panel: '#0d1220',
        edge: 'rgba(148, 197, 255, 0.14)',
        cyan: {
          glow: '#4fd8ff',
          core: '#22b8f0',
        },
        violet: {
          glow: '#8b7bff',
        },
        signal: {
          pass: '#3ee6a8',
          fail: '#ff5c72',
          warn: '#ffb84f',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(79,216,255,0.15), 0 0 32px -8px rgba(79,216,255,0.35)',
        violetGlow: '0 0 0 1px rgba(139,123,255,0.18), 0 0 32px -8px rgba(139,123,255,0.35)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(79,216,255,0.15), transparent)',
      },
      keyframes: {
        pulseLine: {
          '0%, 100%': { transform: 'scaleY(0.3)', opacity: '0.5' },
          '50%': { transform: 'scaleY(1)', opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        pulseLine: 'pulseLine 1.1s ease-in-out infinite',
        scan: 'scan 2.4s linear infinite',
      },
    },
  },
  plugins: [],
}
