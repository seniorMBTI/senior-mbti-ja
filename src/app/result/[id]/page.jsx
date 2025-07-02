'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import LanguageSelector from '../../../components/LanguageSelector';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    setMounted(true);
    
    // localStorageから結果データを読み込み
    const resultId = params.id;
    if (resultId && typeof window !== 'undefined') {
      const storedData = localStorage.getItem(`mbti-result-${resultId}`);
      if (storedData) {
        setResultData(JSON.parse(storedData));
      }
    }
  }, [params.id]);

  // 完全な16のMBTIタイプの詳細分析
  const mbtiTypes = {
    'INTJ': {
      type: 'INTJ',
      title: 'シニア戦略設計者',
      subtitle: '未来を見通す知恵深い戦略家',
      emoji: '🔮',
      color: '#6366f1',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: '豊富な人生経験から培った知恵に基づき、体系的で論理的な思考を持ち、未来を見通す卓越した洞察力をお持ちです。',
      strengths: ['優れた戦略的思考', '独立した判断力', '体系的計画立案', '深い洞察力', '目標志向の実行力'],
      challenges: ['完璧主義傾向', '感情表現の困難', '過度な批判性', '変化への抵抗'],
      careers: ['コンサルタント', '研究者', 'プランナー', '作家', '投資専門家'],
      relationships: '信頼できる少数との深い関係を好み、知的な交流を重視します。',
      scores: { E: 15, I: 85, S: 25, N: 75, T: 80, F: 20, J: 85, P: 15 }
    },
    'INTP': {
      type: 'INTP',
      title: 'シニア思索学者',
      subtitle: '好奇心旺盛な知識探求者',
      emoji: '🤔',
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
      description: '生涯にわたる学習と探求を通じて深い知識を蓄積され、新しいアイデアや概念を探求することを楽しんでおられます。',
      strengths: ['卓越した分析力', '創造的思考', '論理的推論力', '強い探求心', '客観的判断力'],
      challenges: ['実用的応用の困難', '感情的コミュニケーション不足', '優柔不断', '細部の見落とし'],
      careers: ['研究者', '教授', 'アナリスト', '哲学者', '発明家'],
      relationships: '深い知的対話ができる相手を好み、個人の空間を非常に重視します。',
      scores: { E: 20, I: 80, S: 30, N: 70, T: 75, F: 25, J: 35, P: 65 }
    },
    'ENTJ': {
      type: 'ENTJ',
      title: 'シニア実行リーダー',
      subtitle: '天性の組織指導者',
      emoji: '👑',
      color: '#059669',
      bgGradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
      description: 'あなたは天性のリーダーであり、優れた組織力と決断力を持ち、他人を効果的に指導し、動機づけることができます。',
      strengths: ['卓越したリーダーシップ', '強い目標意識', '優秀な組織力', '果断な決断力', '高い実行力'],
      challenges: ['過度な強さ', '忍耐力不足', '他者の感情軽視', '強い支配欲'],
      careers: ['企業幹部', 'プロジェクトマネージャー', '政府官僚', '弁護士', '起業家'],
      relationships: '関係においてもリーダーシップを取りがちで、効率性と目標志向の関わりを重視します。',
      scores: { E: 85, I: 15, S: 30, N: 70, T: 80, F: 20, J: 85, P: 15 }
    },
    'ENTP': {
      type: 'ENTP',
      title: 'シニア革新探究者',
      subtitle: '活力ある創造的発明家',
      emoji: '💡',
      color: '#dc2626',
      bgGradient: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
      description: '豊かな創造力と無限の好奇心を持ち、新しい可能性と機会を発見することに長けています。',
      strengths: ['革新的思考', '高い適応性', '優秀な対人関係能力', '迅速な学習能力', '楽観的姿勢'],
      challenges: ['長期プロジェクトの継続困難', '細部への注意不足', '気が散りやすい', 'ルーチンワークの回避'],
      careers: ['起業家', 'マーケティング専門家', 'コンサルタント', '講演者', 'クリエイティブディレクター'],
      relationships: '活力に満ち刺激的な関係を好み、知的挑戦と成長を重視します。',
      scores: { E: 80, I: 20, S: 25, N: 75, T: 70, F: 30, J: 30, P: 70 }
    },
    'INFJ': {
      type: 'INFJ',
      title: 'シニア知恵守護者',
      subtitle: '温かく洞察力ある理想主義者',
      emoji: '🌟',
      color: '#7c3aed',
      bgGradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
      description: '深い直感と共感力を持ち、常に他者のニーズを理解し、温かいサポートを提供することができます。',
      strengths: ['深い洞察力', '強い共感力', '理想主義精神', '創造的思考', '確固たる価値観'],
      challenges: ['過度な理想化', '疲労しやすい', '衝突回避', '完璧主義'],
      careers: ['心理カウンセラー', '作家', 'ソーシャルワーカー', '教師', '宗教指導者'],
      relationships: '深い感情的つながりを求め、相互理解と精神的共鳴を重視します。',
      scores: { E: 25, I: 75, S: 30, N: 70, T: 35, F: 65, J: 75, P: 25 }
    },
    'INFP': {
      type: 'INFP',
      title: 'シニア理想主義者',
      subtitle: '真実と調和を追求する調停者',
      emoji: '🕊️',
      color: '#06b6d4',
      bgGradient: 'linear-gradient(135deg, #67e8f9 0%, #06b6d4 100%)',
      description: '真の理想主義者であり、常に人生の美しい面を探し、世界をより良い場所にしようと努めています。',
      strengths: ['強い価値観', '創造的表現', '深い共感力', '高い適応力', '誠実な人柄'],
      challenges: ['過度な敏感さ', '実用性の欠如', '衝突回避', '自己批判'],
      careers: ['芸術家', '作家', '心理学者', 'NPO職員', '音楽家'],
      relationships: '真摯で深い感情的つながりを重視し、理解と受容の環境を必要とします。',
      scores: { E: 30, I: 70, S: 35, N: 65, T: 30, F: 70, J: 40, P: 60 }
    },
    'ENFJ': {
      type: 'ENFJ',
      title: 'シニア人生指導者',
      subtitle: '人を鼓舞する指導者',
      emoji: '🌈',
      color: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      description: '天性のリーダーであり指導者として、常に他者の潜在能力を引き出し、個人の成長を助けることができます。',
      strengths: ['卓越した対人スキル', '強い責任感', '他者を鼓舞する能力', '組織調整能力', '理想主義'],
      challenges: ['過度な献身', '自分のニーズの軽視', '過度な理想化', '困難な決断への苦手意識'],
      careers: ['教師', 'トレーナー', '地域リーダー', '心理カウンセラー', '人事専門家'],
      relationships: 'パートナーの成長と発展を支援することに専念し、調和ある人間関係を重視します。',
      scores: { E: 75, I: 25, S: 35, N: 65, T: 25, F: 75, J: 70, P: 30 }
    },
    'ENFP': {
      type: 'ENFP',
      title: 'シニア熱情活動家',
      subtitle: '情熱あふれる鼓舞者',
      emoji: '🎭',
      color: '#ec4899',
      bgGradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
      description: '真の自由精神であり、情熱と創造力に満ち、常に周囲の人々にポジティブなエネルギーをもたらします。',
      strengths: ['強い情熱', '卓越した人間関係', '創造的思考', '高い適応力', '楽観的姿勢'],
      challenges: ['注意散漫', '持続力不足', '過度な敏感さ', 'ストレス下での困難'],
      careers: ['芸術家', '俳優', 'マーケティング専門家', '社会活動家', 'セラピスト'],
      relationships: '情熱と成長に満ちた関係を求め、感情的つながりと理解を重視します。',
      scores: { E: 80, I: 20, S: 30, N: 70, T: 35, F: 65, J: 35, P: 65 }
    },
    'ISTJ': {
      type: 'ISTJ',
      title: 'シニア安定管理者',
      subtitle: '信頼できる伝統守護者',
      emoji: '🏛️',
      color: '#374151',
      bgGradient: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)',
      description: '社会の基盤であり、強い責任感と信頼性を持ち、常に約束した任務を完遂することができます。',
      strengths: ['高い責任感', '信頼性', '細部への注意', '実用性', '粘り強さ'],
      challenges: ['変化への抵抗', '過度な厳格さ', '柔軟性の欠如', '他者の感情軽視'],
      careers: ['会計士', '管理者', '公務員', 'エンジニア', '裁判官'],
      relationships: '安定性と約束を重視し、伝統的な関係パターンを好みます。',
      scores: { E: 20, I: 80, S: 80, N: 20, T: 70, F: 30, J: 85, P: 15 }
    },
    'ISFJ': {
      type: 'ISFJ',
      title: 'シニア守護支援者',
      subtitle: '温かい保護者',
      emoji: '🤗',
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
      description: '真の利他主義者であり、常に大切な人々を保護し支援する準備ができています。',
      strengths: ['強い共感力', '信頼性', '細やかな配慮', '他者支援', '高い忠誠心'],
      challenges: ['過度な自己犠牲', '衝突回避', '変化への抵抗', '自信不足'],
      careers: ['看護師', '教師', 'ソーシャルワーカー', '図書館員', '人事'],
      relationships: '家族と伝統を非常に重視し、常に他者のニーズを優先します。',
      scores: { E: 25, I: 75, S: 75, N: 25, T: 30, F: 70, J: 80, P: 20 }
    },
    'ESTJ': {
      type: 'ESTJ',
      title: 'シニア実行管理者',
      subtitle: '効率的な組織リーダー',
      emoji: '📋',
      color: '#b91c1c',
      bgGradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
      description: '優秀な管理者であり組織者として、アイデアを行動に変える卓越した能力を持っています。',
      strengths: ['卓越した組織力', '強い責任感', '実用性', '果断な決断', 'リーダーシップ'],
      challenges: ['過度な厳格さ', '柔軟性の欠如', '他者の感情軽視', '変化への抵抗'],
      careers: ['企業管理者', '政府官僚', 'プロジェクト主管', '軍事指導者', '銀行家'],
      relationships: '伝統と安定性を重視し、関係においてリーダーシップを取る傾向があります。',
      scores: { E: 75, I: 25, S: 75, N: 25, T: 80, F: 20, J: 85, P: 15 }
    },
    'ESFJ': {
      type: 'ESFJ',
      title: 'シニア社交調整者',
      subtitle: '温かい人間関係専門家',
      emoji: '💝',
      color: '#be185d',
      bgGradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      description: '真の人民の人であり、常に他者を助けることに熱心で、調和のとれた環境作りに努めています。',
      strengths: ['優秀な対人スキル', '強い共感力', '組織調整能力', '忠実で信頼できる', '他者への思いやり'],
      challenges: ['他者の承認への過度な関心', '衝突回避', '自分のニーズの軽視', '批判への敏感さ'],
      careers: ['看護師', '教師', '人事', 'ソーシャルワーカー', 'イベントプランナー'],
      relationships: '調和のとれた人間関係を非常に重視し、常に他者のニーズを満たそうと努力します。',
      scores: { E: 80, I: 20, S: 70, N: 30, T: 25, F: 75, J: 75, P: 25 }
    },
    'ISTP': {
      type: 'ISTP',
      title: 'シニア実践専門家',
      subtitle: '柔軟な問題解決者',
      emoji: '🔧',
      color: '#0d9488',
      bgGradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      description: '天性の職人であり問題解決者として、実用的なスキルと冷静な判断力を持っています。',
      strengths: ['実用的スキル', '高い適応力', '冷静な分析', '強い独立性', '危機処理能力'],
      challenges: ['感情表現の困難', '長期計画の欠如', '約束回避', '過度な独立性'],
      careers: ['エンジニア', '技術者', 'パイロット', '外科医', '警察官'],
      relationships: '言葉より行動を重視し、実際の行動を通じて愛情を表現します。',
      scores: { E: 30, I: 70, S: 80, N: 20, T: 75, F: 25, J: 25, P: 75 }
    },
    'ISFP': {
      type: 'ISFP',
      title: 'シニア芸術家',
      subtitle: '温和な芸術創作者',
      emoji: '🎨',
      color: '#7c2d12',
      bgGradient: 'linear-gradient(135deg, #f97316 0%, #7c2d12 100%)',
      description: '真の芸術家であり、鋭い美的感覚と深い感情表現能力を持っています。',
      strengths: ['芸術的感性', '強い価値観', '高い適応力', '他者への思いやり', '創造的表現'],
      challenges: ['過度な敏感さ', '衝突回避', '組織性の欠如', '自己批判'],
      careers: ['芸術家', '音楽家', 'デザイナー', 'セラピスト', '環境保護活動家'],
      relationships: '深い感情的つながりを重視し、理解と支援のある環境を必要とします。',
      scores: { E: 25, I: 75, S: 65, N: 35, T: 30, F: 70, J: 35, P: 65 }
    },
    'ESTP': {
      type: 'ESTP',
      title: 'シニア活力実行家',
      subtitle: '活力に満ちた行動派',
      emoji: '⚡',
      color: '#ca8a04',
      bgGradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
      description: '真の実行家であり、常に新しい挑戦と機会を迎える準備ができています。',
      strengths: ['高い適応性', '実際の行動力', '対人関係能力', '危機処理能力', '楽観的姿勢'],
      challenges: ['長期計画の欠如', '衝動的傾向', '理論学習の回避', '他者の感情軽視'],
      careers: ['営業代表', '起業家', '運動選手', '救急隊員', 'エンターテイナー'],
      relationships: '活力と刺激に満ちた関係を好み、未来より現在を重視します。',
      scores: { E: 85, I: 15, S: 80, N: 20, T: 65, F: 35, J: 20, P: 80 }
    },
    'ESFP': {
      type: 'ESFP',
      title: 'シニア歓楽使者',
      subtitle: '情熱的なエンターテイナー',
      emoji: '🎉',
      color: '#c026d3',
      bgGradient: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)',
      description: '天性のエンターテイナーであり、常に周囲の人々に楽しさとポジティブなエネルギーをもたらします。',
      strengths: ['強い情熱', '優秀な人間関係', '実用性', '高い適応力', '楽観的姿勢'],
      challenges: ['注意散漫', '衝突回避', '長期計画の欠如', '批判への敏感さ'],
      careers: ['俳優', '営業員', 'イベントプランナー', 'ソーシャルワーカー', '旅行ガイド'],
      relationships: '調和で楽しい関係を重視し、常に皆が幸せを感じられるよう努力します。',
      scores: { E: 80, I: 20, S: 75, N: 25, T: 30, F: 70, J: 30, P: 70 }
    }
  };

  if (!mounted) {
    return <div>読み込み中...</div>;
  }

  const currentType = resultData?.mbtiType || params.id?.toString().toUpperCase();
  const typeInfo = mbtiTypes[currentType];

  if (!typeInfo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">結果が見つかりません</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: '性格概要', icon: '📋' },
    { id: 'strengths', label: '強み分析', icon: '💪' },
    { id: 'careers', label: '適合分野', icon: '💼' },
    { id: 'relationships', label: '人間関係', icon: '❤️' }
  ];

  const shareResult = () => {
    const shareText = `私のMBTI性格タイプは ${typeInfo.type} - ${typeInfo.title}です！あなたも性格タイプテストを受けてみませんか？`;
    if (navigator.share) {
      navigator.share({
        title: 'シニアMBTI性格テスト結果',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      setShowShareDialog(true);
      setTimeout(() => setShowShareDialog(false), 2000);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: typeInfo.bgGradient }}>
      {/* 言語選択器 */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-8">
        {/* タイトル領域 */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-6">
            <div className="text-6xl mb-4">{typeInfo.emoji}</div>
            <h1 className="text-6xl font-black text-white mb-4 type-title-highlight">
              {typeInfo.type}
            </h1>
            <h2 className="text-3xl font-bold text-white/95 mb-3">
              {typeInfo.title}
            </h2>
            <p className="text-lg text-white/80">
              {typeInfo.subtitle}
            </p>
          </div>

          {/* シェアボタン */}
          <button
            onClick={shareResult}
            className="bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-medium"
          >
            結果をシェア 📤
          </button>
        </div>

        {/* タブナビゲーション */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-gray-800 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* コンテンツ領域 */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3">📋</span>
                性格概要
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {typeInfo.description}
              </p>
              
              {/* 性格次元スコア */}
              <div className="grid md:grid-cols-2 gap-6">
                {['E/I', 'S/N', 'T/F', 'J/P'].map((dimension) => {
                  const [first, second] = dimension.split('/');
                  const firstScore = typeInfo.scores[first];
                  const secondScore = typeInfo.scores[second];
                  const total = firstScore + secondScore;
                  const firstPercentage = (firstScore / total) * 100;
                  
                  return (
                    <div key={dimension} className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-gray-800">{dimension} 次元</span>
                        <span className="text-sm text-gray-600">
                          {firstScore}% / {secondScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${firstPercentage}%`,
                            background: typeInfo.bgGradient
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>{first}</span>
                        <span>{second}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'strengths' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3">💪</span>
                強みと課題
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-green-600 mb-4">✅ 核心的強み</h4>
                  <ul className="space-y-3">
                    {typeInfo.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-orange-600 mb-4">⚠️ 注意点</h4>
                  <ul className="space-y-3">
                    {typeInfo.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'careers' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3">💼</span>
                適合分野
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {typeInfo.careers.map((career, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-l-4"
                    style={{ borderLeftColor: typeInfo.color }}
                  >
                    <span className="font-medium text-gray-800">{career}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">💡 キャリアアドバイス</h4>
                <p className="text-blue-700">
                  あなたの性格特性に基づき、あなたの才能を活かせる分野を選ぶことをお勧めします。最も重要なのは、あなたの価値観と興味に合致する仕事を見つけることです。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'relationships' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3">❤️</span>
                人間関係
              </h3>
              
              <div className="bg-pink-50 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-pink-800 mb-3">💝 関係の特徴</h4>
                <p className="text-pink-700 leading-relaxed">
                  {typeInfo.relationships}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-green-800 mb-3">🤝 人間関係の強み</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• 誠実なコミュニケーション</li>
                    <li>• 深い感情的つながり</li>
                    <li>• 信頼できるサポート</li>
                    <li>• 相互尊重の関係</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 改善提案</h4>
                  <ul className="space-y-2 text-yellow-700">
                    <li>• オープンなコミュニケーション</li>
                    <li>• 異なる観点の理解</li>
                    <li>• 個人スペースの尊重</li>
                    <li>• 感謝の表現</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ボトムボタン */}
        <div className="text-center mt-8 space-y-4">
          <button
            onClick={() => router.push('/')}
            className="bg-white/20 backdrop-blur-lg text-white px-8 py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-medium mr-4"
          >
            再テスト
          </button>
          
          <button
            onClick={shareResult}
            className="bg-white text-gray-800 px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 font-medium"
          >
            結果をシェア
          </button>
        </div>
      </div>

      {/* シェア通知 */}
      {showShareDialog && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50">
          ✅ リンクがクリップボードにコピーされました！
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
        }
        
        .type-title-highlight {
          background: linear-gradient(45deg, #FFD700, #FFA500, #FF6B6B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.5));
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .glassmorphism-card {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(248, 250, 252, 0.95) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          position: relative;
          overflow: hidden;
        }
        
        .glassmorphism-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.5), transparent);
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .grid {
            grid-template-columns: 1fr;
          }
          
          .type-title-highlight {
            font-size: 3rem;
          }
        }
        
        /* アクセシビリティ対応 */
        @media (prefers-reduced-motion: reduce) {
          .floating-animation,
          .hover-lift {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}