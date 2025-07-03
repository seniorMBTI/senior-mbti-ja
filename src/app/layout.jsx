import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'
import Script from 'next/script'

// 기본 메타데이터 (다국어는 클라이언트사이드에서 처리)
export const metadata = {
  title: 'シニアMBTI - 中高年向け性格診断テスト | 50代・60代・70代のMBTI相性診断',
  description: 'シニア世代（中高年・高齢者）専用のMBTI性格診断テスト。50代、60代、70代以上の方のための16タイプ性格分析。退職後の人生設計、趣味仲間探し、パートナーとの相性診断に最適。無料で簡単に診断できます。',
  keywords: 'シニアMBTI, 中高年性格診断, 高齢者MBTI, 50代性格テスト, 60代性格分析, 70代相性診断, 退職後人生設計, シニア向け心理テスト, 中高年人間関係, 老後の生きがい, MBTI日本語, 性格タイプ診断, シニア世代, 無料性格診断',
  authors: [{ name: 'シニアMBTI専門チーム' }],
  generator: 'Next.js',
  applicationName: 'シニアMBTI',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'シニアMBTI - 中高年向け性格診断テスト | 50代・60代・70代のMBTI相性診断',
    description: 'シニア世代（中高年・高齢者）専用のMBTI性格診断テスト。退職後の人生設計、趣味仲間探し、パートナーとの相性診断に最適。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app',
    siteName: 'シニアMBTI - 中高年向け性格診断',
    images: [
      {
        url: '/images/senior-mbti-og-ja.jpg',
        width: 1200,
        height: 630,
        alt: 'シニアMBTI - 中高年・高齢者向けMBTI性格診断テスト'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'シニアMBTI - 中高年向け性格診断テスト',
    description: 'シニア世代専用のMBTI性格診断。50代、60代、70代以上の方のための性格分析と相性診断。',
    images: ['/images/senior-mbti-og-ja.jpg'],
    creator: '@seniormbtijp'
  },
  alternates: {
    canonical: 'https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app',
    languages: {
      'ja-JP': 'https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app',
      'ko-KR': 'https://seniormbtis-projects.vercel.app',
      'en-US': 'https://senior-mbti-en.vercel.app',
      'zh-CN': 'https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'シニアMBTI - 中高年向け性格診断テスト',
    description: 'シニア世代（50代、60代、70代以上）専用のMBTI性格診断テスト。16タイプの性格分析で退職後の人生設計をサポート。',
    url: 'https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2847',
      bestRating: '5',
      worstRating: '1'
    }
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'シニアMBTIとは何ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'シニアMBTIは、50代以上の中高年・高齢者向けに特化したMBTI性格診断テストです。退職後の人生設計、趣味活動、人間関係の構築に役立つ16タイプの性格分析を提供します。'
        }
      },
      {
        '@type': 'Question',
        name: 'テストは無料ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、シニアMBTI診断テストは完全無料でご利用いただけます。会員登録も不要で、すぐに診断を始められます。'
        }
      },
      {
        '@type': 'Question',
        name: 'テストにはどのくらい時間がかかりますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '約10-15分程度で完了します。全12問の質問に答えるだけで、あなたのMBTIタイプと詳細な性格分析結果が得られます。'
        }
      },
      {
        '@type': 'Question',
        name: '結果はどのように活用できますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '診断結果は、退職後の生活設計、趣味仲間探し、家族関係の改善、ボランティア活動での役割選択など、シニアライフの様々な場面で活用できます。'
        }
      }
    ]
  }

  return (
    <html lang="ja">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4P52DP61LP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4P52DP61LP');
            `,
          }}
        />
        
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#4F46E5" />
        
        {/* 追加のSEOメタタグ */}
        <meta name="author" content="シニアMBTI専門チーム" />
        <meta name="copyright" content="© 2024 シニアMBTI" />
        <meta name="rating" content="general" />
        
        {/* 다국어 SEO 최적화 */}
        <link rel="alternate" hrefLang="ja" href="https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app" />
        <link rel="alternate" hrefLang="ko" href="https://seniormbtis-projects.vercel.app" />
        <link rel="alternate" hrefLang="en" href="https://senior-mbti-en.vercel.app" />
        <link rel="alternate" hrefLang="zh" href="https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app" />
        <link rel="alternate" hrefLang="x-default" href="https://seniormbtis-projects.vercel.app" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3506846365049386"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="bg-gradient-to-br min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}