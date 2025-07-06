'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // エラーログ
    console.error('Result page error:', error);
  }, [error]);

  return (
    <div className="error-container">
      <style jsx>{`
        .error-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        }
        
        .error-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          padding: 48px;
          max-width: 500px;
          width: 100%;
        }
        
        .error-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .error-message {
          font-size: 18px;
          margin-bottom: 32px;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .error-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .error-button {
          padding: 12px 24px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px;
        }
        
        .retry-button {
          background: linear-gradient(45deg, #4F46E5, #7C3AED);
          color: white;
        }
        
        .home-button {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .error-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .error-card {
            padding: 32px 24px;
          }
          
          .error-title {
            font-size: 24px;
          }
          
          .error-message {
            font-size: 16px;
          }
          
          .error-buttons {
            flex-direction: column;
          }
        }
      `}</style>
      
      <div className="error-card">
        <h2 className="error-title">結果の読み込み中にエラーが発生しました</h2>
        <p className="error-message">
          MBTI結果の表示中に予期しないエラーが発生しました。<br />
          しばらくしてから再試行するか、ホームページに戻ってください。
        </p>
        
        <div className="error-buttons">
          <button
            className="error-button retry-button"
            onClick={() => reset()}
          >
            再試行
          </button>
          <button
            className="error-button home-button"
            onClick={() => window.location.href = '/'}
          >
            ホームに戻る
          </button>
        </div>
      </div>
    </div>
  );
}