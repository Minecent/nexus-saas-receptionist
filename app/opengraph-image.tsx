import { ImageResponse } from 'next/og'

export const alt = 'NEXUS — AI Receptionist for Businesses of Every Size'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage:
            'radial-gradient(ellipse at 50% 0%, rgba(13,148,136,0.35), transparent 60%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 9999,
            border: '2px solid rgba(45,212,191,0.3)',
            backgroundColor: 'rgba(45,212,191,0.1)',
            color: '#2dd4bf',
            fontSize: 28,
            fontWeight: 600,
            padding: '12px 32px',
            marginBottom: 40,
          }}
        >
          AI-powered front desk for modern businesses
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 160,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.04em',
          }}
        >
          NEXUS
          <span style={{ color: '#2dd4bf' }}>.</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 40,
            color: '#94a3b8',
          }}
        >
          24/7 AI Call Answering — Never Miss a Customer
        </div>
      </div>
    ),
    { ...size }
  )
}
