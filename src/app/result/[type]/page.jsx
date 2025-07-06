'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

// MBTIタイプ別相性情報
const mbtiCompatibility = {
  'INTJ': {
    bestMatch: ['ENFP', 'ENTP', 'INFJ'],
    goodMatch: ['INTJ', 'INFP', 'ENTJ'],
    challengingMatch: ['ESFJ', 'ISFJ', 'ESTJ']
  },
  'INTP': {
    bestMatch: ['ENFJ', 'ENTJ', 'INFJ'],
    goodMatch: ['INTP', 'ENTP', 'INTJ'],
    challengingMatch: ['ESFJ', 'ISFJ', 'ESTJ']
  },
  'ENTJ': {
    bestMatch: ['INFP', 'INTP', 'ENFP'],
    goodMatch: ['ENTJ', 'INTJ', 'ENTP'],
    challengingMatch: ['ISFP', 'INFP', 'ESFP']
  },
  'ENTP': {
    bestMatch: ['INFJ', 'INTJ', 'ENFJ'],
    goodMatch: ['ENTP', 'ENFP', 'ENTJ'],
    challengingMatch: ['ISTJ', 'ISFJ', 'ESTJ']
  },
  'INFJ': {
    bestMatch: ['ENTP', 'ENFP', 'INTJ'],
    goodMatch: ['INFJ', 'INFP', 'ENFJ'],
    challengingMatch: ['ESTP', 'ESFP', 'ISTP']
  },
  'INFP': {
    bestMatch: ['ENFJ', 'ENTJ', 'ENFP'],
    goodMatch: ['INFP', 'INFJ', 'ISFP'],
    challengingMatch: ['ESTJ', 'ENTJ', 'ESTP']
  },
  'ENFJ': {
    bestMatch: ['INFP', 'ISFP', 'INTP'],
    goodMatch: ['ENFJ', 'ENFP', 'INFJ'],
    challengingMatch: ['ISTP', 'ESTP', 'ISTJ']
  },
  'ENFP': {
    bestMatch: ['INTJ', 'INFJ', 'ENFJ'],
    goodMatch: ['ENFP', 'ENTP', 'INFP'],
    challengingMatch: ['ISTJ', 'ESTJ', 'ISTP']
  },
  'ISTJ': {
    bestMatch: ['ESFP', 'ESTP', 'ISFP'],
    goodMatch: ['ISTJ', 'ISFJ', 'ESTJ'],
    challengingMatch: ['ENFP', 'ENTP', 'INFP']
  },
  'ISFJ': {
    bestMatch: ['ESFP', 'ESTP', 'ENFP'],
    goodMatch: ['ISFJ', 'ISTJ', 'ESFJ'],
    challengingMatch: ['ENTP', 'ENTJ', 'INTP']
  },
  'ESTJ': {
    bestMatch: ['ISFP', 'INFP', 'ISTP'],
    goodMatch: ['ESTJ', 'ISTJ', 'ESFJ'],
    challengingMatch: ['INFP', 'ENFP', 'INTP']
  },
  'ESFJ': {
    bestMatch: ['ISFP', 'INFP', 'ISTP'],
    goodMatch: ['ESFJ', 'ISFJ', 'ESTJ'],
    challengingMatch: ['INTP', 'INTJ', 'ENTP']
  },
  'ISTP': {
    bestMatch: ['ESFJ', 'ESTJ', 'ENFJ'],
    goodMatch: ['ISTP', 'ESTP', 'ISFP'],
    challengingMatch: ['ENFJ', 'INFJ', 'ENFP']
  },
  'ISFP': {
    bestMatch: ['ENFJ', 'ESFJ', 'ESTJ'],
    goodMatch: ['ISFP', 'INFP', 'ESFP'],
    challengingMatch: ['ENTJ', 'ESTJ', 'ENTP']
  },
  'ESTP': {
    bestMatch: ['ISFJ', 'ISTJ', 'INFJ'],
    goodMatch: ['ESTP', 'ESFP', 'ISTP'],
    challengingMatch: ['INFJ', 'INTJ', 'INFP']
  },
  'ESFP': {
    bestMatch: ['ISTJ', 'ISFJ', 'INTJ'],
    goodMatch: ['ESFP', 'ENFP', 'ISFP'],
    challengingMatch: ['INTJ', 'ENTJ', 'INTP']
  }
};

// 完全な16個のMBTIタイプデータ
const mbtiTypes = {
  'INTJ': {
    type: 'INTJ',
    title: 'シニア戦略的設計者',
    subtitle: '未来を見通す知恵深い戦略家',
    description: '長い人生経験から培われた知恵をもとに、体系的で論理的な思考をお持ちになり、未来を見通す洞察力をお持ちでいらっしゃいます。',
    strengths: ['優れた戦略的思考力', '独立した判断力', '体系的な計画立案能力', '深い洞察力', '目標指向の実行力'],
    challenges: ['完璧主義的傾向', '感情表現の困難さ', '批判的な視点', '変化への抵抗'],
    careers: ['コンサルタント', '研究者', '企画者', '作家', '投資専門家'],
    relationships: '信頼できる少数の方との深い関係をお好みになり、知的な交流を重要視されます。',
    seniorTips: ['定期的な知的活動で脳の健康を維持してください', '読書と学習で認知機能を保ってください', '長期計画を立てて目標を実現してください', '同じ志を持つ方々と深いつながりを築いてください'],
    healthTips: ['規則的な読書で認知機能を維持してください', '適度な運動で血液循環を改善してください', '十分な睡眠で脳の健康を保ってください', '社交活動で精神的健康を維持してください'],
    emoji: '🔮',
    color: '#6366f1',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  'INTP': {
    type: 'INTP', 
    title: 'シニア思索学者',
    subtitle: '好奇心旺盛な知識探求者',
    description: '生涯にわたる学習と探求を通じて深い知識を蓄積されており、新しいアイデアを探求することをお楽しみになられます。',
    strengths: ['優れた分析力', '創造的思考', '論理的推論力', '知的好奇心', '客観的判断力'],
    challenges: ['現実的応用の困難さ', '感情的コミュニケーション不足', '優柔不断さ', '細部の見落とし'],
    careers: ['研究者', '教授', 'アナリスト', '哲学者', '発明家'],
    relationships: '知的対話を楽しめる相手をお好みになり、個人的な空間を重要視されます。',
    emoji: '🤔',
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)'
  },
  'ENTJ': {
    type: 'ENTJ',
    title: 'シニア指導者',
    subtitle: '経験豊富なリーダーシップの模範',
    description: '長い経験を通じて培われたリーダーシップで周囲の方々を導かれ、明確な目標達成のために体系的に行動なさいます。',
    strengths: ['強力なリーダーシップ', '戦略的思考', '決断力', '組織運営能力', '効率的実行力'],
    challenges: ['頑固さ', '感情への配慮不足', '権威的傾向', '細部の見落とし'],
    careers: ['経営陣', 'プロジェクト管理者', '講師', 'カウンセラー', '団体リーダー'],
    relationships: '目標指向で互いに成長できる関係をお求めになり、率直なコミュニケーションをお好みになります。',
    emoji: '👑',
    color: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
  },
  'ENTP': {
    type: 'ENTP',
    title: 'シニア革新者',
    subtitle: '創造的アイデアの源泉',
    description: '豊富な経験をもとに新しいアイデアを絶えず創出され、変化と革新を通じて活力をお得になります。',
    strengths: ['創造的発想力', '適応力', '説得力', '挑戦精神', '幅広い関心'],
    challenges: ['集中力不足', '一貫性の欠如', '細部への注意不足', '現実性の不足'],
    careers: ['起業家', '発明家', '講演者', '企画者', '文化芸術活動家'],
    relationships: '知的刺激を与える多様な方々との交流をお楽しみになり、新しいアイデアを共有することをお好みになります。',
    emoji: '💡',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
  },
  'INFJ': {
    type: 'INFJ',
    title: 'シニア賢者',
    subtitle: '深い洞察力をお持ちの助言者',
    description: '生涯の経験で培われた深い洞察力で他者を理解し助けることに献身され、意味のある価値をお求めになります。',
    strengths: ['深い洞察力', '共感能力', '理想主義', '献身的態度', '創造的思考'],
    challenges: ['過度な完璧主義', '燃え尽き症候群のリスク', '対立回避', '現実性の不足'],
    careers: ['カウンセラー', '教育者', '作家', '社会奉仕者', '芸術家'],
    relationships: '誠実で深い関係をお求めになり、相手の成長と幸福を心から願われます。',
    emoji: '🌟',
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
  },
  'INFP': {
    type: 'INFP',
    title: 'シニア調停者',
    subtitle: '温かい心の平和主義者',
    description: '生涯にわたる人間への深い理解で調和のある環境を作り上げられ、個人の価値と信念を大切になさいます。',
    strengths: ['高い共感能力', '創造性', '個人的価値の追求', '適応力', '調和の追求'],
    challenges: ['過度な理想主義', '対立回避', '優柔不断さ', '現実逃避'],
    careers: ['作家', '芸術家', 'カウンセラー', '教育者', '社会福祉士'],
    relationships: '真実で意味のある関係を重視され、相手の個性と価値を尊重されます。',
    emoji: '🕊️',
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)'
  },
  'ENFJ': {
    type: 'ENFJ',
    title: 'シニア先生',
    subtitle: '温かい心の人生メンター',
    description: '豊富な人生経験をもとに他者の成長を助けられ、共同体の和合と発展のために献身されます。',
    strengths: ['優れたコミュニケーション能力', '他者への関心', 'リーダーシップ', '共感能力', '動機付け'],
    challenges: ['自己犠牲的傾向', '批判への敏感さ', '過度な介入', '境界設定の困難さ'],
    careers: ['教育者', 'カウンセラー', '社会奉仕者', '講師', '宗教家'],
    relationships: '他者の潜在能力を引き出し成長を助けることを喜びとされ、温かく支援的な関係を築かれます。',
    emoji: '🌻',
    color: '#f97316',
    bgGradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
  },
  'ENFP': {
    type: 'ENFP',
    title: 'シニア活動家',
    subtitle: '情熱的な人生の応援者',
    description: '溢れる情熱とポジティブなエネルギーで周囲の方々にインスピレーションを与えられ、新しい可能性を発見し実現することに優れていらっしゃいます。',
    strengths: ['優れたコミュニケーション', '創造的問題解決', '情熱とエネルギー', '他者の動機付け', '適応力'],
    challenges: ['集中力不足', '一貫性の欠如', '過度な楽観主義', '実務処理の困難さ'],
    careers: ['講演者', '文化企画者', 'カウンセラー', '教育者', '芸術家'],
    relationships: '多様な方々とエネルギーを分かち合い、互いにインスピレーションを与え合う活気ある関係をお好みになります。',
    emoji: '🎪',
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)'
  },
  'ISTJ': {
    type: 'ISTJ',
    title: 'シニア守護者',
    subtitle: '信頼できる伝統の守り手',
    description: '生涯にわたる誠実さと責任感で周囲の方々の頼もしい支えとなられ、安定的で体系的な人生をお求めになります。',
    strengths: ['高い責任感', '体系的アプローチ', '信頼性', 'きめ細やかさ', '忍耐力'],
    challenges: ['変化への抵抗', '融通性の不足', '感情表現の困難さ', '新しいアイデア受容の困難さ'],
    careers: ['管理者', '会計士', '公務員', '教育者', '専門技術者'],
    relationships: '信頼と安定性をもとにした長期的で深い関係を重視され、約束を守ることを重要視されます。',
    emoji: '🏛️',
    color: '#374151',
    bgGradient: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)'
  },
  'ISFJ': {
    type: 'ISFJ',
    title: 'シニア保護者',
    subtitle: '温かい心の世話役',
    description: '生涯にわたる献身と奉仕で家族や共同体をお世話され、他者のニーズを先に考える温かい心をお持ちでいらっしゃいます。',
    strengths: ['優れた世話能力', '細やかな配慮', '責任感', '協力的態度', '伝統重視'],
    challenges: ['自己主張不足', '過度な自己犠牲', '変化適応の困難さ', '対立回避'],
    careers: ['介護士', '社会福祉士', '教育者', 'カウンセラー', '宗教家'],
    relationships: '相手を細やかに配慮し支援することを喜びとされ、安定的で信頼できる関係をお求めになります。',
    emoji: '🤱',
    color: '#059669',
    bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  'ESTJ': {
    type: 'ESTJ',
    title: 'シニア管理者',
    subtitle: '経験豊富な組織の柱',
    description: '長い経験で培われた組織運営能力で効率的なシステムを作り管理され、実用的で現実的なアプローチをお求めになります。',
    strengths: ['優れた組織力', '実用的思考', 'リーダーシップ', '決断力', '責任感'],
    challenges: ['頑固さ', '感情への配慮不足', '変化への抵抗', '細部への執着'],
    careers: ['管理者', '事業家', '公務員', '教育行政家', '団体運営者'],
    relationships: '明確な役割と責任をもとにした体系的な関係をお好みになり、相互尊重と信頼を重視されます。',
    emoji: '📊',
    color: '#b91c1c',
    bgGradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
  },
  'ESFJ': {
    type: 'ESFJ',
    title: 'シニア協力者',
    subtitle: '共同体の温かい求心点',
    description: '豊富な人間関係経験で共同体の和合を図られ、すべての方が快適で幸せになれるよう細やかに配慮されます。',
    strengths: ['優れた対人関係', '協力的態度', '責任感', '実用的支援', '調和の追求'],
    challenges: ['批判への敏感さ', '対立ストレス', '自己主張不足', '変化適応の困難さ'],
    careers: ['教育者', 'カウンセラー', '社会奉仕者', 'イベント企画者', '接客業'],
    relationships: 'すべての方が包含され大切にされる温かく調和のとれた関係を築くことを重視されます。',
    emoji: '🤗',
    color: '#d97706',
    bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  'ISTP': {
    type: 'ISTP',
    title: 'シニア職人',
    subtitle: '実用的知恵の持ち主',
    description: '生涯にわたる実務経験で実用的な問題解決能力を身につけられ、手で直接作り修理することをお楽しみになります。',
    strengths: ['優れた問題解決力', '実用的思考', '器用さ', '独立性', '冷静さ'],
    challenges: ['感情表現の困難さ', '長期計画不足', 'チームワークの困難さ', 'ルーティン業務への退屈さ'],
    careers: ['技術者', '修理専門家', '工芸家', '農業従事者', '機械操作員'],
    relationships: '実質的な助けを通じて関心を表現され、相手の独立性を尊重する楽な関係をお好みになります。',
    emoji: '🔧',
    color: '#7c2d12',
    bgGradient: 'linear-gradient(135deg, #a3a3a3 0%, #525252 100%)'
  },
  'ISFP': {
    type: 'ISFP',
    title: 'シニア芸術家',
    subtitle: '静かな美しさの創造者',
    description: '生涯にわたる美的感覚と繊細な感性で美しさを創造され、個人の価値と調和のある人生をお求めになります。',
    strengths: ['芸術的感覚', '共感能力', '柔軟性', '個人的価値追求', '細やかな観察力'],
    challenges: ['自己主張不足', '対立回避', '現実的問題解決の困難さ', 'ストレスへの敏感さ'],
    careers: ['芸術家', 'デザイナー', '音楽家', '作家', '治療士'],
    relationships: '真実で深い感情的つながりを重視され、相手の個性と感情を細やかに配慮されます。',
    emoji: '🎨',
    color: '#7c3aed',
    bgGradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)'
  },
  'ESTP': {
    type: 'ESTP',
    title: 'シニア冒険者',
    subtitle: '活動的な人生の楽しみ手',
    description: '豊富な人生経験をもとに現在の瞬間をお楽しみになり、実用的で柔軟なアプローチで問題を解決されます。',
    strengths: ['優れた適応力', '実用的問題解決', '社交性', '現実感覚', '行動力'],
    challenges: ['計画性不足', '衝動的行動', '長期的視点不足', '細部の見落とし'],
    careers: ['営業職', 'サービス業', '運動コーチ', 'イベント企画者', '緊急対応要員'],
    relationships: '活動的で楽しい経験を共に分かち合うことをお楽しみになり、自然で楽な関係をお好みになります。',
    emoji: '🏃',
    color: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)'
  },
  'ESFP': {
    type: 'ESFP',
    title: 'シニア エンターテイナー',
    subtitle: '温かい心のムードメーカー',
    description: '溢れるエネルギーと温かい心で周囲の方々に喜びをお届けし、現在の瞬間を大切にしお楽しみになります。',
    strengths: ['優れた社交性', 'ポジティブエネルギー', '共感能力', '柔軟性', '実用的支援'],
    challenges: ['計画性不足', '批判への敏感さ', '対立ストレス', '長期目標設定の困難さ'],
    careers: ['教育者', 'カウンセラー', 'エンターテイナー', 'イベント企画者', 'サービス業'],
    relationships: 'すべての方が幸せで楽しい気持ちになることを見ることを喜びとされ、温かく活気ある関係を築かれます。',
    emoji: '🌈',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #fde047 0%, #f59e0b 100%)'
  }
};

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const [resultData, setResultData] = useState(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const shareButtonRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: '50%', left: '50%' });

  // サーバーサイド対応のデータ処理
  useEffect(() => {
    // URLパラメータから直接MBTIタイプを取得
    const mbtiType = params.type?.toUpperCase();
    
    if (mbtiType) {
      // 有効なMBTIタイプかチェック
      const validTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
                         'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
      
      if (validTypes.includes(mbtiType)) {
        // localStorageから既存の結果をチェック（クライアントサイドのみ）
        let storedResult = null;
        try {
          if (typeof window !== 'undefined') {
            storedResult = localStorage.getItem(`mbti-result-${mbtiType}`);
            if (storedResult) {
              storedResult = JSON.parse(storedResult);
            }
          }
        } catch (error) {
          console.warn('Error reading localStorage:', error);
        }
        
        // MBTIタイプパラメータから結果データを生成
        setResultData({
          mbtiType: mbtiType,
          timestamp: storedResult?.timestamp || Date.now(),
          isDirectLink: true,
          scores: storedResult?.scores || null,
          answers: storedResult?.answers || null
        });
      } else {
        // 無効なMBTIタイプの場合はホームにリダイレクト
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [params.type, router]);

  // クライアントサイドメタタグ更新（サーバーサイド対応）
  useEffect(() => {
    if (resultData && typeof window !== 'undefined') {
      const mbtiType = resultData.mbtiType;
      const mbtiInfo = mbtiTypes[mbtiType];
      
      if (mbtiInfo) {
        // ページタイトル更新
        document.title = `${mbtiType} ${mbtiInfo.title} - シニアMBTI結果`;
        
        // メタタグ更新関数
        const updateMetaTag = (property, content) => {
          try {
            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
              meta = document.createElement('meta');
              meta.setAttribute('property', property);
              document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
          } catch (error) {
            console.warn('Meta tag update failed:', error);
          }
        };

        const updateNameMetaTag = (name, content) => {
          try {
            let meta = document.querySelector(`meta[name="${name}"]`);
            if (!meta) {
              meta = document.createElement('meta');
              meta.setAttribute('name', name);
              document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
          } catch (error) {
            console.warn('Name meta tag update failed:', error);
          }
        };

        // MBTIタイプ専用コンテンツでメタタグ更新
        updateMetaTag('og:title', `${mbtiType} ${mbtiInfo.title} - シニアMBTI結果`);
        updateMetaTag('og:description', `あなたのMBTIは${mbtiType} ${mbtiInfo.title}です。${mbtiInfo.subtitle} ${mbtiInfo.description.substring(0, 100)}...`);
        updateMetaTag('og:image', `https://jp.seniormbti.com/${mbtiType}-jp.png`);
        updateMetaTag('og:url', window.location.href);
        updateMetaTag('og:type', 'website');
        
        updateNameMetaTag('description', `あなたのMBTIは${mbtiType} ${mbtiInfo.title}です。${mbtiInfo.subtitle} ${mbtiInfo.description.substring(0, 100)}...`);
        updateNameMetaTag('twitter:title', `${mbtiType} ${mbtiInfo.title} - シニアMBTI結果`);
        updateNameMetaTag('twitter:description', `あなたのMBTIは${mbtiType} ${mbtiInfo.title}です。${mbtiInfo.subtitle}`);
        updateNameMetaTag('twitter:image', `https://jp.seniormbti.com/${mbtiType}-jp.png`);
        updateNameMetaTag('twitter:card', 'summary_large_image');
      }
    }
  }, [resultData]);

  const handleShareClick = () => {
    if (shareButtonRef.current) {
      const rect = shareButtonRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // 모바일에서도 버튼 중심으로 표시하되, 화면 경계 고려
      let top = rect.top + scrollTop + rect.height / 2;
      let left = rect.left + scrollLeft + rect.width / 2;
      
      // 모바일 화면에서 경계를 벗어나지 않도록 조정
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        const modalWidth = Math.min(400, window.innerWidth - 40);
        const modalHeight = 200; // 대략적인 모달 높이
        
        // 좌우 경계 체크
        if (left - modalWidth / 2 < 20) {
          left = modalWidth / 2 + 20;
        } else if (left + modalWidth / 2 > window.innerWidth - 20) {
          left = window.innerWidth - modalWidth / 2 - 20;
        }
        
        // 상하 경계 체크
        if (top - modalHeight / 2 < 20) {
          top = modalHeight / 2 + 20;
        } else if (top + modalHeight / 2 > window.innerHeight + scrollTop - 20) {
          top = window.innerHeight + scrollTop - modalHeight / 2 - 20;
        }
      }
      
      setModalPosition({ top, left });
    }
    setShowShareDialog(true);
  };

  const copyResultLink = () => {
    if (typeof window !== 'undefined' && resultData) {
      // クリーンなMBTIタイプURLで共有
      const shareUrl = `${window.location.origin}/result/${resultData.mbtiType.toLowerCase()}`;
      navigator.clipboard.writeText(shareUrl);
      setShowCopySuccess(true);
      setTimeout(() => {
        setShowCopySuccess(false);
        setShowShareDialog(false);
      }, 2000);
    }
  };

  if (!resultData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>結果を読み込み中です...</p>
        
        <style jsx>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const typeInfo = mbtiTypes[resultData?.mbtiType] || mbtiTypes['INTJ'];

  return (
    <>
      <div className="result-container">
      {/* ヒーローセクション */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="type-badge">
            <span className="type-emoji">{typeInfo.emoji}</span>
            <div className="type-info">
              <h1 className="type-title">{typeInfo.type}</h1>
              <p className="type-subtitle">{typeInfo.title}</p>
            </div>
          </div>
          
          <h2 className="hero-title">{typeInfo.subtitle}</h2>
          <p className="hero-description">{typeInfo.description}</p>
          
          <div className="action-buttons">
            <button 
              ref={shareButtonRef}
              className="share-button"
              onClick={handleShareClick}
            >
              <span>🔗</span> 結果を共有する
            </button>
            <button 
              className="home-button"
              onClick={() => router.push('/')}
            >
              <span>🏠</span> 再テスト
            </button>
          </div>
        </div>
      </div>

      {/* 詳細分析セクション */}
      <div className="analysis-section">
        <div className="analysis-grid">
          {/* 強みカード */}
          <div className="analysis-card strengths-card">
            <div className="card-header">
              <h3>💪 主な強み</h3>
            </div>
            <div className="card-content">
              {typeInfo.strengths.map((strength, index) => (
                <div key={index} className="strength-item">
                  <span className="bullet">✨</span>
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 課題カード */}
          <div className="analysis-card challenges-card">
            <div className="card-header">
              <h3>🎯 成長ポイント</h3>
            </div>
            <div className="card-content">
              {typeInfo.challenges.map((challenge, index) => (
                <div key={index} className="challenge-item">
                  <span className="bullet">🔍</span>
                  <span>{challenge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 推奨活動カード */}
          <div className="analysis-card careers-card">
            <div className="card-header">
              <h3>🌟 推奨活動</h3>
            </div>
            <div className="card-content">
              {typeInfo.careers.map((career, index) => (
                <div key={index} className="career-item">
                  <span className="bullet">🎨</span>
                  <span>{career}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 人間関係カード */}
          <div className="analysis-card relationships-card">
            <div className="card-header">
              <h3>❤️ 人間関係</h3>
            </div>
            <div className="card-content">
              <p className="relationship-text">{typeInfo.relationships}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 相性情報セクション */}
      <div className="compatibility-section">
        <div className="section-header">
          <h2>💕 MBTI相性分析</h2>
          <p>他のMBTIタイプとの相性を詳しく確認できます</p>
        </div>
        
        <div className="compatibility-grid">
          <div className="compatibility-card best-match">
            <div className="compatibility-header">
              <h3>💖 最高の相性</h3>
              <p>深いつながりを築きやすいタイプ</p>
            </div>
            <div className="compatibility-types">
              {resultData?.mbtiType && mbtiCompatibility[resultData.mbtiType]?.bestMatch.map((type, index) => (
                <div key={index} className="compatibility-type best">
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div className="compatibility-card good-match">
            <div className="compatibility-header">
              <h3>💚 良い相性</h3>
              <p>調和良く過ごせるタイプ</p>
            </div>
            <div className="compatibility-types">
              {resultData?.mbtiType && mbtiCompatibility[resultData.mbtiType]?.goodMatch.map((type, index) => (
                <div key={index} className="compatibility-type good">
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div className="compatibility-card challenging-match">
            <div className="compatibility-header">
              <h3>💔 最悪の相性</h3>
              <p>調和を保つために多大な努力と理解が必要なタイプ</p>
            </div>
            <div className="compatibility-types">
              {resultData?.mbtiType && mbtiCompatibility[resultData.mbtiType]?.challengingMatch.map((type, index) => (
                <div key={index} className="compatibility-type challenging">
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* シニア向けアドバイスセクション */}
      <div className="senior-advice-section">
        <div className="section-header">
          <h2>🌟 シニア世代専用アドバイス</h2>
          <p>豊かな人生のための専門的なガイダンス</p>
        </div>
        
        <div className="advice-grid">
          <div className="advice-card lifestyle-card">
            <div className="advice-header">
              <h3>🎯 ライフスタイル提案</h3>
              <p>充実した生活のためのご提案</p>
            </div>
            <div className="advice-content">
              {typeInfo.seniorTips && typeInfo.seniorTips.map((tip, index) => (
                <div key={index} className="advice-item">
                  <span className="advice-bullet">✨</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="advice-card health-card">
            <div className="advice-header">
              <h3>💪 健康管理アドバイス</h3>
              <p>心身の健康維持のための専門指導</p>
            </div>
            <div className="advice-content">
              {typeInfo.healthTips && typeInfo.healthTips.map((tip, index) => (
                <div key={index} className="advice-item">
                  <span className="advice-bullet">🌿</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 共有モーダル */}
      {showShareDialog && (
        <div className="modal-overlay" onClick={() => setShowShareDialog(false)}>
          <div 
            className="modal-content" 
            style={{
              position: 'absolute',
              top: modalPosition.top,
              left: modalPosition.left,
              transform: 'translate(-50%, -50%)',
              maxWidth: '90vw',
              maxHeight: '90vh'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>結果を共有する</h3>
              <button 
                className="close-button"
                onClick={() => setShowShareDialog(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {showCopySuccess ? (
                <div className="success-message">
                  <span className="success-icon">✅</span>
                  <p>リンクがクリップボードにコピーされました！</p>
                </div>
              ) : (
                <button className="copy-button" onClick={copyResultLink}>
                  <span>📋</span> リンクをコピー
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="result-footer">
        <div className="footer-content">
          <p className="footer-text">
            広告のお問い合わせ: <a href="mailto:seniorMBTI@gmail.com" className="footer-email">seniorMBTI@gmail.com</a>
          </p>
        </div>
      </footer>

      <style jsx>{`
        .result-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow-x: hidden;
        }

        .result-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 120, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero-section {
          position: relative;
          z-index: 10;
          padding: 60px 20px 80px;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 30px;
          padding: 24px 40px;
          margin-bottom: 40px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .type-emoji {
          font-size: 48px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .type-info {
          text-align: left;
        }

        .type-title {
          font-size: 48px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          letter-spacing: -1px;
        }

        .type-subtitle {
          font-size: 18px;
          color: #6B7280;
          margin: 8px 0 0 0;
          font-weight: 600;
        }

        .hero-title {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin-bottom: 24px;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .hero-description {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 48px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .action-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .share-button, .home-button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          border: none;
          border-radius: 20px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .share-button {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .home-button {
          background: rgba(255, 255, 255, 0.9);
          color: #374151;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .share-button:hover, .home-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(102, 126, 234, 0.5);
        }

        .analysis-section {
          position: relative;
          z-index: 10;
          padding: 0 20px 80px;
        }

        .analysis-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .analysis-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          transition: transform 0.3s ease;
        }

        .analysis-card:hover {
          transform: translateY(-8px);
        }

        .card-header {
          margin-bottom: 24px;
        }

        .card-header h3 {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .card-content {
          space-y: 16px;
        }

        .strength-item, .challenge-item, .career-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 16px;
          line-height: 1.6;
          color: #374151;
        }

        .bullet {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .relationship-text {
          font-size: 16px;
          line-height: 1.6;
          color: #374151;
          margin: 0;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          padding: 32px;
          min-width: 400px;
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h3 {
          font-size: 24px;
          font-weight: 800;
          color: #374151;
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          color: #6B7280;
          cursor: pointer;
          padding: 4px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s ease;
        }

        .close-button:hover {
          background: rgba(107, 114, 128, 0.1);
        }

        .copy-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .copy-button:hover {
          transform: translateY(-2px);
        }

        .success-message {
          text-align: center;
          padding: 20px;
        }

        .success-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 16px;
        }

        .success-message p {
          font-size: 18px;
          color: #10B981;
          font-weight: 600;
          margin: 0;
        }

        /* 新しいセクションのスタイル */
        .compatibility-section, .senior-advice-section {
          position: relative;
          z-index: 10;
          padding: 60px 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-header h2 {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .section-header p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .compatibility-grid, .advice-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 32px;
        }

        .compatibility-grid {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .advice-grid {
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        }

        .compatibility-card, .advice-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          transition: transform 0.3s ease;
        }

        .compatibility-card:hover, .advice-card:hover {
          transform: translateY(-8px);
        }

        .compatibility-header, .advice-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .compatibility-header h3, .advice-header h3 {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 8px 0;
        }

        .compatibility-header p, .advice-header p {
          font-size: 14px;
          color: #6B7280;
          margin: 0;
        }

        .compatibility-types {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .compatibility-type {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .compatibility-type.best {
          background: linear-gradient(135deg, #f472b6, #ec4899);
        }

        .compatibility-type.good {
          background: linear-gradient(135deg, #34d399, #10b981);
        }

        .compatibility-type.challenging {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
        }

        .advice-content {
          space-y: 16px;
        }

        .advice-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 16px;
          line-height: 1.6;
          color: #374151;
        }

        .advice-bullet {
          font-size: 18px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* モバイル対応 */
        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 16px 60px;
          }

          .type-badge {
            flex-direction: column;
            gap: 16px;
            padding: 20px;
          }

          .type-info {
            text-align: center;
          }

          .type-title {
            font-size: 36px;
          }

          .hero-title {
            font-size: 28px;
          }

          .hero-description {
            font-size: 18px;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .share-button, .home-button {
            width: 100%;
            max-width: 300px;
          }

          .analysis-section {
            padding: 0 16px 60px;
          }

          .analysis-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .analysis-card {
            padding: 24px;
          }

          .compatibility-section, .senior-advice-section {
            padding: 40px 16px;
          }

          .section-header h2 {
            font-size: 28px;
          }

          .compatibility-grid, .advice-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .compatibility-card, .advice-card {
            padding: 24px;
          }

          .modal-content {
            margin: 20px;
            min-width: unset;
            width: calc(100% - 40px);
          }
        }

        /* Result Footer Styles */
        .result-footer {
          background: #1e293b;
          color: white;
          padding: 40px 20px;
          margin-top: 60px;
          text-align: center;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-text {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
          color: #e2e8f0;
        }

        .footer-email {
          color: #60a5fa;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .footer-email:hover {
          color: #93c5fd;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .result-footer {
            padding: 30px 20px;
            margin-top: 40px;
          }

          .footer-text {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
    </>
  );
}