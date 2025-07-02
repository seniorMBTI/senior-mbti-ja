'use client';

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { 
    code: 'ko', 
    name: '한국어', 
    localName: '한국어',
    flag: '🇰🇷',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    hoverColor: 'hover:bg-red-100'
  },
  { 
    code: 'en', 
    name: 'English', 
    localName: 'English',
    flag: '🇺🇸',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200', 
    hoverColor: 'hover:bg-blue-100'
  },
  { 
    code: 'zh', 
    name: '中文', 
    localName: '中文 (简体)',
    flag: '🇨🇳',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    hoverColor: 'hover:bg-yellow-100'
  },
  { 
    code: 'ja', 
    name: '日本語', 
    localName: '日本語',
    flag: '🇯🇵',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    hoverColor: 'hover:bg-pink-100'
  }
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
    
    // 접근성을 위한 포커스 관리
    document.getElementById('language-selector-button')?.focus();
  };

  return (
    <div className="language-selector-container">
      {/* 현재 선택된 언어 버튼 */}
      <button
        id="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          language-selector-button
          ${currentLanguage?.bgColor}
          ${currentLanguage?.borderColor}
          ${currentLanguage?.hoverColor}
        `}
        aria-label={`현재 언어: ${currentLanguage?.localName}. 클릭하여 언어 변경`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="language-button-content">
          <span className="language-flag">{currentLanguage?.flag}</span>
          <div className="language-text">
            <span className="language-name">{currentLanguage?.name}</span>
            <span className="language-local">{currentLanguage?.localName}</span>
          </div>
          <svg 
            className={`language-arrow ${isOpen ? 'language-arrow-open' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* 언어 선택 오버레이 */}
      {isOpen && (
        <>
          <div 
            className="language-overlay" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div 
            className="language-dropdown"
            role="listbox"
            aria-label="언어 선택"
          >
            <div className="language-dropdown-header">
              <h3>언어 선택 / Language</h3>
              <button
                className="language-close-button"
                onClick={() => setIsOpen(false)}
                aria-label="언어 선택 닫기"
              >
                ✕
              </button>
            </div>
            
            <div className="language-grid">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`
                    language-option
                    ${lang.bgColor}
                    ${lang.borderColor}
                    ${lang.hoverColor}
                    ${language === lang.code ? 'language-option-selected' : ''}
                  `}
                  role="option"
                  aria-selected={language === lang.code}
                  aria-label={`${lang.localName} 선택`}
                >
                  <div className="language-option-content">
                    <span className="language-option-flag">{lang.flag}</span>
                    <div className="language-option-text">
                      <span className="language-option-name">{lang.name}</span>
                      <span className="language-option-local">{lang.localName}</span>
                    </div>
                    {language === lang.code && (
                      <div className="language-check">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .language-selector-container {
          position: relative;
          z-index: 50;
        }

        .language-selector-button {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border: 2px solid;
          border-radius: 16px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 180px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          font-size: 16px;
          font-weight: 600;
        }

        .language-selector-button:focus {
          outline: 3px solid #3B82F6;
          outline-offset: 2px;
        }

        .language-button-content {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 12px;
        }

        .language-flag {
          font-size: 28px;
          line-height: 1;
        }

        .language-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }

        .language-name {
          font-size: 16px;
          font-weight: 700;
          color: #1F2937;
          line-height: 1.2;
        }

        .language-local {
          font-size: 13px;
          color: #6B7280;
          font-weight: 500;
        }

        .language-arrow {
          width: 20px;
          height: 20px;
          color: #6B7280;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .language-arrow-open {
          transform: rotate(180deg);
        }

        .language-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 40;
        }

        .language-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 2px solid #E5E7EB;
          min-width: 320px;
          max-width: 400px;
          z-index: 50;
          overflow: hidden;
        }

        .language-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 2px solid #F3F4F6;
          background: #F9FAFB;
        }

        .language-dropdown-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1F2937;
          margin: 0;
        }

        .language-close-button {
          width: 32px;
          height: 32px;
          border: none;
          background: #E5E7EB;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #6B7280;
          transition: all 0.2s ease;
        }

        .language-close-button:hover {
          background: #D1D5DB;
          color: #374151;
        }

        .language-grid {
          padding: 16px;
          display: grid;
          gap: 12px;
        }

        .language-option {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border: 2px solid;
          border-radius: 16px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          text-align: left;
        }

        .language-option:focus {
          outline: 3px solid #3B82F6;
          outline-offset: 2px;
        }

        .language-option-selected {
          border-color: #3B82F6 !important;
          background: #EFF6FF !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .language-option-content {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 16px;
        }

        .language-option-flag {
          font-size: 32px;
          line-height: 1;
        }

        .language-option-text {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .language-option-name {
          font-size: 18px;
          font-weight: 700;
          color: #1F2937;
          line-height: 1.3;
        }

        .language-option-local {
          font-size: 14px;
          color: #6B7280;
          font-weight: 500;
        }

        .language-check {
          width: 24px;
          height: 24px;
          color: #3B82F6;
          flex-shrink: 0;
        }

        /* 모바일 최적화 */
        @media (max-width: 768px) {
          .language-dropdown {
            right: -16px;
            left: -16px;
            min-width: auto;
            max-width: none;
          }

          .language-selector-button {
            min-width: 160px;
            padding: 10px 14px;
          }

          .language-flag, .language-option-flag {
            font-size: 24px;
          }

          .language-name {
            font-size: 15px;
          }

          .language-option-name {
            font-size: 16px;
          }
        }

        /* 높은 대비 모드 지원 */
        @media (prefers-contrast: high) {
          .language-selector-button,
          .language-option {
            border-width: 3px;
          }
        }

        /* 애니메이션 줄이기 선호 사용자 */
        @media (prefers-reduced-motion: reduce) {
          .language-selector-button,
          .language-option,
          .language-arrow,
          .language-close-button {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}