import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'MBTI性格タイプ結果 - シニアMBTI'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// MBTI Type 정보
const mbtiInfo = {
  'INTJ': { emoji: '🏛️', name: '建築家', color: '#6C5CE7' },
  'INTP': { emoji: '🔬', name: '論理学者', color: '#A29BFE' },
  'ENTJ': { emoji: '👑', name: '指揮官', color: '#E17055' },
  'ENTP': { emoji: '🚀', name: '討論者', color: '#00B894' },
  'INFJ': { emoji: '🌟', name: '提唱者', color: '#00CEC9' },
  'INFP': { emoji: '🎨', name: '仲介者', color: '#FD79A8' },
  'ENFJ': { emoji: '🤝', name: '主人公', color: '#FDCB6E' },
  'ENFP': { emoji: '🎭', name: '広報運動家', color: '#E84393' },
  'ISTJ': { emoji: '🛡️', name: '管理者', color: '#2D3436' },
  'ISFJ': { emoji: '💝', name: '擁護者', color: '#636E72' },
  'ESTJ': { emoji: '💼', name: '幹部', color: '#74B9FF' },
  'ESFJ': { emoji: '❤️', name: '領事', color: '#FF7675' },
  'ISTP': { emoji: '🔧', name: '巨匠', color: '#00B894' },
  'ISFP': { emoji: '🌸', name: '冒険家', color: '#FD79A8' },
  'ESTP': { emoji: '⚡', name: '起業家', color: '#FDCB6E' },
  'ESFP': { emoji: '🎪', name: 'エンターテイナー', color: '#E84393' }
}

export default async function Image({ params }) {
  const mbtiType = params.type.toUpperCase()
  const typeInfo = mbtiInfo[mbtiType] || { emoji: '🌟', name: '性格タイプ', color: '#667eea' }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '50px',
            padding: '12px 24px',
            marginBottom: '40px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
            color: 'white',
            fontWeight: '500',
          }}
        >
          シニアMBTI結果
        </div>

        {/* MBTI Type with Emoji */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <div style={{ fontSize: '80px', marginRight: '20px' }}>
            {typeInfo.emoji}
          </div>
          <div
            style={{
              fontSize: '96px',
              fontWeight: 'bold',
              color: typeInfo.color,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {mbtiType}
          </div>
        </div>

        {/* Type Name */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          {typeInfo.name}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: '1.4',
          }}
        >
          相性の良いMBTIタイプと注意が必要なタイプを確認し、有意義な関係を築こう
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}