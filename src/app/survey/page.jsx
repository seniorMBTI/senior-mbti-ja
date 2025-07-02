'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';

export default function SurveyPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const { t } = useLanguage();

  // Multilingual questions data
  const questions = [
    {
      id: 1,
      textKey: 'survey.q1.text',
      text: t('landing.questions.sample'),
      choices: [
        { id: 1, text: t('landing.questions.choice1'), type: 'E' },
        { id: 2, text: t('landing.questions.choice2'), type: 'I' },
        { id: 3, text: '상황에 따라 다르다', type: 'N' },
        { id: 4, text: '잘 모르겠다', type: 'N' }
      ]
    },
    {
      id: 2,
      textKey: 'survey.q2.text',
      text: '계획을 세워서 일을 진행하는 것을 선호하시나요?',
      choices: [
        { id: 1, text: '매우 그렇다 - 미리 계획하는 것이 편하다', type: 'J' },
        { id: 2, text: '그렇다 - 어느 정도 계획은 필요하다', type: 'J' },
        { id: 3, text: '그렇지 않다 - 유연하게 대응하는 편이다', type: 'P' },
        { id: 4, text: '전혀 그렇지 않다 - 즉흥적인 것이 좋다', type: 'P' }
      ]
    },
    {
      id: 3,
      textKey: 'survey.q3.text', 
      text: '새로운 정보를 받아들일 때 어떤 방식을 선호하시나요?',
      choices: [
        { id: 1, text: '구체적이고 실용적인 정보를 좋아한다', type: 'S' },
        { id: 2, text: '전체적인 맥락과 의미를 파악하려 한다', type: 'N' },
        { id: 3, text: '경험을 통해 직접 확인하고 싶다', type: 'S' },
        { id: 4, text: '가능성과 잠재력을 생각해본다', type: 'N' }
      ]
    },
    {
      id: 4,
      textKey: 'survey.q4.text',
      text: '중요한 결정을 내릴 때 무엇을 더 중요하게 생각하시나요?',
      choices: [
        { id: 1, text: '논리적 분석과 객관적 사실', type: 'T' },
        { id: 2, text: '사람들의 감정과 관계', type: 'F' },
        { id: 3, text: '공정성과 원칙', type: 'T' },
        { id: 4, text: '조화와 배려', type: 'F' }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleChoiceSelect = (choiceId) => {
    setSelectedChoice(choiceId);
  };

  const handleNext = () => {
    if (selectedChoice === null) return;

    const newAnswers = [...answers, selectedChoice];
    setAnswers(newAnswers);
    setSelectedChoice(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedChoice(answers[currentQuestion - 1] || null);
      const newAnswers = answers.slice(0, -1);
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = async (finalAnswers) => {
    setIsSubmitting(true);
    
    // Simple MBTI calculation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const score = finalAnswers.reduce((sum, answer) => sum + answer, 0);
    const resultId = score > 8 ? 'ENFJ' : 'INTJ';
    
    router.push(`/result/${resultId}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= '1' && e.key <= '4') {
        const choiceIndex = parseInt(e.key) - 1;
        if (choiceIndex < currentQ.choices.length) {
          setSelectedChoice(currentQ.choices[choiceIndex].id);
        }
      } else if (e.key === 'Enter' && selectedChoice !== null) {
        handleNext();
      } else if (e.key === 'Escape') {
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedChoice, currentQ, router]);

  return (
    <div className="survey-container">
      {/* Header */}
      <header className="survey-header">
        <div className="container">
          <div className="header-content">
            <button 
              onClick={() => router.push('/')}
              className="back-button"
              aria-label="홈으로 돌아가기"
            >
              ← {t('survey.home')}
            </button>
            
            <div className="progress-info">
              <span className="question-counter">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="survey-main">
        <div className="container">
          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-label">
              <span className="progress-text">{t('survey.progress')}</span>
              <span className="progress-percentage">{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="question-card">
            <div className="question-header">
              <div className="question-number">
                <span className="question-icon">❓</span>
                <span className="question-label">
                  {t('survey.question')} {currentQuestion + 1}
                </span>
              </div>
              
              {currentQuestion < questions.length - 1 ? (
                <div className="remaining-questions">
                  {questions.length - currentQuestion - 1}개 남음
                </div>
              ) : (
                <div className="final-question">
                  마지막 질문입니다!
                </div>
              )}
            </div>

            <div className="question-content">
              <h2 className="question-text">
                {currentQ.text}
              </h2>
              
              <p className="question-hint">
                {t('survey.hint')}
              </p>

              <div className="choices-grid">
                {currentQ.choices.map((choice, index) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice.id)}
                    className={`choice-button ${
                      selectedChoice === choice.id ? 'choice-selected' : ''
                    }`}
                    aria-label={`선택지 ${index + 1}: ${choice.text}`}
                  >
                    <div className="choice-number">
                      {index + 1}
                    </div>
                    <div className="choice-content">
                      <span className="choice-text">{choice.text}</span>
                    </div>
                    <div className="choice-indicator">
                      {selectedChoice === choice.id && (
                        <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="navigation">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="nav-button nav-previous"
            >
              <span className="nav-icon">←</span>
              <span className="nav-text">{t('survey.previous')}</span>
            </button>

            <div className="nav-center">
              <div className="keyboard-hint">
                💡 키보드 1-4 숫자키로 선택 가능
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={selectedChoice === null}
              className={`nav-button nav-next ${isSubmitting ? 'nav-submitting' : ''}`}
            >
              <span className="nav-text">
                {isSubmitting ? t('survey.processing') : 
                 currentQuestion === questions.length - 1 ? t('survey.submit') : t('survey.next')}
              </span>
              {isSubmitting ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              ) : (
                <span className="nav-icon">→</span>
              )}
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .survey-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .survey-header {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-button:hover {
          background: #e5e7eb;
          border-color: #9ca3af;
        }

        .progress-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .question-counter {
          background: #eff6ff;
          color: #1d4ed8;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
        }

        /* Main Content */
        .survey-main {
          padding: 40px 0;
        }

        /* Progress Section */
        .progress-section {
          margin-bottom: 40px;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .progress-text {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
        }

        .progress-percentage {
          font-size: 18px;
          font-weight: 700;
          color: #1d4ed8;
        }

        .progress-bar {
          width: 100%;
          height: 12px;
          background: #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          border-radius: 6px;
          transition: width 0.6s ease;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Question Card */
        .question-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-bottom: 40px;
        }

        .question-header {
          background: linear-gradient(45deg, #667eea, #764ba2);
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .question-number {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .question-icon {
          font-size: 24px;
        }

        .question-label {
          color: white;
          font-size: 18px;
          font-weight: 700;
        }

        .remaining-questions,
        .final-question {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
        }

        .final-question {
          background: linear-gradient(45deg, #f59e0b, #eab308);
        }

        .question-content {
          padding: 40px 32px;
        }

        .question-text {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          line-height: 1.4;
          margin: 0 0 16px 0;
        }

        .question-hint {
          font-size: 16px;
          color: #6b7280;
          margin: 0 0 32px 0;
          text-align: center;
          padding: 12px 20px;
          background: #f9fafb;
          border-radius: 12px;
          border-left: 4px solid #3b82f6;
        }

        .choices-grid {
          display: grid;
          gap: 16px;
        }

        .choice-button {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
          position: relative;
        }

        .choice-button:hover {
          border-color: #3b82f6;
          background: #eff6ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        .choice-selected {
          border-color: #3b82f6 !important;
          background: #eff6ff !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .choice-number {
          width: 40px;
          height: 40px;
          background: #3b82f6;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }

        .choice-selected .choice-number {
          background: #1d4ed8;
        }

        .choice-content {
          flex: 1;
        }

        .choice-text {
          font-size: 16px;
          font-weight: 500;
          color: #374151;
          line-height: 1.5;
        }

        .choice-indicator {
          width: 24px;
          height: 24px;
          color: #3b82f6;
          flex-shrink: 0;
        }

        .check-icon {
          width: 24px;
          height: 24px;
        }

        /* Navigation */
        .navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .nav-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid;
          min-width: 140px;
          justify-content: center;
        }

        .nav-previous {
          background: white;
          color: #6b7280;
          border-color: #d1d5db;
        }

        .nav-previous:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .nav-previous:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .nav-next {
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          color: white;
          border-color: #3b82f6;
        }

        .nav-next:hover:not(:disabled) {
          background: linear-gradient(45deg, #2563eb, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .nav-next:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .nav-center {
          flex: 1;
          text-align: center;
        }

        .keyboard-hint {
          font-size: 14px;
          color: #6b7280;
          background: white;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .loading-spinner {
          margin-left: 8px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }

          .survey-main {
            padding: 24px 0;
          }

          .question-header {
            padding: 20px 24px;
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }

          .question-content {
            padding: 32px 24px;
          }

          .question-text {
            font-size: 20px;
          }

          .choice-button {
            flex-direction: column;
            text-align: center;
            gap: 12px;
            padding: 20px;
          }

          .navigation {
            flex-direction: column;
            gap: 16px;
          }

          .nav-button {
            width: 100%;
            max-width: 300px;
          }

          .nav-center {
            order: -1;
          }
        }

        /* Animation for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .choice-button,
          .nav-button,
          .progress-fill {
            transition: none;
            animation: none;
          }
          
          .choice-button:hover {
            transform: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .choice-button,
          .nav-button {
            border-width: 3px;
          }
        }
      `}</style>
    </div>
  );
}