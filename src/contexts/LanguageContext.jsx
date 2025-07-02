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
    'landing.closing': '지금 바로 당신만의 성격 유형을 발견해보세요!',
    
    // Features 섹션
    'landing.time.title': '빠른 완성',
    'landing.time.desc': '단 2분만에 완료되는 간단하고 정확한 성격 유형 테스트',
    'landing.method.title': '과학적 방법',
    'landing.method.desc': '심리학 전문가들이 개발한 검증된 성격 분석 방법론',
    'landing.types.title': '16가지 유형',
    'landing.types.desc': '당신의 독특한 성격을 16가지 상세한 유형으로 분석',
    'landing.privacy.title': '완전 익명',
    'landing.privacy.desc': '개인정보 수집 없이 안전하게 진행되는 익명 테스트',
    
    // 샘플 질문 섹션
    'landing.questions.title': '테스트 미리보기',
    'landing.questions.example': '예시 질문',
    'landing.questions.sample': '새로운 사람들과의 모임에서 당신은 어떤 편인가요?',
    'landing.questions.choice1': '먼저 다가가서 대화를 시작하는 편입니다',
    'landing.questions.choice2': '누군가 먼저 말을 걸어올 때까지 기다리는 편입니다',
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
    'landing.closing': 'Discover your unique personality type right now!',
    
    // Features 섹션
    'landing.time.title': 'Quick Completion',
    'landing.time.desc': 'Complete this simple and accurate personality test in just 2 minutes',
    'landing.method.title': 'Scientific Method',
    'landing.method.desc': 'Validated personality analysis methodology developed by psychology experts',
    'landing.types.title': '16 Types',
    'landing.types.desc': 'Analyze your unique personality through 16 detailed types',
    'landing.privacy.title': 'Completely Anonymous',
    'landing.privacy.desc': 'Safe anonymous test conducted without collecting personal information',
    
    // 샘플 질문 섹션
    'landing.questions.title': 'Test Preview',
    'landing.questions.example': 'Sample Question',
    'landing.questions.sample': 'At a gathering with new people, which are you more likely to do?',
    'landing.questions.choice1': 'Approach first and start conversations',
    'landing.questions.choice2': 'Wait for someone else to initiate conversation',
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
    'landing.closing': '立即发现您独特的性格类型！',
    
    // Features 섹션
    'landing.time.title': '快速完成',
    'landing.time.desc': '仅需2分钟即可完成的简单而准确的性格类型测试',
    'landing.method.title': '科学方法',
    'landing.method.desc': '由心理学专家开发的经过验证的性格分析方法论',
    'landing.types.title': '16种类型',
    'landing.types.desc': '通过16种详细类型分析您独特的性格',
    'landing.privacy.title': '完全匿名',
    'landing.privacy.desc': '无需收集个人信息的安全匿名测试',
    
    // 샘플 질문 섹션
    'landing.questions.title': '测试预览',
    'landing.questions.example': '示例问题',
    'landing.questions.sample': '在与新朋友的聚会上，您更倾向于：',
    'landing.questions.choice1': '主动接近并开始对话',
    'landing.questions.choice2': '等待别人先开口交谈',
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
    'landing.closing': '今すぐあなた独自の性格タイプを発見してみましょう！',
    
    // Features 섹션
    'landing.time.title': '短時間で完成',
    'landing.time.desc': 'わずか2分で完了する簡単で正確な性格タイプテスト',
    'landing.method.title': '科学的手法',
    'landing.method.desc': '心理学の専門家が開発した検証済みの性格分析手法',
    'landing.types.title': '16のタイプ',
    'landing.types.desc': 'あなた様独自のお人柄を16の詳細なタイプで分析',
    'landing.privacy.title': '完全匿名',
    'landing.privacy.desc': '個人情報を収集しない安全な匿名テスト',
    
    // 샘플 질문 섹션
    'landing.questions.title': 'テストプレビュー',
    'landing.questions.example': '例題',
    'landing.questions.sample': '新しい方々との集まりで、あなた様はどちらの傾向がございますか？',
    'landing.questions.choice1': 'まず近づいて会話を始める方です',
    'landing.questions.choice2': 'どなたかが先にお声をかけてくださるまでお待ちする方です',
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('ja');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 언어 감지 우선순위: URL 파라미터 > 쿠키 > localStorage > 브라우저 언어 > 기본값(en)
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

      // 5. 기본값 (일본어 사이트는 ja)
      console.log('Using default language: ja');
      return 'ja';
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
    return translations[language]?.[key] || translations.ja[key] || key;
  };

  if (!mounted) {
    // SSR 중에는 기본값 사용
    return (
      <LanguageContext.Provider value={{ language: 'ja', setLanguage: () => {}, t: (key) => translations.ja[key] || key }}>
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