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

  // シニア向け最適化 24問 (2択)
  const questions = [
    // E/I 次元 - 6問
    {
      id: 1,
      category: 'E/I',
      text: '普段、友人や知人とどのように時間を過ごすことを好みますか？',
      choices: [
        { id: 'A', text: '多くの人と一緒に集まって話や活動をするのが好きです', type: 'E' },
        { id: 'B', text: '少数の親しい方と静かに対話するのが楽です', type: 'I' }
      ]
    },
    {
      id: 2,
      category: 'E/I',
      text: '一日が終わって疲れた時、どのような方法で気分転換をしますか？',
      choices: [
        { id: 'A', text: '家族や友人と対話をして一緒に時間を過ごします', type: 'E' },
        { id: 'B', text: '一人の時間を持ち、静かに休息を取ります', type: 'I' }
      ]
    },
    {
      id: 3,
      category: 'E/I',
      text: '新しい人と出会った時、どのような様子ですか？',
      choices: [
        { id: 'A', text: '先に近づいて挨拶をし、会話を始めます', type: 'E' },
        { id: 'B', text: '相手から先に声をかけてくれるのを待ちます', type: 'I' }
      ]
    },
    {
      id: 4,
      category: 'E/I',
      text: '週末や休日にどのような活動を好みますか？',
      choices: [
        { id: 'A', text: '友人や家族と一緒にお出かけや集まりに参加します', type: 'E' },
        { id: 'B', text: '家で読書、映画鑑賞など一人で楽しむことをします', type: 'I' }
      ]
    },
    {
      id: 5,
      category: 'E/I',
      text: '電話での会話についてどのような好みがありますか？',
      choices: [
        { id: 'A', text: '電話で話すのが好きで、よく通話をします', type: 'E' },
        { id: 'B', text: '緊急でない限り、文字やメッセージで連絡することを好みます', type: 'I' }
      ]
    },
    {
      id: 6,
      category: 'E/I',
      text: '講演や集まりではどのような様子ですか？',
      choices: [
        { id: 'A', text: '積極的に発言し、他の人と意見を交換します', type: 'E' },
        { id: 'B', text: '主に聞く側で、慎重に考えてから話します', type: 'I' }
      ]
    },
    
    // S/N 次元 - 6問
    {
      id: 7,
      category: 'S/N',
      text: '新しいことを学ぶ時、どのような方法を好みますか？',
      choices: [
        { id: 'A', text: '具体的な事実と実際の経験を通して着実に学びます', type: 'S' },
        { id: 'B', text: '全体的な意味と可能性を先に把握しようとします', type: 'N' }
      ]
    },
    {
      id: 8,
      category: 'S/N',
      text: '問題を解決する時、どのような方法を好みますか？',
      choices: [
        { id: 'A', text: '過去の経験と実証された方法を活用します', type: 'S' },
        { id: 'B', text: '新しいアイデアと創造的な解決策を探します', type: 'N' }
      ]
    },
    {
      id: 9,
      category: 'S/N',
      text: '会話する時、どのような話題を好みますか？',
      choices: [
        { id: 'A', text: '日常の具体的な話や実用的な情報を共有します', type: 'S' },
        { id: 'B', text: '未来への夢や哲学的な思考を共有します', type: 'N' }
      ]
    },
    {
      id: 10,
      category: 'S/N',
      text: '旅行を計画する時、何に重点を置きますか？',
      choices: [
        { id: 'A', text: '過去に行ったことがある場所や有名な場所を好みます', type: 'S' },
        { id: 'B', text: '初めて行く場所や予想しない発見を期待します', type: 'N' }
      ]
    },
    {
      id: 11,
      category: 'S/N',
      text: '仕事をする時、どのような方法を好みますか？',
      choices: [
        { id: 'A', text: '段階的に着実に進めながら詳細をチェックします', type: 'S' },
        { id: 'B', text: '全体的な流れを把握し、大きな絵を先に描きます', type: 'N' }
      ]
    },
    {
      id: 12,
      category: 'S/N',
      text: '本を読んだり映画を見る時、どのような内容を好みますか？',
      choices: [
        { id: 'A', text: '現実的で実際の経験を扱った内容を好みます', type: 'S' },
        { id: 'B', text: '想像力を刺激し、新しい世界を見せてくれる内容を好みます', type: 'N' }
      ]
    },
    
    // T/F 次元 - 6問
    {
      id: 13,
      category: 'T/F',
      text: '重要な決定をする時、何を最も重要に考えますか？',
      choices: [
        { id: 'A', text: '客観的な事実と論理的な分析に基づいて判断します', type: 'T' },
        { id: 'B', text: '関連する人々の気持ちと関係を優先的に考慮します', type: 'F' }
      ]
    },
    {
      id: 14,
      category: 'T/F',
      text: '他の人が失敗した時、どのように対応しますか？',
      choices: [
        { id: 'A', text: '問題の原因と解決方案に集中して指摘します', type: 'T' },
        { id: 'B', text: '相手の気持ちを察し、励ましと慰めを先にします', type: 'F' }
      ]
    },
    {
      id: 15,
      category: 'T/F',
      text: '議論や対立状況でどのような態度を取りますか？',
      choices: [
        { id: 'A', text: '事実と論理に基づいて公正な判断を下します', type: 'T' },
        { id: 'B', text: 'すべての人の気持ちを察し、調和を図ろうと努力します', type: 'F' }
      ]
    },
    {
      id: 16,
      category: 'T/F',
      text: 'アドバイスをする時、どのような方法で助けますか？',
      choices: [
        { id: 'A', text: '将来に役立つ実用的な解決策を提示します', type: 'T' },
        { id: 'B', text: '相手の感情に共感し、慰めと励ましをします', type: 'F' }
      ]
    },
    {
      id: 17,
      category: 'T/F',
      text: '他の人を評価する時、何をより重要に考えますか？',
      choices: [
        { id: 'A', text: 'その人の能力と成果、客観的な成果を冷静に評価します', type: 'T' },
        { id: 'B', text: 'その人の意図と努力、人間的な面を先に考慮します', type: 'F' }
      ]
    },
    {
      id: 18,
      category: 'T/F',
      text: '重要なことを決定する時、どのような基準をより重視しますか？',
      choices: [
        { id: 'A', text: '公正性と原則、一貫性のある基準を重視します', type: 'T' },
        { id: 'B', text: '人間的な情緒と個人的な状況を優先考慮します', type: 'F' }
      ]
    },
    
    // J/P 次元 - 6問
    {
      id: 19,
      category: 'J/P',
      text: '日常生活をどのように管理することを好みますか？',
      choices: [
        { id: 'A', text: '事前に計画を立て、スケジュールに合わせて体系的に進めます', type: 'J' },
        { id: 'B', text: '状況に応じて柔軟に対応し、自然に流れるようにします', type: 'P' }
      ]
    },
    {
      id: 20,
      category: 'J/P',
      text: 'まだ終わっていない仕事がある時、気分はどうですか？',
      choices: [
        { id: 'A', text: '早く終わらせたくて気持ちが不快で気になります', type: 'J' },
        { id: 'B', text: '急がなくても大丈夫で、ゆっくり進めても構いません', type: 'P' }
      ]
    },
    {
      id: 21,
      category: 'J/P',
      text: '約束や計画についてどう思いますか？',
      choices: [
        { id: 'A', text: '約束は必ず守るべき重要な約束だと思います', type: 'J' },
        { id: 'B', text: '状況に応じて変更できる柔軟なガイドラインだと思います', type: 'P' }
      ]
    },
    {
      id: 22,
      category: 'J/P',
      text: '旅行に出かける時、どのようなスタイルを好みますか？',
      choices: [
        { id: 'A', text: '事前にスケジュールと宿泊、観光地をすべて予約してから行きます', type: 'J' },
        { id: 'B', text: '大まかな計画だけ立て、旅行先で即座に決定します', type: 'P' }
      ]
    },
    {
      id: 23,
      category: 'J/P',
      text: '仕事を進める時、どのような方法を好みますか？',
      choices: [
        { id: 'A', text: '最初から最後まで段階的に順序通りに進めます', type: 'J' },
        { id: 'B', text: '私がやりたい部分から始めて自由に進めます', type: 'P' }
      ]
    },
    {
      id: 24,
      category: 'J/P',
      text: '選択をしなければならない状況ではどのような様子ですか？',
      choices: [
        { id: 'A', text: '十分に悩んだ後決定すれば変えません', type: 'J' },
        { id: 'B', text: '選択を先延ばしにして最後の瞬間に決定することが多いです', type: 'P' }
      ]
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = 'シニアMBTI性格テスト';
    }
  }, []);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (choice) => {
    setSelectedChoice(choice);
  };

  const handleNext = () => {
    if (selectedChoice) {
      const newAnswers = [...answers, {
        questionId: questions[currentQuestion].id,
        choice: selectedChoice.id,
        type: selectedChoice.type,
        category: questions[currentQuestion].category
      }];
      
      setAnswers(newAnswers);
      setSelectedChoice(null);

      if (currentQuestion === questions.length - 1) {
        // テスト完了、結果を計算
        calculateAndRedirect(newAnswers);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedChoice(null);
    }
  };

  const calculateAndRedirect = async (finalAnswers) => {
    setIsSubmitting(true);
    
    try {
      // MBTIタイプを計算
      const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      
      finalAnswers.forEach(answer => {
        scores[answer.type]++;
      });

      const mbtiType = 
        (scores.E > scores.I ? 'E' : 'I') +
        (scores.S > scores.N ? 'S' : 'N') +
        (scores.T > scores.F ? 'T' : 'F') +
        (scores.J > scores.P ? 'J' : 'P');

      // 結果IDを生成
      const resultId = Date.now().toString();
      
      // localStorageに保存
      const resultData = {
        mbtiType,
        scores,
        answers: finalAnswers,
        completedAt: new Date().toISOString(),
        language: 'ja'
      };
      
      localStorage.setItem(`mbti-result-${resultId}`, JSON.stringify(resultData));
      
      // 結果ページにリダイレクト
      router.push(`/result/${resultId}`);
      
    } catch (error) {
      console.error('Error calculating results:', error);
      alert('結果計算でエラーが発生しました。再試行してください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="survey-container">
      {/* 進捗バー */}
      <div className="progress-header">
        <div className="progress-info">
          <span className="progress-text">第 {currentQuestion + 1} 問 / 全 {questions.length} 問</span>
          <span className="progress-percent">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* 質問カード */}
      <div className="question-card">
        <div className="question-category">
          {currentQ.category} 次元 · 第 {currentQuestion + 1} 問
        </div>
        
        <h2 className="question-text">
          {currentQ.text}
        </h2>

        <div className="choices-container">
          {currentQ.choices.map((choice) => (
            <button
              key={choice.id}
              className={`choice-button ${selectedChoice?.id === choice.id ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(choice)}
            >
              <div className="choice-label">{choice.id}</div>
              <div className="choice-text">{choice.text}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ナビゲーションボタン */}
      <div className="navigation-buttons">
        <button
          className="nav-button prev-button"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          前の問題
        </button>
        
        <button
          className="nav-button next-button"
          onClick={handleNext}
          disabled={!selectedChoice || isSubmitting}
        >
          {isSubmitting ? '計算中...' : 
           currentQuestion === questions.length - 1 ? '結果を見る' : '次の問題'}
        </button>
      </div>

      <style jsx>{`
        .survey-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .survey-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 120, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        .progress-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          position: relative;
          z-index: 10;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .progress-text {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
          background: linear-gradient(45deg, #1F2937, #4F46E5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .progress-percent {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(45deg, #4F46E5, #7C3AED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
        }

        .progress-bar {
          width: 100%;
          height: 12px;
          background: rgba(229, 231, 235, 0.8);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899);
          border-radius: 12px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 0 20px rgba(79, 70, 229, 0.5),
            inset 0 1px 2px rgba(255, 255, 255, 0.3);
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 20px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
          animation: shine 2s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(20px); opacity: 0; }
        }

        .question-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 32px;
          padding: 48px;
          margin-bottom: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          flex: 1;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .question-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.5), transparent);
        }

        .question-category {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 32px;
          box-shadow: 
            0 8px 25px rgba(79, 70, 229, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .question-category::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: categoryShine 3s infinite;
        }

        @keyframes categoryShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .question-text {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #1F2937, #4F46E5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.3;
          margin-bottom: 48px;
          position: relative;
        }

        .choices-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .choice-button {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 32px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(229, 231, 235, 0.8);
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .choice-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .choice-button:hover {
          border-color: rgba(79, 70, 229, 0.5);
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-4px) scale(1.02);
          box-shadow: 
            0 20px 40px rgba(79, 70, 229, 0.15),
            0 0 0 1px rgba(79, 70, 229, 0.1);
        }

        .choice-button:hover::before {
          opacity: 1;
        }

        .choice-button.selected {
          border-color: #4F46E5;
          background: linear-gradient(135deg, 
            rgba(238, 242, 255, 0.9), 
            rgba(243, 232, 255, 0.9));
          box-shadow: 
            0 0 0 2px rgba(79, 70, 229, 0.3),
            0 20px 40px rgba(79, 70, 229, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          transform: translateY(-2px) scale(1.01);
        }

        .choice-button.selected::before {
          opacity: 1;
        }

        .choice-label {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 800;
          flex-shrink: 0;
          box-shadow: 
            0 8px 25px rgba(79, 70, 229, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .choice-label::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2));
        }

        .choice-text {
          font-size: 20px;
          font-weight: 600;
          color: #374151;
          line-height: 1.5;
          flex: 1;
        }

        .navigation-buttons {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          position: relative;
          z-index: 10;
        }

        .nav-button {
          flex: 1;
          padding: 20px 32px;
          border: none;
          border-radius: 20px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .prev-button {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          color: #6B7280;
          border: 2px solid rgba(229, 231, 235, 0.8);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .prev-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.95);
          border-color: #D1D5DB;
          color: #374151;
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
        }

        .prev-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .next-button {
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          box-shadow: 
            0 8px 25px rgba(79, 70, 229, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .next-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .next-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #4338CA, #6D28D9);
          transform: translateY(-4px);
          box-shadow: 
            0 16px 40px rgba(79, 70, 229, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .next-button:hover:not(:disabled)::before {
          opacity: 1;
        }

        .next-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* レスポンシブデザイン */
        @media (max-width: 768px) {
          .survey-container {
            padding: 16px;
          }

          .progress-header {
            padding: 24px;
            margin-bottom: 24px;
          }

          .question-card {
            padding: 32px 24px;
          }

          .question-text {
            font-size: 26px;
          }

          .choice-button {
            padding: 24px 20px;
            gap: 20px;
          }

          .choice-label {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }

          .choice-text {
            font-size: 18px;
          }

          .navigation-buttons {
            flex-direction: column;
            gap: 16px;
          }

          .nav-button {
            font-size: 18px;
            padding: 18px 24px;
          }
        }

        /* アクセシビリティ対応 */
        @media (prefers-reduced-motion: reduce) {
          .choice-button,
          .nav-button,
          .progress-fill,
          .question-category::before,
          .progress-fill::after {
            animation: none;
            transition: none;
          }
        }

        /* 高コントラストモード */
        @media (prefers-contrast: high) {
          .choice-button {
            border-width: 3px;
          }
          
          .choice-button.selected {
            border-width: 4px;
          }
          
          .progress-header,
          .question-card {
            border-width: 2px;
          }
        }

        /* ダークモード対応 */
        @media (prefers-color-scheme: dark) {
          .progress-header,
          .question-card {
            background: rgba(17, 24, 39, 0.95);
            border-color: rgba(75, 85, 99, 0.3);
          }
          
          .choice-button {
            background: rgba(31, 41, 55, 0.9);
            border-color: rgba(75, 85, 99, 0.5);
          }
          
          .choice-text {
            color: #E5E7EB;
          }
          
          .progress-text {
            color: #E5E7EB;
          }
        }
      `}</style>
    </div>
  );
}