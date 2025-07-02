'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import LanguageSelector from '../../../components/LanguageSelector';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const resultId = params.id?.toString().toUpperCase();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Complete 16 MBTI Types with detailed analysis
  const mbtiTypes = {
    'INTJ': {
      type: 'INTJ',
      title: '시니어 전략적 설계자',
      subtitle: '미래를 내다보는 지혜로운 전략가',
      emoji: '🔮',
      color: '#6366f1',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: '오랜 경험으로 쌓인 지혜를 바탕으로 체계적이고 논리적인 사고를 하시며, 미래를 내다보는 통찰력을 가지고 계십니다.',
      strengths: ['뛰어난 전략적 사고', '독립적 판단력', '체계적 계획 수립', '깊이 있는 통찰력', '목표 지향적 실행력'],
      challenges: ['완벽주의 성향', '감정 표현의 어려움', '비판적 시각', '변화에 대한 저항'],
      careers: ['컨설턴트', '연구원', '기획자', '작가', '투자 전문가'],
      relationships: '신뢰할 수 있는 소수의 깊은 관계를 선호하며, 지적 교감을 중요하게 생각합니다.',
      scores: { E: 15, I: 85, S: 25, N: 75, T: 80, F: 20, J: 85, P: 15 }
    },
    'INTP': {
      type: 'INTP',
      title: '시니어 사색하는 학자',
      subtitle: '호기심 많은 지식 탐구자',
      emoji: '🤔',
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
      description: '평생에 걸친 학습과 탐구를 통해 깊이 있는 지식을 쌓아오셨으며, 새로운 아이디어를 탐구하는 것을 즐기십니다.',
      strengths: ['뛰어난 분석력', '창의적 사고', '논리적 추론', '지적 호기심', '객관적 판단'],
      challenges: ['현실적 적용의 어려움', '감정적 소통 부족', '우유부단함', '세부사항 놓침'],
      careers: ['연구원', '교수', '분석가', '철학자', '발명가'],
      relationships: '지적 대화를 나눌 수 있는 상대를 선호하며, 개인 공간을 중요하게 생각합니다.',
      scores: { E: 20, I: 80, S: 30, N: 70, T: 75, F: 25, J: 35, P: 65 }
    },
    'ENTJ': {
      type: 'ENTJ',
      title: '시니어 비전 리더',
      subtitle: '목표를 실현하는 카리스마 리더',
      emoji: '👑',
      color: '#ef4444',
      bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      description: '풍부한 경험을 바탕으로 조직을 이끌고 목표를 달성하는 탁월한 리더십을 발휘하시는 분입니다.',
      strengths: ['강력한 리더십', '전략적 비전', '목표 달성력', '결단력', '조직 관리 능력'],
      challenges: ['권위적 성향', '감정적 배려 부족', '성급함', '비판에 민감'],
      careers: ['CEO', '임원', '정치인', '사업가', '프로젝트 매니저'],
      relationships: '효율적이고 목적 지향적인 관계를 선호하며, 상대방의 성장을 도모합니다.',
      scores: { E: 85, I: 15, S: 35, N: 65, T: 80, F: 20, J: 90, P: 10 }
    },
    'ENTP': {
      type: 'ENTP',
      title: '시니어 창의적 혁신가',
      subtitle: '아이디어가 풍부한 변화의 선도자',
      emoji: '💡',
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
      description: '새로운 가능성을 탐구하고 혁신적인 아이디어로 변화를 이끌어가는 창의적인 분입니다.',
      strengths: ['창의적 아이디어', '뛰어난 적응력', '열정적 추진력', '설득력', '변화 수용'],
      challenges: ['지속성 부족', '세부사항 소홀', '루틴 업무 회피', '감정적 민감성'],
      careers: ['기업가', '컨설턴트', '마케터', '발명가', '언론인'],
      relationships: '다양한 사람들과의 활발한 교류를 즐기며, 지적 자극을 주고받는 관계를 선호합니다.',
      scores: { E: 80, I: 20, S: 25, N: 75, T: 70, F: 30, J: 25, P: 75 }
    },
    'INFJ': {
      type: 'INFJ',
      title: '시니어 영감을 주는 조언자',
      subtitle: '깊은 통찰력을 가진 현명한 멘토',
      emoji: '🌟',
      color: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      description: '깊은 성찰과 직관을 통해 사람들에게 영감과 조언을 주시는 따뜻하고 지혜로운 분입니다.',
      strengths: ['깊은 통찰력', '공감 능력', '이상주의적 비전', '창의성', '헌신적 봉사'],
      challenges: ['완벽주의', '과도한 감정이입', '비현실적 기대', '갈등 회피'],
      careers: ['상담사', '작가', '교육자', '종교인', '사회복지사'],
      relationships: '깊고 의미 있는 관계를 추구하며, 상대방의 성장과 행복을 진심으로 바랍니다.',
      scores: { E: 25, I: 75, S: 20, N: 80, T: 30, F: 70, J: 75, P: 25 }
    },
    'INFP': {
      type: 'INFP',
      title: '시니어 따뜻한 이상주의자',
      subtitle: '진정성을 추구하는 마음 따뜻한 분',
      emoji: '🦋',
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #c084fc 0%, #8b5cf6 100%)',
      description: '진정한 가치와 의미를 추구하며, 따뜻한 마음으로 세상을 보시는 이상주의적인 분입니다.',
      strengths: ['강한 가치관', '창의적 표현', '공감 능력', '진정성', '개인의 성장 지원'],
      challenges: ['현실적 제약 무시', '갈등 회피', '우유부단함', '자기비판'],
      careers: ['예술가', '작가', '상담사', '교사', '사회운동가'],
      relationships: '진실하고 깊은 관계를 중시하며, 상대방의 개성과 가치를 존중합니다.',
      scores: { E: 20, I: 80, S: 25, N: 75, T: 25, F: 75, J: 40, P: 60 }
    },
    'ENFJ': {
      type: 'ENFJ',
      title: '시니어 따뜻한 멘토',
      subtitle: '사람을 이끌어주는 카리스마 있는 조력자',
      emoji: '🤗',
      color: '#059669',
      bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      description: '풍부한 인생경험을 바탕으로 다른 사람들을 이끌어나가는 따뜻한 리더십을 가지고 계십니다.',
      strengths: ['뛰어난 공감력', '영감을 주는 리더십', '소통 능력', '타인 성장 도모', '협력적 관계'],
      challenges: ['자기희생적 성향', '비판에 민감', '완벽주의', '갈등에 대한 스트레스'],
      careers: ['교육자', '상담사', '관리자', '종교인', '사회복지사'],
      relationships: '사람들과의 깊은 유대감을 중시하며, 상대방의 잠재력을 끌어내는 것을 즐깁니다.',
      scores: { E: 80, I: 20, S: 30, N: 70, T: 25, F: 75, J: 80, P: 20 }
    },
    'ENFP': {
      type: 'ENFP',
      title: '시니어 열정적 격려자',
      subtitle: '활력 넘치는 긍정의 에너지',
      emoji: '🌈',
      color: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      description: '밝고 열정적인 에너지로 주변 사람들에게 힘과 용기를 주시는 활기찬 분입니다.',
      strengths: ['열정과 에너지', '창의적 아이디어', '사람들과의 친화력', '변화에 대한 개방성', '격려와 동기부여'],
      challenges: ['집중력 부족', '현실성 결여', '감정 기복', '세부사항 소홀'],
      careers: ['상담사', '교육자', '마케터', '연예인', '사회복지사'],
      relationships: '다양한 사람들과의 활발한 교류를 즐기며, 상대방에게 영감과 격려를 제공합니다.',
      scores: { E: 85, I: 15, S: 20, N: 80, T: 30, F: 70, J: 30, P: 70 }
    },
    'ISTJ': {
      type: 'ISTJ',
      title: '시니어 신뢰할 수 있는 수호자',
      subtitle: '책임감 있는 전통의 수호자',
      emoji: '🛡️',
      color: '#374151',
      bgGradient: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)',
      description: '오랜 경험을 통해 쌓인 신뢰감과 책임감으로 주변을 든든하게 지켜주시는 분입니다.',
      strengths: ['높은 책임감', '체계적 접근', '신뢰성', '전통 존중', '꾸준한 실행력'],
      challenges: ['변화에 대한 저항', '융통성 부족', '감정 표현 어려움', '새로운 방식 거부'],
      careers: ['공무원', '회계사', '법무사', '관리자', '전문 기술직'],
      relationships: '안정적이고 신뢰할 수 있는 관계를 선호하며, 약속과 의무를 중시합니다.',
      scores: { E: 20, I: 80, S: 85, N: 15, T: 70, F: 30, J: 90, P: 10 }
    },
    'ISFJ': {
      type: 'ISFJ',
      title: '시니어 따뜻한 보호자',
      subtitle: '배려 깊은 마음의 돌봄이',
      emoji: '🤱',
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
      description: '따뜻한 마음으로 주변 사람들을 돌보고 보호하시는 자애로운 분입니다.',
      strengths: ['뛰어난 돌봄', '세심한 배려', '책임감', '협력적 태도', '전통적 가치 존중'],
      challenges: ['자기주장 부족', '과도한 희생', '변화에 대한 불안', '갈등 회피'],
      careers: ['간호사', '교사', '사회복지사', '상담사', '행정직'],
      relationships: '상대방의 필요를 먼저 생각하며, 조화로운 관계 유지를 위해 노력합니다.',
      scores: { E: 25, I: 75, S: 80, N: 20, T: 35, F: 65, J: 85, P: 15 }
    },
    'ESTJ': {
      type: 'ESTJ',
      title: '시니어 실용적 관리자',
      subtitle: '체계적인 조직의 기둥',
      emoji: '📋',
      color: '#dc2626',
      bgGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      description: '체계적이고 실용적인 접근으로 조직과 가정을 효율적으로 관리하시는 분입니다.',
      strengths: ['뛰어난 조직력', '실행력', '리더십', '체계적 사고', '현실적 판단'],
      challenges: ['융통성 부족', '감정적 배려 부족', '권위적 성향', '변화에 대한 저항'],
      careers: ['관리자', '임원', '공무원', '군인', '사업가'],
      relationships: '명확한 역할과 책임을 기반으로 한 안정적인 관계를 선호합니다.',
      scores: { E: 80, I: 20, S: 85, N: 15, T: 75, F: 25, J: 90, P: 10 }
    },
    'ESFJ': {
      type: 'ESFJ',
      title: '시니어 사교적 후원자',
      subtitle: '따뜻한 마음의 사회적 나눔이',
      emoji: '🫶',
      color: '#059669',
      bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      description: '사람들과의 관계를 소중히 여기며, 따뜻한 마음으로 주변을 돌보시는 사교적인 분입니다.',
      strengths: ['뛰어난 사교성', '배려심', '협력적 태도', '전통 존중', '실용적 도움'],
      challenges: ['비판에 민감', '갈등 회피', '자기주장 부족', '변화에 대한 불안'],
      careers: ['교사', '간호사', '상담사', '판매직', '서비스업'],
      relationships: '화목하고 조화로운 관계를 추구하며, 상대방의 행복을 위해 노력합니다.',
      scores: { E: 85, I: 15, S: 80, N: 20, T: 30, F: 70, J: 80, P: 20 }
    },
    'ISTP': {
      type: 'ISTP',
      title: '시니어 침착한 해결사',
      subtitle: '실용적 문제 해결의 달인',
      emoji: '🔧',
      color: '#6b7280',
      bgGradient: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
      description: '침착하고 실용적인 접근으로 문제를 해결하시는 능력 있는 분입니다.',
      strengths: ['실용적 문제해결', '침착함', '적응력', '독립성', '분석적 사고'],
      challenges: ['감정 표현 어려움', '장기 계획 부족', '사회적 관계 소홀', '변화 추구'],
      careers: ['기술자', '장인', '수리공', '엔지니어', '운동선수'],
      relationships: '실질적이고 자유로운 관계를 선호하며, 개인의 독립성을 중시합니다.',
      scores: { E: 25, I: 75, S: 80, N: 20, T: 75, F: 25, J: 35, P: 65 }
    },
    'ISFP': {
      type: 'ISFP',
      title: '시니어 온화한 예술가',
      subtitle: '조용한 아름다움을 추구하는 분',
      emoji: '🎨',
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #c084fc 0%, #8b5cf6 100%)',
      description: '조용하고 온화한 성품으로 아름다움과 조화를 추구하시는 예술적 감성의 분입니다.',
      strengths: ['예술적 감성', '공감 능력', '유연성', '개인적 가치 중시', '평화 추구'],
      challenges: ['자기주장 부족', '갈등 회피', '현실성 부족', '스트레스 취약'],
      careers: ['예술가', '디자이너', '상담사', '간호사', '교사'],
      relationships: '진실하고 평화로운 관계를 원하며, 상대방의 개성을 존중합니다.',
      scores: { E: 20, I: 80, S: 70, N: 30, T: 25, F: 75, J: 40, P: 60 }
    },
    'ESTP': {
      type: 'ESTP',
      title: '시니어 활동적 모험가',
      subtitle: '활력 넘치는 현재를 즐기는 분',
      emoji: '🏃',
      color: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      description: '활동적이고 에너지 넘치는 성격으로 현재를 적극적으로 즐기시는 분입니다.',
      strengths: ['활동력', '적응력', '사교성', '현실적 감각', '문제해결 능력'],
      challenges: ['장기 계획 부족', '충동적 행동', '세부사항 소홀', '인내심 부족'],
      careers: ['영업직', '운동선수', '연예인', '응급구조사', '요리사'],
      relationships: '활발하고 즐거운 관계를 선호하며, 함께 활동을 즐기는 것을 좋아합니다.',
      scores: { E: 90, I: 10, S: 85, N: 15, T: 65, F: 35, J: 25, P: 75 }
    },
    'ESFP': {
      type: 'ESFP',
      title: '시니어 자유로운 연예인',
      subtitle: '즐거움을 나누는 밝은 에너지',
      emoji: '🎭',
      color: '#ec4899',
      bgGradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
      description: '밝고 자유로운 성격으로 주변에 즐거움과 활력을 주시는 분입니다.',
      strengths: ['밝은 에너지', '사교성', '유연성', '공감 능력', '즉흥성'],
      challenges: ['집중력 부족', '계획성 부족', '비판에 민감', '스트레스 취약'],
      careers: ['연예인', '교사', '상담사', '이벤트 기획자', '서비스업'],
      relationships: '즐겁고 따뜻한 관계를 추구하며, 상대방에게 기쁨을 주는 것을 좋아합니다.',
      scores: { E: 85, I: 15, S: 75, N: 25, T: 30, F: 70, J: 30, P: 70 }
    }
  };

  const currentType = mbtiTypes[resultId] || mbtiTypes['ENFJ'];

  // Tab content data
  const tabs = [
    { id: 'overview', label: '성격 개요', icon: '📊' },
    { id: 'strengths', label: '강점 분석', icon: '💪' },
    { id: 'careers', label: '적합 분야', icon: '💼' },
    { id: 'relationships', label: '인간관계', icon: '👥' }
  ];

  const handleRetakeTest = () => {
    router.push('/survey');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  const copyResultLink = () => {
    if (mounted && typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('결과 링크가 클립보드에 복사되었습니다!');
    }
  };

  // Radar chart component
  const RadarChart = ({ scores }) => {
    const dimensions = [
      { key: 'E', label: '외향성', value: scores.E },
      { key: 'S', label: '감각', value: scores.S },
      { key: 'T', label: '사고', value: scores.T },
      { key: 'J', label: '판단', value: scores.J }
    ];

    return (
      <div className="radar-chart">
        <div className="chart-container">
          {dimensions.map((dim, index) => (
            <div key={dim.key} className={`dimension dimension-${index + 1}`}>
              <div className="dimension-label">{dim.label}</div>
              <div className="dimension-bar">
                <div 
                  className="dimension-fill"
                  style={{ 
                    width: `${dim.value}%`,
                    background: currentType.color
                  }}
                />
              </div>
              <div className="dimension-value">{dim.value}%</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content">
            <div className="personality-overview">
              <div className="type-display">
                <div className="type-emoji">{currentType.emoji}</div>
                <div className="type-info">
                  <h2 className="type-code">{currentType.type}</h2>
                  <h3 className="type-title">{currentType.title}</h3>
                  <p className="type-subtitle">{currentType.subtitle}</p>
                </div>
              </div>
              
              <div className="description-card">
                <h4>성격 특성</h4>
                <p>{currentType.description}</p>
              </div>

              <div className="scores-section">
                <h4>성격 차원 분석</h4>
                <RadarChart scores={currentType.scores} />
              </div>
            </div>
          </div>
        );

      case 'strengths':
        return (
          <div className="tab-content">
            <div className="strengths-section">
              <h4>💪 주요 강점</h4>
              <div className="traits-grid">
                {currentType.strengths.map((strength, index) => (
                  <div key={index} className="trait-card strength-card">
                    <div className="trait-icon">✨</div>
                    <div className="trait-text">{strength}</div>
                  </div>
                ))}
              </div>

              <h4>⚠️ 주의할 점</h4>
              <div className="traits-grid">
                {currentType.challenges.map((challenge, index) => (
                  <div key={index} className="trait-card challenge-card">
                    <div className="trait-icon">💡</div>
                    <div className="trait-text">{challenge}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'careers':
        return (
          <div className="tab-content">
            <div className="careers-section">
              <h4>💼 적합한 분야</h4>
              <div className="careers-grid">
                {currentType.careers.map((career, index) => (
                  <div key={index} className="career-card">
                    <div className="career-icon">🎯</div>
                    <div className="career-text">{career}</div>
                  </div>
                ))}
              </div>
              
              <div className="career-advice">
                <h5>시니어를 위한 조언</h5>
                <p>
                  풍부한 경험과 {currentType.type} 성격의 강점을 살려, 
                  멘토링이나 컨설팅 분야에서 젊은 세대에게 지혜를 전수하는 역할을 
                  고려해보시기 바랍니다. 현재의 전문성을 바탕으로 새로운 도전도 
                  충분히 가능합니다.
                </p>
              </div>
            </div>
          </div>
        );

      case 'relationships':
        return (
          <div className="tab-content">
            <div className="relationships-section">
              <h4>👥 인간관계 특성</h4>
              <div className="relationship-card">
                <div className="relationship-icon">💝</div>
                <p>{currentType.relationships}</p>
              </div>

              <div className="relationship-tips">
                <h5>관계 개선 팁</h5>
                <div className="tips-list">
                  <div className="tip-item">
                    <span className="tip-icon">🌱</span>
                    <span>상대방의 입장에서 생각해보기</span>
                  </div>
                  <div className="tip-item">
                    <span className="tip-icon">💬</span>
                    <span>열린 마음으로 대화하기</span>
                  </div>
                  <div className="tip-item">
                    <span className="tip-icon">🤝</span>
                    <span>서로의 차이점 인정하기</span>
                  </div>
                  <div className="tip-item">
                    <span className="tip-icon">💌</span>
                    <span>감사 표현을 자주하기</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!mounted) {
    return <div className="loading-screen">결과를 불러오는 중...</div>;
  }

  return (
    <div className="result-container">
      {/* Hero Section */}
      <section className="result-hero" style={{ background: currentType.bgGradient }}>
        <div className="hero-background">
          <div className="floating-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
          </div>
        </div>

        <div className="container">
          {/* Language Selector */}
          <div className="language-selector-wrapper">
            <LanguageSelector />
          </div>

          {/* Hero Content */}
          <div className="hero-content">
            <div className="completion-badge">
              <span className="badge-icon">🎉</span>
              <span className="badge-text">테스트 완료!</span>
            </div>

            <div className="type-showcase">
              <div className="type-emoji-large">{currentType.emoji}</div>
              <h1 className="type-title-main">{currentType.title}</h1>
              <p className="type-subtitle-main">{currentType.subtitle}</p>
              <div className="type-code-badge">{currentType.type}</div>
            </div>

            <div className="action-buttons">
              <button onClick={handleShare} className="btn btn-share">
                <span className="btn-icon">📤</span>
                <span className="btn-text">결과 공유</span>
              </button>
              <button onClick={handleRetakeTest} className="btn btn-retake">
                <span className="btn-icon">🔄</span>
                <span className="btn-text">다시 테스트</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="result-main">
        <div className="container">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <div className="tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'tab-active' : ''}`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content-wrapper">
            {renderTabContent()}
          </div>

          {/* Footer Actions */}
          <div className="footer-actions">
            <button onClick={handleGoHome} className="btn btn-home">
              <span className="btn-icon">🏠</span>
              <span className="btn-text">홈으로 돌아가기</span>
            </button>
          </div>
        </div>
      </section>

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="share-overlay" onClick={() => setShowShareDialog(false)}>
          <div className="share-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="share-header">
              <h3>결과 공유하기</h3>
              <button 
                className="close-button"
                onClick={() => setShowShareDialog(false)}
              >
                ✕
              </button>
            </div>
            <div className="share-content">
              <button onClick={copyResultLink} className="share-option">
                <span className="share-icon">🔗</span>
                <span>링크 복사</span>
              </button>
              <div className="share-message">
                <p>당신의 성격 유형을 가족, 친구들과 공유해보세요!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .result-container {
          min-height: 100vh;
          background: #f8fafc;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .result-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          color: white;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .floating-particles {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 8s ease-in-out infinite;
        }

        .particle-1 {
          top: 20%;
          right: 10%;
          animation-delay: 0s;
        }

        .particle-2 {
          bottom: 30%;
          left: 15%;
          width: 150px;
          height: 150px;
          animation-delay: 3s;
        }

        .particle-3 {
          top: 50%;
          right: 30%;
          width: 100px;
          height: 100px;
          animation-delay: 6s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(-15px) rotate(240deg); }
        }

        .language-selector-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: flex-end;
          padding: 24px 0;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 0;
        }

        .completion-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          padding: 16px 32px;
          margin-bottom: 40px;
          backdrop-filter: blur(10px);
          font-size: 18px;
          font-weight: 600;
        }

        .badge-icon {
          font-size: 24px;
        }

        .type-showcase {
          margin-bottom: 48px;
        }

        .type-emoji-large {
          font-size: 120px;
          margin-bottom: 24px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .type-title-main {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          margin: 0 0 16px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .type-subtitle-main {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          margin: 0 0 32px 0;
          opacity: 0.9;
          font-weight: 500;
        }

        .type-code-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          padding: 12px 32px;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 2px;
          backdrop-filter: blur(10px);
        }

        .action-buttons {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 16px;
          padding: 16px 32px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          min-width: 180px;
          justify-content: center;
        }

        .btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-icon {
          font-size: 20px;
        }

        /* Main Content */
        .result-main {
          background: white;
          padding: 80px 0;
        }

        /* Tab Navigation */
        .tab-navigation {
          margin-bottom: 48px;
        }

        .tab-list {
          display: flex;
          gap: 8px;
          background: #f1f5f9;
          border-radius: 20px;
          padding: 8px;
          overflow-x: auto;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          border-radius: 16px;
          padding: 16px 24px;
          color: #64748b;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          min-width: 140px;
          justify-content: center;
        }

        .tab-button:hover {
          background: rgba(255, 255, 255, 0.5);
          color: #374151;
        }

        .tab-active {
          background: white !important;
          color: #1f2937 !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .tab-icon {
          font-size: 18px;
        }

        /* Tab Content */
        .tab-content-wrapper {
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 48px;
          margin-bottom: 48px;
        }

        .tab-content h4 {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 24px 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tab-content h5 {
          font-size: 20px;
          font-weight: 600;
          color: #374151;
          margin: 32px 0 16px 0;
        }

        /* Overview Tab */
        .personality-overview {
          display: grid;
          gap: 40px;
        }

        .type-display {
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 32px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 20px;
        }

        .type-emoji {
          font-size: 80px;
        }

        .type-info h2 {
          font-size: 36px;
          font-weight: 800;
          color: #1f2937;
          margin: 0 0 8px 0;
        }

        .type-info h3 {
          font-size: 24px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 8px 0;
        }

        .type-info p {
          font-size: 16px;
          color: #6b7280;
          margin: 0;
        }

        .description-card {
          background: #f8fafc;
          border-radius: 16px;
          padding: 32px;
        }

        .description-card p {
          font-size: 18px;
          line-height: 1.6;
          color: #374151;
          margin: 0;
        }

        .scores-section {
          background: #f8fafc;
          border-radius: 16px;
          padding: 32px;
        }

        /* Radar Chart */
        .radar-chart {
          margin-top: 24px;
        }

        .chart-container {
          display: grid;
          gap: 16px;
        }

        .dimension {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .dimension-label {
          width: 80px;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .dimension-bar {
          flex: 1;
          height: 16px;
          background: #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .dimension-fill {
          height: 100%;
          border-radius: 8px;
          transition: width 0.8s ease;
        }

        .dimension-value {
          width: 50px;
          text-align: right;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        /* Strengths Tab */
        .strengths-section {
          display: grid;
          gap: 40px;
        }

        .traits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .trait-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .strength-card {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border: 2px solid #a7f3d0;
        }

        .challenge-card {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #fcd34d;
        }

        .trait-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .trait-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .trait-text {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          line-height: 1.4;
        }

        /* Careers Tab */
        .careers-section {
          display: grid;
          gap: 40px;
        }

        .careers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .career-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border: 2px solid #93c5fd;
          border-radius: 16px;
          transition: all 0.3s ease;
          text-align: center;
        }

        .career-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .career-icon {
          font-size: 24px;
        }

        .career-text {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
        }

        .career-advice {
          background: #f8fafc;
          border-radius: 16px;
          padding: 32px;
        }

        .career-advice p {
          font-size: 16px;
          line-height: 1.6;
          color: #374151;
          margin: 0;
        }

        /* Relationships Tab */
        .relationships-section {
          display: grid;
          gap: 40px;
        }

        .relationship-card {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          background: linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%);
          border: 2px solid #d8b4fe;
          border-radius: 16px;
          padding: 32px;
        }

        .relationship-icon {
          font-size: 40px;
          flex-shrink: 0;
        }

        .relationship-card p {
          font-size: 18px;
          line-height: 1.6;
          color: #374151;
          margin: 0;
        }

        .relationship-tips {
          background: #f8fafc;
          border-radius: 16px;
          padding: 32px;
        }

        .tips-list {
          display: grid;
          gap: 16px;
        }

        .tip-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .tip-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        /* Footer Actions */
        .footer-actions {
          text-align: center;
        }

        .btn-home {
          background: linear-gradient(135deg, #6b7280 0%, #374151 100%);
          border: none;
          color: white;
        }

        .btn-home:hover {
          background: linear-gradient(135deg, #4b5563 0%, #1f2937 100%);
          transform: translateY(-2px);
        }

        /* Share Dialog */
        .share-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .share-dialog {
          background: white;
          border-radius: 24px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .share-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 32px;
          border-bottom: 1px solid #e5e7eb;
        }

        .share-header h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .close-button {
          width: 32px;
          height: 32px;
          border: none;
          background: #f3f4f6;
          border-radius: 50%;
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background: #e5e7eb;
          color: #374151;
        }

        .share-content {
          padding: 32px;
        }

        .share-option {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          padding: 20px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        .share-option:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .share-icon {
          font-size: 20px;
        }

        .share-message p {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #6b7280;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }

          .hero-content {
            padding: 20px 0;
          }

          .type-display {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .tab-content-wrapper {
            padding: 32px 24px;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 300px;
          }

          .traits-grid,
          .careers-grid {
            grid-template-columns: 1fr;
          }

          .relationship-card {
            flex-direction: column;
            text-align: center;
          }

          .type-emoji-large {
            font-size: 80px;
          }

          .completion-badge {
            padding: 12px 24px;
            font-size: 16px;
          }
        }

        /* Animation for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .particle,
          .btn,
          .trait-card,
          .career-card {
            animation: none;
            transition: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .trait-card,
          .career-card,
          .relationship-card {
            border-width: 3px;
          }
        }
      `}</style>
    </div>
  );
}