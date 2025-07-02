import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'

// 기본 메타데이터 (다국어는 클라이언트사이드에서 처리)
export const metadata = {
  title: '시니어 MBTI - 성격 유형 테스트',
  description: '시니어를 위한 특별한 MBTI 성격 유형 테스트입니다. 24개의 간단한 질문으로 당신의 성격 유형을 알아보세요.',
  keywords: '시니어, MBTI, 성격테스트, 중장년, 심리테스트',
  openGraph: {
    title: '시니어 MBTI - 성격 유형 테스트',
    description: '시니어를 위한 특별한 MBTI 성격 유형 테스트',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '시니어 MBTI - 성격 유형 테스트',
    description: '시니어를 위한 특별한 MBTI 성격 유형 테스트',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        {/* 다국어 SEO 최적화 */}
        <link rel="alternate" hrefLang="ko" href="/" />
        <link rel="alternate" hrefLang="en" href="/?lang=en" />
        <link rel="alternate" hrefLang="zh" href="/?lang=zh" />
        <link rel="alternate" hrefLang="ja" href="/?lang=ja" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body className="bg-gradient-to-br min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}