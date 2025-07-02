'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

export default function HomePage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 언어별 타이틀 동적 설정
  useEffect(() => {
    const titles = {
      ko: '시니어 MBTI - 성격 유형 테스트',
      en: 'Senior MBTI - Personality Type Test',
      zh: '银发族MBTI - 性格类型测试',
      ja: 'シニアMBTI - 性格タイプテスト'
    };
    
    if (typeof document !== 'undefined') {
      document.title = titles[language] || titles.ko;
    }
  }, [language]);

  const handleStartTest = () => {
    setIsStarting(true);
    setTimeout(() => {
      router.push('/survey');
    }, 500);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const features = [
    {
      icon: '⏱️',
      titleKey: 'landing.time.title',
      descKey: 'landing.time.desc'
    },
    {
      icon: '💡',
      titleKey: 'landing.method.title', 
      descKey: 'landing.method.desc'
    },
    {
      icon: '🎯',
      titleKey: 'landing.types.title',
      descKey: 'landing.types.desc'
    },
    {
      icon: '🔒',
      titleKey: 'landing.privacy.title',
      descKey: 'landing.privacy.desc'
    }
  ];

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="floating-elements">
            <div className="floating-circle circle-1"></div>
            <div className="floating-circle circle-2"></div>
            <div className="floating-circle circle-3"></div>
          </div>
        </div>

        <div className="container">
          {/* Language Selector */}
          <div className="language-selector-wrapper">
            <LanguageSelector />
          </div>

          {/* Hero Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">✨ {t('landing.welcome')}</span>
            </div>
            
            <h1 className="hero-title">
              <span className="title-highlight">{t('landing.title')}</span>
            </h1>
            
            <p className="hero-tagline">
              {t('landing.tagline')}
            </p>
            
            <p className="hero-description">
              {t('landing.description')}
            </p>
            
            <div className="hero-seo-hook">
              <p className="seo-hook-main">
                <strong>🔍 あなたのMBTIを確認し、相性の良いMBTIタイプを見つけましょう！</strong>
              </p>
              <p className="seo-hook-sub">
                これからの人生で、あなたと相性の良い人々を特定し、素晴らしい人生のパートナーをみつけましょう！
              </p>
            </div>

            <div className="cta-section">
              <button
                onClick={handleStartTest}
                disabled={isStarting}
                className={`cta-button ${isStarting ? 'cta-button-loading' : ''}`}
                aria-label={isStarting ? t('landing.starting') : t('landing.start')}
              >
                <span className="cta-icon">🚀</span>
                <span className="cta-text">
                  {isStarting ? t('landing.starting') : t('landing.start')}
                </span>
                {isStarting && (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                )}
              </button>
              
              <div className="trust-indicators">
                <span className="trust-item">
                  <span className="trust-icon">👥</span>
                  <span className="trust-text">100% 匿名</span>
                </span>
                <span className="trust-item">
                  <span className="trust-icon">🏆</span>
                  <span className="trust-text">専門家制作</span>
                </span>
                <span className="trust-item">
                  <span className="trust-icon">⚡</span>
                  <span className="trust-text">2分で完了</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <h2 className="features-title">
              なぜシニアMBTIを選ぶべきでしょうか？
            </h2>
            <p className="features-subtitle">
              あなたの豊富な人生経験に基づく正確な性格分析
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card card-${index + 1}`}>
                <div className="feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="feature-description">
                    {t(feature.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MBTI Compatibility Showcase Section */}
      <section className="compatibility-showcase-section">
        <div className="container">
          <div className="showcase-header">
            <h2 className="showcase-title">
              💕 MBTI相性分析プレビュー
            </h2>
            <p className="showcase-subtitle">
              あなたと最も相性の良いMBTIタイプと、努力が必要なMBTIタイプをプレビュー
            </p>
          </div>

          <div className="compatibility-examples">
            <div className="example-card best-match-example">
              <div className="example-header">
                <h3 className="example-title">💖 理想的な組み合わせ例</h3>
                <p className="example-subtitle">INTJ × ENFP 組み合わせ</p>
              </div>
              <div className="mbti-cards">
                <div className="mbti-card intj-card">
                  <div className="mbti-type">INTJ</div>
                  <div className="mbti-name">建築家</div>
                  <div className="mbti-traits">
                    <span className="trait">戦略的</span>
                    <span className="trait">独立的</span>
                    <span className="trait">先見的</span>
                  </div>
                </div>
                <div className="compatibility-indicator">
                  <div className="heart-icon">💖</div>
                  <div className="compatibility-text">完璧な調和</div>
                </div>
                <div className="mbti-card enfp-card">
                  <div className="mbti-type">ENFP</div>
                  <div className="mbti-name">運動家</div>
                  <div className="mbti-traits">
                    <span className="trait">情熱的</span>
                    <span className="trait">创造的</span>
                    <span className="trait">社交的</span>
                  </div>
                </div>
              </div>
              <div className="compatibility-reason">
                <p>戦略的なINTJと創造的なENFPはお互いを補完し合い、相互理解と尊敬に基づいた深い関係を築きます。</p>
              </div>
            </div>

            <div className="example-card challenging-match-example">
              <div className="example-header">
                <h3 className="example-title">💛 成長の機会例</h3>
                <p className="example-subtitle">INTJ × ESFJ 組み合わせ</p>
              </div>
              <div className="mbti-cards">
                <div className="mbti-card intj-card">
                  <div className="mbti-type">INTJ</div>
                  <div className="mbti-name">建築家</div>
                  <div className="mbti-traits">
                    <span className="trait">論理的</span>
                    <span className="trait">独立的</span>
                    <span className="trait">計画的</span>
                  </div>
                </div>
                <div className="compatibility-indicator challenging">
                  <div className="heart-icon">💛</div>
                  <div className="compatibility-text">努力が必要</div>
                </div>
                <div className="mbti-card esfj-card">
                  <div className="mbti-type">ESFJ</div>
                  <div className="mbti-name">領事</div>
                  <div className="mbti-traits">
                    <span className="trait">思いやり</span>
                    <span className="trait">社交的</span>
                    <span className="trait">協調的</span>
                  </div>
                </div>
              </div>
              <div className="compatibility-reason">
                <p>アプローチ方法は異なりますが、相互理解と配慮を通じてバランスの取れた豊かな関係を築くことができます。</p>
              </div>
            </div>
          </div>

          <div className="showcase-cta">
            <button
              onClick={handleStartTest}
              className="showcase-cta-button"
            >
              <span>🎯</span>
              私のMBTI相性を発見する
            </button>
          </div>
        </div>
      </section>

      {/* Sample Question Section */
      <section className="sample-section">
        <div className="container">
          <div className="sample-card">
            <div className="sample-header">
              <h3 className="sample-title">
                {t('landing.questions.title')}
              </h3>
            </div>
            <div className="sample-content">
              <div className="sample-question">
                <h4 className="question-label">
                  {t('landing.questions.example')}
                </h4>
                <p className="question-text">
                  {t('landing.questions.sample')}
                </p>
              </div>
              <div className="sample-choices">
                <div className="choice-option choice-a">
                  <span className="choice-label">A</span>
                  <span className="choice-text">
                    {t('landing.questions.choice1')}
                  </span>
                </div>
                <div className="choice-option choice-b">
                  <span className="choice-label">B</span>
                  <span className="choice-text">
                    {t('landing.questions.choice2')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-content">
            <h2 className="final-cta-title">
              {t('landing.closing')}
            </h2>
            <button
              onClick={handleStartTest}
              disabled={isStarting}
              className={`final-cta-button ${isStarting ? 'final-cta-loading' : ''}`}
            >
              <span className="final-cta-icon">✨</span>
              <span className="final-cta-text">
                {isStarting ? t('landing.starting') : t('landing.start')}
              </span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(102, 126, 234, 0.9) 0%, 
            rgba(118, 75, 162, 0.9) 100%);
        }

        .floating-elements {
          position: absolute;
          inset: 0;
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          right: 10%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: 20%;
          left: 15%;
          animation-delay: 2s;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 25%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .language-selector-wrapper {
          position: relative;
          z-index: 999999;
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

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          padding: 12px 24px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }

        .badge-text {
          color: white;
          font-size: 16px;
          font-weight: 600;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          color: white;
          margin: 0 0 24px 0;
          line-height: 1.1;
        }

        .title-highlight {
          background: linear-gradient(45deg, #FFD700, #FFA500, #FF6B6B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }

        .hero-tagline {
          font-size: clamp(1.25rem, 4vw, 1.75rem);
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 24px 0;
          font-weight: 500;
          line-height: 1.4;
        }

        .hero-description {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 48px 0;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .cta-button {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 20px 40px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
          transform: translateY(0);
          min-width: 280px;
          justify-content: center;
        }

        .cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
        }

        .cta-button:disabled {
          opacity: 0.8;
          cursor: not-allowed;
          transform: translateY(0);
        }

        .cta-icon {
          font-size: 24px;
        }

        .loading-spinner {
          margin-left: 8px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .trust-indicators {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 600;
        }

        .trust-icon {
          font-size: 16px;
        }

        /* Features Section */
        .features-section {
          background: white;
          padding: 100px 0;
        }

        .features-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .features-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #1F2937;
          margin: 0 0 16px 0;
        }

        .features-subtitle {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: #6B7280;
          margin: 0;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .feature-card {
          background: white;
          border-radius: 24px;
          padding: 40px 32px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #F3F4F6;
          transition: all 0.3s ease;
          text-align: center;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-1 { border-top: 4px solid #FF6B6B; }
        .card-2 { border-top: 4px solid #4ECDC4; }
        .card-3 { border-top: 4px solid #45B7D1; }
        .card-4 { border-top: 4px solid #96CEB4; }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #F8FAFC, #E2E8F0);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          font-size: 36px;
        }

        .feature-title {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin: 0 0 16px 0;
        }

        .feature-description {
          font-size: 16px;
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }

        /* Sample Section */
        .sample-section {
          background: #F8FAFC;
          padding: 100px 0;
        }

        .sample-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .sample-header {
          background: linear-gradient(45deg, #667eea, #764ba2);
          padding: 32px 40px;
          text-align: center;
        }

        .sample-title {
          color: white;
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }

        .sample-content {
          padding: 40px;
        }

        .sample-question {
          margin-bottom: 32px;
        }

        .question-label {
          color: #4F46E5;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 12px 0;
        }

        .question-text {
          font-size: 20px;
          font-weight: 600;
          color: #1F2937;
          margin: 0;
          line-height: 1.5;
        }

        .sample-choices {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .choice-option {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #F8FAFC;
          border: 2px solid #E5E7EB;
          border-radius: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .choice-option:hover {
          border-color: #4F46E5;
          background: #EEF2FF;
        }

        .choice-label {
          width: 32px;
          height: 32px;
          background: #4F46E5;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .choice-text {
          font-size: 16px;
          color: #374151;
          font-weight: 500;
          line-height: 1.5;
        }

        /* Final CTA Section */
        .final-cta-section {
          background: linear-gradient(135deg, #1F2937 0%, #374151 100%);
          padding: 100px 0;
          text-align: center;
        }

        .final-cta-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          color: white;
          margin: 0 0 40px 0;
          line-height: 1.3;
        }

        .final-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(45deg, #F59E0B, #EAB308);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 20px 40px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
        }

        .final-cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(245, 158, 11, 0.6);
        }

        .final-cta-icon {
          font-size: 24px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }

          .hero-content {
            padding: 20px 0;
          }

          .features-section,
          .sample-section,
          .final-cta-section {
            padding: 60px 0;
          }

          .features-grid {
            gap: 24px;
          }

          .feature-card {
            padding: 32px 24px;
          }

          .sample-content {
            padding: 32px 24px;
          }

          .trust-indicators {
            gap: 16px;
          }

          .choice-option {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }

        /* Hero SEO Hook Styles */
        .hero-seo-hook {
          margin: 24px 0;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
        }

        .seo-hook-main {
          font-size: 18px;
          color: white;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .seo-hook-sub {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          line-height: 1.6;
        }

        /* Compatibility Showcase Section */
        .compatibility-showcase-section {
          padding: 80px 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .showcase-title {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .showcase-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          line-height: 1.6;
        }

        .compatibility-examples {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .example-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.3s ease;
        }

        .example-card:hover {
          transform: translateY(-8px);
        }

        .example-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .example-title {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .example-subtitle {
          font-size: 16px;
          color: #6B7280;
          margin: 0;
        }

        .mbti-cards {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          gap: 16px;
        }

        .mbti-card {
          flex: 1;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .mbti-type {
          font-size: 24px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .mbti-name {
          font-size: 16px;
          color: #374151;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .mbti-traits {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
        }

        .trait {
          font-size: 12px;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: 500;
        }

        .compatibility-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 120px;
        }

        .heart-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .compatibility-text {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          text-align: center;
        }

        .compatibility-indicator.challenging .compatibility-text {
          color: #D97706;
        }

        .compatibility-reason {
          padding: 16px;
          background: rgba(102, 126, 234, 0.05);
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .compatibility-reason p {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
          margin: 0;
        }

        .showcase-cta {
          text-align: center;
        }

        .showcase-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .showcase-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
        }

        /* Mobile responsiveness for new sections */
        @media (max-width: 768px) {
          .hero-seo-hook {
            margin: 16px 0;
            padding: 16px;
          }

          .seo-hook-main {
            font-size: 16px;
          }

          .seo-hook-sub {
            font-size: 14px;
          }

          .compatibility-showcase-section {
            padding: 60px 0;
          }

          .showcase-title {
            font-size: 28px;
          }

          .showcase-subtitle {
            font-size: 16px;
          }

          .compatibility-examples {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 40px;
          }

          .example-card {
            padding: 24px;
          }

          .mbti-cards {
            flex-direction: column;
            gap: 12px;
          }

          .compatibility-indicator {
            min-width: auto;
            flex-direction: row;
            gap: 8px;
          }

          .heart-icon {
            font-size: 24px;
            margin-bottom: 0;
          }
        }

        /* MBTI Types Section */
        .mbti-types-section {
          background: white;
          padding: 100px 0;
        }

        .types-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .types-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 16px;
        }

        .types-subtitle {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: #6B7280;
          margin: 0;
          line-height: 1.6;
        }

        .mbti-grid {
          display: grid;
          gap: 60px;
          margin-bottom: 80px;
        }

        .mbti-group {
          background: #F8FAFC;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          border: 1px solid #E5E7EB;
        }

        .nt-group { border-top: 4px solid #8B5CF6; }
        .nf-group { border-top: 4px solid #EF4444; }
        .sj-group { border-top: 4px solid #10B981; }
        .sp-group { border-top: 4px solid #F59E0B; }

        .group-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 28px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 12px;
        }

        .group-icon {
          font-size: 32px;
        }

        .group-description {
          font-size: 16px;
          color: #6B7280;
          margin-bottom: 32px;
          text-align: left;
        }

        .types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .type-link {
          text-decoration: none;
          display: block;
          transition: transform 0.3s ease;
        }

        .type-link:hover {
          transform: translateY(-4px);
        }

        .type-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid #E5E7EB;
          text-align: center;
          transition: all 0.3s ease;
        }

        .type-card:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #9CA3AF;
        }

        .type-code {
          font-size: 24px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .type-name {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 12px;
        }

        .type-traits {
          font-size: 14px;
          color: #6B7280;
          line-height: 1.5;
        }

        .related-links {
          text-align: center;
        }

        .related-title {
          font-size: 28px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 40px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .related-link {
          text-decoration: none;
          display: block;
          transition: transform 0.3s ease;
        }

        .related-link:hover {
          transform: translateY(-4px);
        }

        .related-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #E5E7EB;
          text-align: center;
          transition: all 0.3s ease;
        }

        .related-card:hover {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .related-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
        }

        .related-card h4 {
          font-size: 20px;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 12px;
        }

        .related-card p {
          font-size: 14px;
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }

        /* Mobile responsiveness for MBTI Types Section */
        @media (max-width: 768px) {
          .mbti-types-section {
            padding: 60px 0;
          }

          .mbti-grid {
            gap: 40px;
            margin-bottom: 60px;
          }

          .mbti-group {
            padding: 24px;
          }

          .group-title {
            font-size: 24px;
          }

          .types-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
          }

          .type-card {
            padding: 20px;
          }

          .related-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .related-card {
            padding: 24px;
          }
        }

        /* Animation for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .floating-circle,
          .cta-button,
          .feature-card,
          .choice-option,
          .final-cta-button,
          .example-card,
          .showcase-cta-button,
          .type-link,
          .related-link {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}