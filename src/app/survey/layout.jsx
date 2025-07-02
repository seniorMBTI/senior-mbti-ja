// AdSense最適化SEOメタデータ - シニアMBTI診断
export const metadata = {
  title: 'シニアMBTI性格診断 | 中高年性格テスト | 定年後の自己発見',
  description: '60歳以上のシニア向けに設計された24問のMBTI性格タイプ診断です。定年後の新しい人生とライフスタイルのための専門的心理分析を受けましょう。シニア向けカスタマイズ質問で正確な性格診断を提供します。',
  keywords: 'シニアMBTI診断, 中高年性格テスト, 60代性格分析, 定年後心理検査, シニア自己発見, 黄金期性格診断, 中高年心理カウンセリング, シニアライフコーチング',
  openGraph: {
    title: 'シニアMBTI性格診断 - 24問であなたの性格タイプを知る',
    description: '60歳以上のシニア向け専門MBTI診断です。24の簡単な質問であなたの性格タイプと相性を知りましょう。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app/survey',
    siteName: 'シニアMBTI',
    images: [
      {
        url: '/images/senior-mbti-survey-ja.jpg',
        width: 1200,
        height: 630,
        alt: 'シニアMBTI性格診断アンケート - 24問であなたの性格タイプを知る'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'シニアMBTI性格診断 - 24問であなたの性格タイプを知る',
    description: '60歳以上のシニア向け専門MBTI診断です。24の簡単な質問であなたの性格タイプと相性を知りましょう。',
    images: ['/images/senior-mbti-survey-ja.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app/survey',
    languages: {
      'ko-KR': 'https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app/survey',
      'en-US': 'https://senior-mbti-l3zee5a4g-seniormbtis-projects.vercel.app/survey',
      'zh-CN': 'https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app/survey',
      'ja-JP': 'https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app/survey'
    }
  }
};

export default function SurveyLayout({ children }) {
  return (
    <>
      {/* Google AdSenseスクリプト */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
        crossOrigin="anonymous"
      />
      
      {/* Google AdSense自動広告有効化 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-YOUR_PUBLISHER_ID",
              enable_page_level_ads: true,
              page_level_ads_config: {
                level: "minor"
              }
            });
          `
        }}
      />
      
      {/* 構造化データ - アンケートQuiz Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": "シニアMBTI性格タイプ診断",
            "description": "60歳以上の中高年向けに設計された24問のMBTI性格タイプ診断",
            "about": {
              "@type": "Thing",
              "name": "MBTI性格タイプ",
              "description": "マイヤーズ・ブリッグス・タイプ指標"
            },
            "numberOfQuestions": 24,
            "timeRequired": "PT5M",
            "educationalLevel": "Adult",
            "audience": {
              "@type": "Audience",
              "audienceType": "シニア, 中高年, 60歳以上"
            },
            "provider": {
              "@type": "Organization",
              "name": "シニアMBTI専門研究チーム",
              "url": "https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "JPY",
              "availability": "https://schema.org/InStock"
            },
            "inLanguage": "ja-JP",
            "isAccessibleForFree": true,
            "learningResourceType": "Assessment",
            "assesses": [
              "性格タイプ",
              "MBTI性格分析",
              "人間関係相性",
              "ライフスタイル適合性"
            ]
          })
        }}
      />
      
      {/* BreadcrumbList構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "シニアMBTIホーム",
                "item": "https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "性格診断アンケート",
                "item": "https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app/survey"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}