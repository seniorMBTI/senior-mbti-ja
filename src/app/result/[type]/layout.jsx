// シニアMBTI人格タイプキーワード
const mbtiKeywords = {
  'INTJ': '建築家INTJ, シニアINTJ, 60+INTJ, 退職INTJ, INTJ性格, INTJ特徴, INTJ職業, INTJ相性, INTJ関係',
  'INTP': '論理学者INTP, シニアINTP, 60+INTP, 退職INTP, INTP性格, INTP特徴, INTP職業, INTP相性, INTP関係',
  'ENTJ': '指揮官ENTJ, シニアENTJ, 60+ENTJ, 退職ENTJ, ENTJ性格, ENTJ特徴, ENTJ職業, ENTJ相性, ENTJ関係',
  'ENTP': '討論者ENTP, シニアENTP, 60+ENTP, 退職ENTP, ENTP性格, ENTP特徴, ENTP職業, ENTP相性, ENTP関係',
  'INFJ': '提唱者INFJ, シニアINFJ, 60+INFJ, 退職INFJ, INFJ性格, INFJ特徴, INFJ職業, INFJ相性, INFJ関係',
  'INFP': '仲介者INFP, シニアINFP, 60+INFP, 退職INFP, INFP性格, INFP特徴, INFP職業, INFP相性, INFP関係',
  'ENFJ': '主人公ENFJ, シニアENFJ, 60+ENFJ, 退職ENFJ, ENFJ性格, ENFJ特徴, ENFJ職業, ENFJ相性, ENFJ関係',
  'ENFP': '広報運動家ENFP, シニアENFP, 60+ENFP, 退職ENFP, ENFP性格, ENFP特徴, ENFP職業, ENFP相性, ENFP関係',
  'ISTJ': '管理者ISTJ, シニアISTJ, 60+ISTJ, 退職ISTJ, ISTJ性格, ISTJ特徴, ISTJ職業, ISTJ相性, ISTJ関係',
  'ISFJ': '擁護者ISFJ, シニアISFJ, 60+ISFJ, 退職ISFJ, ISFJ性格, ISFJ特徴, ISFJ職業, ISFJ相性, ISFJ関係',
  'ESTJ': '幹部ESTJ, シニアESTJ, 60+ESTJ, 退職ESTJ, ESTJ性格, ESTJ特徴, ESTJ職業, ESTJ相性, ESTJ関係',
  'ESFJ': '領事ESFJ, シニアESFJ, 60+ESFJ, 退職ESFJ, ESFJ性格, ESFJ特徴, ESFJ職業, ESFJ相性, ESFJ関係',
  'ISTP': '巨匠ISTP, シニアISTP, 60+ISTP, 退職ISTP, ISTP性格, ISTP特徴, ISTP職業, ISTP相性, ISTP関係',
  'ISFP': '冒険家ISFP, シニアISFP, 60+ISFP, 退職ISFP, ISFP性格, ISFP特徴, ISFP職業, ISFP相性, ISFP関係',
  'ESTP': '起業家ESTP, シニアESTP, 60+ESTP, 退職ESTP, ESTP性格, ESTP特徴, ESTP職業, ESTP相性, ESTP関係',
  'ESFP': 'エンターテイナーESFP, シニアESFP, 60+ESFP, 退職ESFP, ESFP性格, ESFP特徴, ESFP職業, ESFP相性, ESFP関係'
};

// MBTI人格タイプ詳細説明
const mbtiDescriptions = {
  'INTJ': '60+シニアINTJ建築家人格タイプの詳細分析。退職後のINTJの体系的思考と独立的なライフスタイル選好を探索。彼らの特徴、強み、相性分析を確認してください。',
  'INTP': '60+シニアINTP論理学者人格タイプの詳細分析。INTPが退職後も維持する分析的思考と知的好奇心について学習。彼らの特徴、強み、相性分析を確認してください。',
  'ENTJ': '60+シニアENTJ指揮官人格タイプの詳細分析。ENTJが退職後も維持するリーダーシップと挑戦精神を理解。彼らの特徴、強み、相性分析を探索してください。',
  'ENTP': '60+シニアENTP討論者人格タイプの詳細分析。ENTPが退職中に楽しむ創造的思考と新しい挑戦への愛を発見。彼らの特徴、強み、相性分析を確認してください。',
  'INFJ': '60+シニアINFJ提唱者人格タイプの詳細分析。INFJが退職時に追求する深い洞察と意味のある関係について学習。彼らの特徴、強み、相性分析を探索してください。',
  'INFP': '60+シニアINFP仲介者人格タイプの詳細分析。INFPが退職後も維持する価値駆動型と自由精神の性質を理解。彼らの特徴、強み、相性分析を確認してください。',
  'ENFJ': '60+シニアENFJ主人公人格タイプの詳細分析。ENFJが退職時に継続する他者への思いやりと社会貢献を発見。彼らの特徴、強み、相性分析を探索してください。',
  'ENFP': '60+シニアENFP広報運動家人格タイプの詳細分析。ENFPが退職後も維持する情熱的で積極的なエネルギーについて学習。彼らの特徴、強み、相性分析を確認してください。',
  'ISTJ': '60+シニアISTJ管理者人格タイプの詳細分析。ISTJが退職時に示す責任感と体系的生活選好を理解。彼らの特徴、強み、相性分析を探索してください。',
  'ISFJ': '60+シニアISFJ擁護者人格タイプの詳細分析。ISFJが退職時に提供する献身的で温かい介護を発見。彼らの特徴、強み、相性分析を確認してください。',
  'ESTJ': '60+シニアESTJ幹部人格タイプの詳細分析。ESTJが退職後も実証する効率性と組織スキルについて学習。彼らの特徴、強み、相性分析を探索してください。',
  'ESFJ': '60+シニアESFJ領事人格タイプの詳細分析。ESFJが退職時に継続する温かい社交性と介護を理解。彼らの特徴、強み、相性分析を確認してください。',
  'ISTP': '60+シニアISTP巨匠人格タイプの詳細分析。ISTPが退職時に好む実用的で論理的アプローチを発見。彼らの特徴、強み、相性分析を探索してください。',
  'ISFP': '60+シニアISFP冒険家人格タイプの詳細分析。ISFPが退職後も維持する芸術的感覚と自由精神の性質について学習。彼らの特徴、強み、相性分析を確認してください。',
  'ESTP': '60+シニアESTP起業家人格タイプの詳細分析。ESTPが退職時に生活する現在重視の楽しさと活動的ライフスタイルを理解。彼らの特徴、強み、相性分析を探索してください。',
  'ESFP': '60+シニアESFPエンターテイナー人格タイプの詳細分析。ESFPが退職後も楽しむ喜びと社交活動を発見。彼らの特徴、強み、相性分析を確認してください。'
};

export async function generateMetadata({ params }) {
  const resultId = params.type.toUpperCase();
  const keywords = mbtiKeywords[resultId] || `${resultId}, MBTI結果, シニアMBTI, 性格タイプ, MBTI相性, 黄金期`;
  const description = mbtiDescriptions[resultId] || `${resultId} 性格タイプの詳細な分析結果です。相性の良いMBTIタイプと努力が必要なMBTIタイプを確認し、これからの人生での理想的なパートナーを見つけましょう。`;
  
  return {
    title: `シニアMBTI ${resultId} 性格タイプ結果 | 60+ ${resultId} 特徴及び相性分析`,
    description,
    keywords,
    openGraph: {
      title: `シニアMBTI結果 - ${resultId} タイプ`,
      description: `${resultId} 性格タイプ詳細分析結果。相性の良いMBTIタイプと努力が必要なMBTIタイプを確認し、有意義な関係を築きましょう。`,
      type: 'website',
      locale: 'ja_JP',
      url: `https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app/result/${resultId}`,
      siteName: 'シニアMBTI',
      images: [
        {
          url: `/images/mbti-result-${resultId.toLowerCase()}-ja.jpg`,
          width: 1200,
          height: 630,
          alt: `${resultId} 性格タイプ結果 - シニアMBTI`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `シニアMBTI結果 - ${resultId} タイプ`,
      description: `${resultId} 性格タイプ詳細分析結果。相性の良いMBTIタイプと努力が必要なMBTIタイプを確認し、有意義な関係を築きましょう。`,
      images: [`/images/mbti-result-${resultId.toLowerCase()}-ja.jpg`]
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
  }
}

export default function ResultLayout({ children, params }) {
  const resultId = params.type.toUpperCase();
  
  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3506846365049386"
        crossOrigin="anonymous"
      />
      
      {/* 構造化データ - TestResults Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TestResults",
            "name": `シニアMBTI ${resultId} 性格タイプ結果`,
            "description": mbtiDescriptions[resultId] || `${resultId} 性格タイプ結果`,
            "result": {
              "@type": "PsychologicalTrait",
              "name": `MBTI ${resultId} タイプ`,
              "description": `マイヤーズ・ブリッグス性格タイプ ${resultId}`
            },
            "mainEntity": {
              "@type": "Person",
              "description": `${resultId} 性格タイプを持つシニア`
            },
            "provider": {
              "@type": "Organization",
              "name": "シニアMBTI専門研究チーム",
              "url": "https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app"
            },
            "datePublished": new Date().toISOString(),
            "inLanguage": "ja-JP",
            "isAccessibleForFree": true
          })
        }}
      />
      
      {/* BreadcrumbList 構造化データ */}
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
                "name": "性格テストアンケート調査",
                "item": "https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app/survey"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": `${resultId} タイプ結果`,
                "item": `https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app/result/${resultId.toLowerCase()}`
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}