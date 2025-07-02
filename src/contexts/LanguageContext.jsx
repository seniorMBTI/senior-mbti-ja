'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(undefined);

// 번역 데이터
const translations = {
  ko: {
    // 공통
    'site.title': '시니어 MBTI',
    'site.subtitle': '당신만의 특별한 성격 유형을 찾아보세요',
    
    // 랜딩페이지
    'landing.title': '시니어 MBTI',
    'landing.tagline': '인생의 경험이 만든 당신만의 특별한 성격',
    'landing.welcome': '환영합니다!',
    'landing.description': '평생의 풍부한 경험을 쌓아오신 당신을 위한 특별한 성격 유형 테스트입니다.\n24개의 간단한 질문을 통해 당신만의 독특한 성격과 지혜를 발견해보세요.',
    'landing.start': '✨ 테스트 시작하기',
    'landing.starting': '시작하는 중...',
  },
  
  en: {
    // 공통
    'site.title': 'Senior MBTI',
    'site.subtitle': 'Discover your unique personality type',
    
    // 랜딩페이지
    'landing.title': 'Senior MBTI',
    'landing.tagline': 'Your distinctive personality shaped by a lifetime of experience',
    'landing.welcome': 'Welcome!',
    'landing.description': 'A thoughtfully designed personality assessment for mature adults with rich life experiences.\nDiscover your unique character and wisdom through 24 simple questions.',
    'landing.start': '✨ Start Test',
    'landing.starting': 'Starting...',
  },
  
  zh: {
    // 공통
    'site.title': '银发族MBTI',
    'site.subtitle': '发现您独特的性格类型',
    
    // 랜딩페이지
    'landing.title': '银发族MBTI',
    'landing.tagline': '您丰富人生阅历塑造的独特性格',
    'landing.welcome': '欢迎您，尊敬的长者！',
    'landing.description': '专为拥有丰富人生阅历的长者们精心设计的性格类型测试。\n通过24个简单问题，发现您独特的性格魅力和人生智慧。',
    'landing.start': '✨ 开始测试',
    'landing.starting': '正在开始...',
  },
  
  ja: {
    // 공통
    'site.title': 'シニアMBTI',
    'site.subtitle': 'あなた独自の性格タイプを見つけましょう',
    
    // 랜딩페이지
    'landing.title': 'シニアMBTI',
    'landing.tagline': '人生経験が作り上げたあなただけの特別な性格',
    'landing.welcome': 'ようこそ！',
    'landing.description': '豊かな人生経験をお持ちの皆様のための特別な性格診断テストでございます。\n24の簡単なご質問を通じて、あなた様独自のお人柄と知恵を発見していただけます。',
    'landing.start': '✨ テスト開始',
    'landing.starting': '開始中...',
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('ko');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 언어 감지 우선순위: URL 파라미터 > 쿠키 > localStorage > 브라우저 언어 > 기본값(ko)
    const detectLanguage = () => {
      // 1. URL 파라미터 확인
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang');
      
      if (langParam && ['ko', 'en', 'zh', 'ja'].includes(langParam)) {
        console.log('Language detected from URL:', langParam);
        return langParam;
      }

      // 2. 쿠키 확인
      const cookieLang = document.cookie
        .split('; ')
        .find(row => row.startsWith('language='))
        ?.split('=')[1];
      
      if (cookieLang && ['ko', 'en', 'zh', 'ja'].includes(cookieLang)) {
        console.log('Language detected from cookie:', cookieLang);
        return cookieLang;
      }

      // 3. localStorage 확인
      const savedLang = localStorage.getItem('language');
      if (savedLang && ['ko', 'en', 'zh', 'ja'].includes(savedLang)) {
        console.log('Language detected from localStorage:', savedLang);
        return savedLang;
      }

      // 4. 브라우저 언어 확인
      const browserLang = navigator.language.slice(0, 2);
      if (['ko', 'en', 'zh', 'ja'].includes(browserLang)) {
        console.log('Language detected from browser:', browserLang);
        return browserLang;
      }

      // 5. 기본값
      console.log('Using default language: ko');
      return 'ko';
    };

    const detectedLanguage = detectLanguage();
    setLanguageState(detectedLanguage);
    
    // 감지된 언어를 저장
    localStorage.setItem('language', detectedLanguage);
    
    // 쿠키에도 저장 (서버사이드와 동기화)
    document.cookie = `language=${detectedLanguage}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=lax`;
  }, []);

  // URL 변경 감지
  useEffect(() => {
    if (!mounted) return;

    const checkUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang');
      
      if (langParam && ['ko', 'en', 'zh', 'ja'].includes(langParam) && langParam !== language) {
        console.log('URL language changed to:', langParam);
        setLanguageState(langParam);
        localStorage.setItem('language', langParam);
      }
    };

    // 주기적으로 URL 확인
    const interval = setInterval(checkUrl, 100);

    return () => clearInterval(interval);
  }, [language, mounted]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // URL 업데이트
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.ko[key] || key;
  };

  if (!mounted) {
    // SSR 중에는 기본값 사용
    return (
      <LanguageContext.Provider value={{ language: 'ko', setLanguage: () => {}, t: (key) => translations.ko[key] || key }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}