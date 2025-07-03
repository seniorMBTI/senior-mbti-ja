'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(undefined);

// 완전한 번역 데이터
const translations = {
  ko: {
    // 공통
    'site.title': '시니어 MBTI',
    'site.subtitle': '당신만의 특별한 성격 유형을 찾아보세요',
    
    // 랜딩페이지
    'landing.title': '시니어 MBTI',
    'landing.tagline': '인생의 경험이 만든 당신만의 특별한 성격',
    'landing.welcome': '환영합니다!',
    'landing.description': '평생의 풍부한 경험을 쌓아오신 당신을 위한 특별한 성격 유형 테스트입니다.\\n24개의 간단한 질문을 통해 당신만의 독특한 성격과 지혜를 발견해보세요.',
    'landing.start': '✨ 테스트 시작하기',
    'landing.starting': '시작하는 중...',
    'landing.closing': '지금 바로 당신만의 성격 유형을 발견해보세요!',
    
    // Meta information
    'meta.title': '시니어 MBTI - 성격 유형 테스트',
    'meta.seo.title': '시니어 MBTI | 중장년 성격 유형 테스트 | 은퇴 후 인생 설계 가이드',
    
    // Trust indicators
    'trust.anonymous': '100% 익명',
    'trust.expert': '전문가 제작',
    'trust.quick': '2분 완성',
    
    // Hero section
    'hero.badge': '✨ 60대+ 시니어 전용 성격 분석',
    'hero.title': '시니어 MBTI 성격 유형 테스트',
    'hero.tagline': '은퇴 후 새로운 인생과 이상적인 인간관계를 위한 전문 심리 분석',
    'hero.description': '60대 이상 중장년층을 위해 특별히 설계된 MBTI 성격 유형 테스트로 내 성향과 가장 잘 맞는 동반자를 찾아보세요. 무료 심리 테스트를 통해 황금기 인생의 새로운 가능성을 발견하세요.',
    'hero.seo.hook.main': '🔍 내 MBTI를 확인하고 상성 관계의 MBTI를 찾아보세요!',
    'hero.seo.hook.sub': '앞으로 남은 인생 동안 나와 인연을 맺으며 함께 살아갈 성향이 잘 맞는 사람을 파악할 수 있어요! 시니어 라이프스타일에 최적화된 맞춤형 상성 분석을 제공합니다.',
    
    // Features 섹션
    'landing.time.title': '빠른 완성',
    'landing.time.desc': '단 2분만에 완료되는 간단하고 정확한 성격 유형 테스트',
    'landing.method.title': '과학적 방법',
    'landing.method.desc': '심리학 전문가들이 개발한 검증된 성격 분석 방법론',
    'landing.types.title': '16가지 유형',
    'landing.types.desc': '당신의 독특한 성격을 16가지 상세한 유형으로 분석',
    'landing.privacy.title': '완전 익명',
    'landing.privacy.desc': '개인정보 수집 없이 안전하게 진행되는 익명 테스트',
    
    'features.section.title': '시니어 MBTI가 중장년층에게 특별한 이유',
    'features.section.subtitle': '60대+ 은퇴 후 인생을 위한 전문적인 성격 분석과 라이프스타일 가이드',
    
    // SEO Benefits
    'seo.benefits.title': '시니어 맞춤 MBTI 테스트의 특별한 장점',
    'seo.benefits.item1.highlight': '중장년 심리 전문가',
    'seo.benefits.item1.text': '가 설계한 시니어 특화 질문',
    'seo.benefits.item2.highlight': '은퇴 후 인생 설계',
    'seo.benefits.item2.text': '를 위한 맞춤형 조언 제공',
    'seo.benefits.item3.highlight': '60대+ 인간관계',
    'seo.benefits.item3.text': ' 개선을 위한 상성 분석',
    'seo.benefits.item4.highlight': '황금기 라이프스타일',
    'seo.benefits.item4.text': '에 최적화된 성격 해석',
    'seo.benefits.item5.highlight': '시니어 건강 관리',
    'seo.benefits.item5.text': '와 연계된 생활 가이드',
    
    // MBTI Compatibility Showcase
    'compatibility.showcase.title': '💕 MBTI 상성 분석 미리보기',
    'compatibility.showcase.subtitle': '당신과 최고의 궁합인 MBTI와 상극인 MBTI를 미리 확인해보세요',
    
    'compatibility.best.title': '💖 최고의 궁합 예시',
    'compatibility.best.example': 'INTJ × ENFP 조합',
    'compatibility.best.reason': '체계적인 INTJ와 창의적인 ENFP는 서로의 장점을 보완하며 깊은 이해를 바탕으로 한 관계를 형성합니다.',
    
    'compatibility.challenging.title': '💛 이해가 필요한 예시',
    'compatibility.challenging.example': 'INTJ × ESFJ 조합',
    'compatibility.challenging.reason': '서로 다른 접근 방식을 가지지만, 상호 이해와 배려를 통해 균형 잡힌 관계를 만들어갈 수 있습니다.',
    
    'compatibility.perfect': '완벽한 조화',
    'compatibility.effort': '노력 필요',
    'compatibility.cta': '내 MBTI와 상성 확인하기',
    
    // MBTI Types
    'mbti.intj.name': '전략가',
    'mbti.intj.desc': '체계적 사고와 독립적 생활',
    'mbti.intj.trait1': '체계적 사고',
    'mbti.intj.trait2': '독립적',
    'mbti.intj.trait3': '장기 계획',
    
    'mbti.intp.name': '사색가',
    'mbti.intp.desc': '분석적 사고와 지적 호기심',
    'mbti.intp.trait1': '분석적',
    'mbti.intp.trait2': '호기심',
    'mbti.intp.trait3': '논리적',
    
    'mbti.entj.name': '통솔자',
    'mbti.entj.desc': '리더십과 도전 정신',
    'mbti.entj.trait1': '리더십',
    'mbti.entj.trait2': '도전적',
    'mbti.entj.trait3': '추진력',
    
    'mbti.entp.name': '발명가',
    'mbti.entp.desc': '창의성과 활발한 토론',
    'mbti.entp.trait1': '창의적',
    'mbti.entp.trait2': '토론 좋아함',
    'mbti.entp.trait3': '혁신적',
    
    'mbti.infj.name': '예언자',
    'mbti.infj.desc': '통찰력과 이상주의',
    'mbti.infj.trait1': '통찰력',
    'mbti.infj.trait2': '이상주의',
    'mbti.infj.trait3': '신중함',
    
    'mbti.infp.name': '중재자',
    'mbti.infp.desc': '가치 중심적 삶과 창의성',
    'mbti.infp.trait1': '가치 중심',
    'mbti.infp.trait2': '창의적',
    'mbti.infp.trait3': '개성 있음',
    
    'mbti.enfj.name': '선도자',
    'mbti.enfj.desc': '타인에 대한 배려와 리더십',
    'mbti.enfj.trait1': '배려심',
    'mbti.enfj.trait2': '영감을 줌',
    'mbti.enfj.trait3': '사교적',
    
    'mbti.enfp.name': '활동가',
    'mbti.enfp.desc': '열정적이고 사교적인 성격',
    'mbti.enfp.trait1': '열정적',
    'mbti.enfp.trait2': '사교적',
    'mbti.enfp.trait3': '낙관적',
    
    'mbti.istj.name': '관리자',
    'mbti.istj.desc': '책임감과 성실함',
    'mbti.istj.trait1': '책임감',
    'mbti.istj.trait2': '성실함',
    'mbti.istj.trait3': '신뢰할 수 있음',
    
    'mbti.isfj.name': '수호자',
    'mbti.isfj.desc': '돌봄과 배려의 정신',
    'mbti.isfj.trait1': '돌봄',
    'mbti.isfj.trait2': '세심함',
    'mbti.isfj.trait3': '온화함',
    
    'mbti.estj.name': '경영자',
    'mbti.estj.desc': '조직력과 실무 능력',
    'mbti.estj.trait1': '조직력',
    'mbti.estj.trait2': '현실적',
    'mbti.estj.trait3': '효율적',
    
    'mbti.esfj.name': '집정관',
    'mbti.esfj.desc': '사회적 조화와 협력',
    'mbti.esfj.trait1': '협력적',
    'mbti.esfj.trait2': '사회적',
    'mbti.esfj.trait3': '친근함',
    
    'mbti.istp.name': '장인',
    'mbti.istp.desc': '실용적 기술과 독립성',
    'mbti.istp.trait1': '실용적',
    'mbti.istp.trait2': '독립적',
    'mbti.istp.trait3': '문제 해결',
    
    'mbti.isfp.name': '모험가',
    'mbti.isfp.desc': '예술적 감성과 자유로움',
    'mbti.isfp.trait1': '예술적',
    'mbti.isfp.trait2': '자유로움',
    'mbti.isfp.trait3': '온순함',
    
    'mbti.estp.name': '사업가',
    'mbti.estp.desc': '활동적이고 현실적',
    'mbti.estp.trait1': '활동적',
    'mbti.estp.trait2': '현실적',
    'mbti.estp.trait3': '적응력',
    
    'mbti.esfp.name': '연예인',
    'mbti.esfp.desc': '즐거움과 사교성',
    'mbti.esfp.trait1': '즐거움',
    'mbti.esfp.trait2': '사교적',
    'mbti.esfp.trait3': '자발적',
    
    // FAQ Section
    'faq.section.title': '시니어 MBTI에 대한 자주 묻는 질문',
    'faq.section.subtitle': '60대+ 중장년층이 가장 궁금해하는 질문들을 정리했습니다',
    
    'faq.q1.question': '시니어 MBTI 테스트는 무료인가요?',
    'faq.q1.answer': '네, 시니어 MBTI 테스트는 완전 무료입니다. 회원가입이나 결제 없이 바로 테스트를 시작하실 수 있습니다.',
    
    'faq.q2.question': '일반 MBTI와 시니어 MBTI의 차이점은 무엇인가요?',
    'faq.q2.answer': '시니어 MBTI는 60대+ 중장년층의 인생 경험과 가치관을 반영하여 특별히 제작되었습니다. 은퇴 후 인생, 인간관계, 건강 관리 등 시니어 특화 조언을 제공합니다.',
    
    'faq.q3.question': '테스트는 얼마나 걸리나요?',
    'faq.q3.answer': '시니어 MBTI 테스트는 약 5분 정도 소요됩니다. 24개의 간단한 문항으로 구성되어 있어 부담 없이 완료하실 수 있습니다.',
    
    'faq.q4.question': '결과는 어떻게 활용할 수 있나요?',
    'faq.q4.answer': '결과는 은퇴 후 생활 설계, 취미 활동 선택, 인간관계 개선, 건강 관리 방법 등 시니어 라이프의 다양한 영역에서 활용하실 수 있습니다.',
    
    'faq.q5.question': '개인정보는 안전한가요?',
    'faq.q5.answer': '시니어 MBTI는 100% 익명으로 진행됩니다. 개인정보를 수집하지 않으며, 모든 데이터는 안전하게 보호됩니다.',
    
    // Internal Links
    'internal.links.title': '시니어 MBTI 가이드',
    'internal.links.subtitle': '더 자세한 정보와 가이드를 확인해보세요',
    
    'internal.compatibility.title': 'MBTI 상성 분석',
    'internal.compatibility.desc': '16가지 MBTI 유형별 상성과 인간관계 팁',
    
    'internal.careers.title': '시니어 적합 직업',
    'internal.careers.desc': 'MBTI 유형별 은퇴 후 추천 활동과 직업',
    
    'internal.health.title': '성격별 건강 관리',
    'internal.health.desc': 'MBTI 유형에 맞는 건강 관리와 생활 습관',
    
    'internal.relationships.title': '시니어 인간관계',
    'internal.relationships.desc': '가족, 친구, 동반자와의 관계 개선 방법',
    
    // Final CTA
    'final.cta.title': '지금 바로 시작하세요!',
    'final.cta.subtitle': '당신만의 특별한 성격 유형을 발견하고 더 나은 시니어 라이프를 설계해보세요',
    'final.cta.button': '무료 테스트 시작하기',
    'final.cta.note': '✓ 완전 무료 ✓ 2분 완성 ✓ 개인정보 불필요'
  },
  
  en: {
    // Common
    'site.title': 'Senior MBTI',
    'site.subtitle': 'Discover Your Unique Personality Type',
    
    // Landing page
    'landing.title': 'Senior MBTI',
    'landing.tagline': 'Your Unique Personality Shaped by Life Experience',
    'landing.welcome': 'Welcome!',
    'landing.description': 'A special personality type test designed for those who have accumulated rich life experiences.\\nDiscover your unique personality and wisdom through 24 simple questions.',
    'landing.start': '✨ Start Test',
    'landing.starting': 'Starting...',
    'landing.closing': 'Discover your personality type right now!',
    
    // Meta information
    'meta.title': 'Senior MBTI - Personality Type Test',
    'meta.seo.title': 'Senior MBTI | Personality Type Test for Middle-aged | Retirement Life Planning Guide',
    
    // Trust indicators
    'trust.anonymous': '100% Anonymous',
    'trust.expert': 'Expert Made',
    'trust.quick': '2 Min Test',
    
    // Hero section
    'hero.badge': '✨ Exclusive Personality Analysis for 60+ Seniors',
    'hero.title': 'Senior MBTI Personality Type Test',
    'hero.tagline': 'Professional psychological analysis for new life after retirement and ideal relationships',
    'hero.description': 'Find the perfect companion who matches your personality with this MBTI personality type test specially designed for middle-aged people over 60. Discover new possibilities for your golden years through free psychological testing.',
    'hero.seo.hook.main': '🔍 Check your MBTI and find compatible MBTI types!',
    'hero.seo.hook.sub': 'You can identify people who have compatible personalities and will live with you for the rest of your life! We provide customized compatibility analysis optimized for senior lifestyles.',
    
    // Features section
    'landing.time.title': 'Quick Completion',
    'landing.time.desc': 'Simple and accurate personality type test completed in just 2 minutes',
    'landing.method.title': 'Scientific Method',
    'landing.method.desc': 'Verified personality analysis methodology developed by psychology experts',
    'landing.types.title': '16 Types',
    'landing.types.desc': 'Analyze your unique personality into 16 detailed types',
    'landing.privacy.title': 'Completely Anonymous',
    'landing.privacy.desc': 'Anonymous test conducted safely without collecting personal information',
    
    'features.section.title': 'Why Senior MBTI is Special for Middle-aged People',
    'features.section.subtitle': 'Professional personality analysis and lifestyle guide for life after retirement at 60+',
    
    // SEO Benefits
    'seo.benefits.title': 'Special Advantages of Senior-Customized MBTI Test',
    'seo.benefits.item1.highlight': 'Middle-aged psychology expert',
    'seo.benefits.item1.text': ' designed senior-specific questions',
    'seo.benefits.item2.highlight': 'Post-retirement life planning',
    'seo.benefits.item2.text': ' customized advice',
    'seo.benefits.item3.highlight': '60+ relationships',
    'seo.benefits.item3.text': ' compatibility analysis for improvement',
    'seo.benefits.item4.highlight': 'Golden years lifestyle',
    'seo.benefits.item4.text': ' optimized personality interpretation',
    'seo.benefits.item5.highlight': 'Senior health management',
    'seo.benefits.item5.text': ' linked lifestyle guide',
    
    // MBTI Compatibility Showcase
    'compatibility.showcase.title': '💕 MBTI Compatibility Analysis Preview',
    'compatibility.showcase.subtitle': 'Check in advance the MBTI that is most compatible and incompatible with you',
    
    'compatibility.best.title': '💖 Perfect Match Example',
    'compatibility.best.example': 'INTJ × ENFP Combination',
    'compatibility.best.reason': 'Systematic INTJ and creative ENFP complement each other\'s strengths and form relationships based on deep understanding.',
    
    'compatibility.challenging.title': '💛 Understanding Required Example',
    'compatibility.challenging.example': 'INTJ × ESFJ Combination',
    'compatibility.challenging.reason': 'Although they have different approaches, they can create balanced relationships through mutual understanding and consideration.',
    
    'compatibility.perfect': 'Perfect Harmony',
    'compatibility.effort': 'Effort Required',
    'compatibility.cta': 'Check My MBTI Compatibility',
    
    // MBTI Types
    'mbti.intj.name': 'Strategist',
    'mbti.intj.desc': 'Systematic thinking and independent living',
    'mbti.intj.trait1': 'Systematic',
    'mbti.intj.trait2': 'Independent',
    'mbti.intj.trait3': 'Long-term planning',
    
    'mbti.intp.name': 'Thinker',
    'mbti.intp.desc': 'Analytical thinking and intellectual curiosity',
    'mbti.intp.trait1': 'Analytical',
    'mbti.intp.trait2': 'Curious',
    'mbti.intp.trait3': 'Logical',
    
    'mbti.entj.name': 'Commander',
    'mbti.entj.desc': 'Leadership and challenging spirit',
    'mbti.entj.trait1': 'Leadership',
    'mbti.entj.trait2': 'Challenging',
    'mbti.entj.trait3': 'Driving force',
    
    'mbti.entp.name': 'Inventor',
    'mbti.entp.desc': 'Creativity and active discussion',
    'mbti.entp.trait1': 'Creative',
    'mbti.entp.trait2': 'Loves debate',
    'mbti.entp.trait3': 'Innovative',
    
    'mbti.infj.name': 'Prophet',
    'mbti.infj.desc': 'Insight and idealism',
    'mbti.infj.trait1': 'Insightful',
    'mbti.infj.trait2': 'Idealistic',
    'mbti.infj.trait3': 'Careful',
    
    'mbti.infp.name': 'Mediator',
    'mbti.infp.desc': 'Value-centered life and creativity',
    'mbti.infp.trait1': 'Value-centered',
    'mbti.infp.trait2': 'Creative',
    'mbti.infp.trait3': 'Unique',
    
    'mbti.enfj.name': 'Leader',
    'mbti.enfj.desc': 'Consideration for others and leadership',
    'mbti.enfj.trait1': 'Considerate',
    'mbti.enfj.trait2': 'Inspiring',
    'mbti.enfj.trait3': 'Social',
    
    'mbti.enfp.name': 'Activist',
    'mbti.enfp.desc': 'Passionate and social personality',
    'mbti.enfp.trait1': 'Passionate',
    'mbti.enfp.trait2': 'Social',
    'mbti.enfp.trait3': 'Optimistic',
    
    'mbti.istj.name': 'Administrator',
    'mbti.istj.desc': 'Responsibility and sincerity',
    'mbti.istj.trait1': 'Responsible',
    'mbti.istj.trait2': 'Sincere',
    'mbti.istj.trait3': 'Reliable',
    
    'mbti.isfj.name': 'Guardian',
    'mbti.isfj.desc': 'Spirit of care and consideration',
    'mbti.isfj.trait1': 'Caring',
    'mbti.isfj.trait2': 'Detailed',
    'mbti.isfj.trait3': 'Gentle',
    
    'mbti.estj.name': 'Manager',
    'mbti.estj.desc': 'Organization and practical ability',
    'mbti.estj.trait1': 'Organized',
    'mbti.estj.trait2': 'Realistic',
    'mbti.estj.trait3': 'Efficient',
    
    'mbti.esfj.name': 'Consul',
    'mbti.esfj.desc': 'Social harmony and cooperation',
    'mbti.esfj.trait1': 'Cooperative',
    'mbti.esfj.trait2': 'Social',
    'mbti.esfj.trait3': 'Friendly',
    
    'mbti.istp.name': 'Craftsman',
    'mbti.istp.desc': 'Practical skills and independence',
    'mbti.istp.trait1': 'Practical',
    'mbti.istp.trait2': 'Independent',
    'mbti.istp.trait3': 'Problem-solving',
    
    'mbti.isfp.name': 'Adventurer',
    'mbti.isfp.desc': 'Artistic sensibility and freedom',
    'mbti.isfp.trait1': 'Artistic',
    'mbti.isfp.trait2': 'Free',
    'mbti.isfp.trait3': 'Gentle',
    
    'mbti.estp.name': 'Entrepreneur',
    'mbti.estp.desc': 'Active and realistic',
    'mbti.estp.trait1': 'Active',
    'mbti.estp.trait2': 'Realistic',
    'mbti.estp.trait3': 'Adaptable',
    
    'mbti.esfp.name': 'Entertainer',
    'mbti.esfp.desc': 'Fun and sociability',
    'mbti.esfp.trait1': 'Fun',
    'mbti.esfp.trait2': 'Social',
    'mbti.esfp.trait3': 'Spontaneous',
    
    // FAQ Section
    'faq.section.title': 'Frequently Asked Questions about Senior MBTI',
    'faq.section.subtitle': 'We have compiled the most curious questions from middle-aged people over 60',
    
    'faq.q1.question': 'Is the Senior MBTI test free?',
    'faq.q1.answer': 'Yes, the Senior MBTI test is completely free. You can start the test immediately without registration or payment.',
    
    'faq.q2.question': 'What is the difference between regular MBTI and Senior MBTI?',
    'faq.q2.answer': 'Senior MBTI is specially created to reflect the life experiences and values of middle-aged people over 60. It provides senior-specific advice on post-retirement life, relationships, health management, etc.',
    
    'faq.q3.question': 'How long does the test take?',
    'faq.q3.answer': 'The Senior MBTI test takes about 5 minutes. It consists of 24 simple questions that you can complete without burden.',
    
    'faq.q4.question': 'How can I use the results?',
    'faq.q4.answer': 'The results can be used in various areas of senior life such as post-retirement life planning, hobby activity selection, relationship improvement, and health management methods.',
    
    'faq.q5.question': 'Is personal information safe?',
    'faq.q5.answer': 'Senior MBTI is conducted 100% anonymously. We do not collect personal information and all data is safely protected.',
    
    // Internal Links
    'internal.links.title': 'Senior MBTI Guide',
    'internal.links.subtitle': 'Check out more detailed information and guides',
    
    'internal.compatibility.title': 'MBTI Compatibility Analysis',
    'internal.compatibility.desc': 'Compatibility and relationship tips for 16 MBTI types',
    
    'internal.careers.title': 'Senior-Suitable Careers',
    'internal.careers.desc': 'Recommended activities and careers after retirement by MBTI type',
    
    'internal.health.title': 'Personality-Based Health Management',
    'internal.health.desc': 'Health management and lifestyle habits suitable for MBTI types',
    
    'internal.relationships.title': 'Senior Relationships',
    'internal.relationships.desc': 'Ways to improve relationships with family, friends, and partners',
    
    // Final CTA
    'final.cta.title': 'Start Right Now!',
    'final.cta.subtitle': 'Discover your unique personality type and design a better senior life',
    'final.cta.button': 'Start Free Test',
    'final.cta.note': '✓ Completely Free ✓ 2 Min Completion ✓ No Personal Info Required'
  },
  
  zh: {
    // 공통
    'site.title': '银发族MBTI',
    'site.subtitle': '发现您独特的性格类型',
    
    // 랜딩페이지
    'landing.title': '银发族MBTI',
    'landing.tagline': '人生阅历铸就的独特性格',
    'landing.welcome': '欢迎您!',
    'landing.description': '专为积累了丰富人生阅历的您设计的特殊性格类型测试。\\n通过24个简单问题，发现您独特的性格和智慧。',
    'landing.start': '✨ 开始测试',
    'landing.starting': '正在开始...',
    'landing.closing': '立即发现您的性格类型！',
    
    // Meta information
    'meta.title': '银发族MBTI - 性格类型测试',
    'meta.seo.title': '银发族MBTI | 中老年性格类型测试 | 退休生活规划指南',
    
    // Trust indicators
    'trust.anonymous': '100% 匿名',
    'trust.expert': '专家制作',
    'trust.quick': '2分钟完成',
    
    // Hero section
    'hero.badge': '✨ 60岁以上银发族专用性格分析',
    'hero.title': '银发族MBTI性格类型测试',
    'hero.tagline': '为退休后新生活和理想人际关系提供专业心理分析',
    'hero.description': '专为60岁以上中老年人设计的MBTI性格类型测试，帮您找到最匹配的人生伴侣。通过免费心理测试，发现黄金年华的新可能性。',
    'hero.seo.hook.main': '🔍 确认我的MBTI，找到相配的MBTI类型！',
    'hero.seo.hook.sub': '您可以了解在余生中与您结缘、性格相投的人！我们提供针对银发族生活方式优化的定制化相性分析。',
    
    // Features 섹션
    'landing.time.title': '快速完成',
    'landing.time.desc': '仅需2分钟即可完成的简单准确性格类型测试',
    'landing.method.title': '科学方法',
    'landing.method.desc': '心理学专家开发的经过验证的性格分析方法论',
    'landing.types.title': '16种类型',
    'landing.types.desc': '将您的独特性格分析为16种详细类型',
    'landing.privacy.title': '完全匿名',
    'landing.privacy.desc': '不收集个人信息的安全匿名测试',
    
    'features.section.title': '银发族MBTI对中老年人的特殊意义',
    'features.section.subtitle': '为60岁以上退休生活提供专业性格分析和生活方式指导',
    
    // SEO Benefits
    'seo.benefits.title': '银发族定制MBTI测试的特殊优势',
    'seo.benefits.item1.highlight': '中老年心理专家',
    'seo.benefits.item1.text': '设计的银发族专属问题',
    'seo.benefits.item2.highlight': '退休后人生规划',
    'seo.benefits.item2.text': '定制化建议',
    'seo.benefits.item3.highlight': '60岁以上人际关系',
    'seo.benefits.item3.text': '改善相性分析',
    'seo.benefits.item4.highlight': '黄金年华生活方式',
    'seo.benefits.item4.text': '优化的性格解释',
    'seo.benefits.item5.highlight': '银发族健康管理',
    'seo.benefits.item5.text': '相关生活指导',
    
    // MBTI Compatibility Showcase
    'compatibility.showcase.title': '💕 MBTI相性分析预览',
    'compatibility.showcase.subtitle': '提前确认与您最配和最不配的MBTI类型',
    
    'compatibility.best.title': '💖 最佳配对示例',
    'compatibility.best.example': 'INTJ × ENFP 组合',
    'compatibility.best.reason': '系统性的INTJ和创造性的ENFP互补优势，建立基于深度理解的关系。',
    
    'compatibility.challenging.title': '💛 需要理解的示例',
    'compatibility.challenging.example': 'INTJ × ESFJ 组合',
    'compatibility.challenging.reason': '虽然有不同的方法，但通过相互理解和关怀可以建立平衡的关系。',
    
    'compatibility.perfect': '完美和谐',
    'compatibility.effort': '需要努力',
    'compatibility.cta': '确认我的MBTI相性',
    
    // MBTI Types
    'mbti.intj.name': '策略家',
    'mbti.intj.desc': '系统思维和独立生活',
    'mbti.intj.trait1': '系统性',
    'mbti.intj.trait2': '独立',
    'mbti.intj.trait3': '长期规划',
    
    'mbti.intp.name': '思考者',
    'mbti.intp.desc': '分析思维和求知欲',
    'mbti.intp.trait1': '分析性',
    'mbti.intp.trait2': '好奇',
    'mbti.intp.trait3': '逻辑性',
    
    'mbti.entj.name': '指挥官',
    'mbti.entj.desc': '领导力和挑战精神',
    'mbti.entj.trait1': '领导力',
    'mbti.entj.trait2': '挑战性',
    'mbti.entj.trait3': '推动力',
    
    'mbti.entp.name': '发明家',
    'mbti.entp.desc': '创造力和活跃讨论',
    'mbti.entp.trait1': '创造性',
    'mbti.entp.trait2': '喜欢辩论',
    'mbti.entp.trait3': '创新性',
    
    'mbti.infj.name': '预言家',
    'mbti.infj.desc': '洞察力和理想主义',
    'mbti.infj.trait1': '洞察力',
    'mbti.infj.trait2': '理想主义',
    'mbti.infj.trait3': '慎重',
    
    'mbti.infp.name': '调解者',
    'mbti.infp.desc': '以价值为中心的生活和创造力',
    'mbti.infp.trait1': '价值中心',
    'mbti.infp.trait2': '创造性',
    'mbti.infp.trait3': '个性',
    
    'mbti.enfj.name': '引导者',
    'mbti.enfj.desc': '对他人的关怀和领导力',
    'mbti.enfj.trait1': '关怀',
    'mbti.enfj.trait2': '启发',
    'mbti.enfj.trait3': '社交',
    
    'mbti.enfp.name': '活动家',
    'mbti.enfp.desc': '热情和社交性格',
    'mbti.enfp.trait1': '热情',
    'mbti.enfp.trait2': '社交',
    'mbti.enfp.trait3': '乐观',
    
    'mbti.istj.name': '管理者',
    'mbti.istj.desc': '责任感和诚实',
    'mbti.istj.trait1': '责任感',
    'mbti.istj.trait2': '诚实',
    'mbti.istj.trait3': '可靠',
    
    'mbti.isfj.name': '守护者',
    'mbti.isfj.desc': '关怀和体贴精神',
    'mbti.isfj.trait1': '关怀',
    'mbti.isfj.trait2': '细心',
    'mbti.isfj.trait3': '温和',
    
    'mbti.estj.name': '经理',
    'mbti.estj.desc': '组织力和实务能力',
    'mbti.estj.trait1': '组织力',
    'mbti.estj.trait2': '现实',
    'mbti.estj.trait3': '高效',
    
    'mbti.esfj.name': '执政官',
    'mbti.esfj.desc': '社会和谐与合作',
    'mbti.esfj.trait1': '合作',
    'mbti.esfj.trait2': '社交',
    'mbti.esfj.trait3': '友善',
    
    'mbti.istp.name': '工匠',
    'mbti.istp.desc': '实用技能和独立性',
    'mbti.istp.trait1': '实用',
    'mbti.istp.trait2': '独立',
    'mbti.istp.trait3': '解决问题',
    
    'mbti.isfp.name': '冒险家',
    'mbti.isfp.desc': '艺术感性和自由',
    'mbti.isfp.trait1': '艺术性',
    'mbti.isfp.trait2': '自由',
    'mbti.isfp.trait3': '温顺',
    
    'mbti.estp.name': '企业家',
    'mbti.estp.desc': '活跃和现实',
    'mbti.estp.trait1': '活跃',
    'mbti.estp.trait2': '现实',
    'mbti.estp.trait3': '适应力',
    
    'mbti.esfp.name': '表演者',
    'mbti.esfp.desc': '快乐和社交性',
    'mbti.esfp.trait1': '快乐',
    'mbti.esfp.trait2': '社交',
    'mbti.esfp.trait3': '自发',
    
    // FAQ Section
    'faq.section.title': '银发族MBTI常见问题',
    'faq.section.subtitle': '整理了60岁以上中老年人最好奇的问题',
    
    'faq.q1.question': '银发族MBTI测试免费吗？',
    'faq.q1.answer': '是的，银发族MBTI测试完全免费。无需注册或付费即可立即开始测试。',
    
    'faq.q2.question': '普通MBTI和银发族MBTI有什么区别？',
    'faq.q2.answer': '银发族MBTI专门反映60岁以上中老年人的人生经历和价值观。提供退休后生活、人际关系、健康管理等银发族专属建议。',
    
    'faq.q3.question': '测试需要多长时间？',
    'faq.q3.answer': '银发族MBTI测试大约需要5分钟。由24个简单问题组成，您可以轻松完成。',
    
    'faq.q4.question': '结果如何使用？',
    'faq.q4.answer': '结果可用于银发族生活的各个领域，如退休后生活规划、兴趣活动选择、人际关系改善、健康管理方法等。',
    
    'faq.q5.question': '个人信息安全吗？',
    'faq.q5.answer': '银发族MBTI 100%匿名进行。不收集个人信息，所有数据都得到安全保护。',
    
    // Internal Links
    'internal.links.title': '银发族MBTI指南',
    'internal.links.subtitle': '查看更详细的信息和指南',
    
    'internal.compatibility.title': 'MBTI相性分析',
    'internal.compatibility.desc': '16种MBTI类型的相性和人际关系技巧',
    
    'internal.careers.title': '银发族适合职业',
    'internal.careers.desc': '按MBTI类型推荐的退休后活动和职业',
    
    'internal.health.title': '性格别健康管理',
    'internal.health.desc': '适合MBTI类型的健康管理和生活习惯',
    
    'internal.relationships.title': '银发族人际关系',
    'internal.relationships.desc': '改善与家人、朋友、伴侣关系的方法',
    
    // Final CTA
    'final.cta.title': '立即开始！',
    'final.cta.subtitle': '发现您独特的性格类型，设计更好的银发族生活',
    'final.cta.button': '开始免费测试',
    'final.cta.note': '✓ 完全免费 ✓ 2分钟完成 ✓ 无需个人信息'
  },
  
  ja: {
    // 공통
    'site.title': 'シニアMBTI',
    'site.subtitle': 'あなた独自の性格タイプを発見',
    
    // 랜딩페이지
    'landing.title': 'シニアMBTI',
    'landing.tagline': '人生経験が作り上げたあなた独自の性格',
    'landing.welcome': 'いらっしゃいませ！',
    'landing.description': '豊富な人生経験を積まれたあなたのための特別な性格タイプテストです。\\n24の簡単な質問を通じて、あなただけの独特な性格と知恵を発見してください。',
    'landing.start': '✨ テスト開始',
    'landing.starting': '開始中...',
    'landing.closing': '今すぐあなたの性格タイプを発見してください！',
    
    // Meta information
    'meta.title': 'シニアMBTI - 性格タイプテスト',
    'meta.seo.title': 'シニアMBTI | 中高年性格タイプテスト | 退職後人生設計ガイド',
    
    // Trust indicators
    'trust.anonymous': '100% 匿名',
    'trust.expert': '専門家制作',
    'trust.quick': '2分で完了',
    
    // Hero section
    'hero.badge': '✨ 60歳以上シニア専用性格分析',
    'hero.title': 'シニアMBTI性格タイプテスト',
    'hero.tagline': '退職後の新しい人生と理想的な人間関係のための専門心理分析',
    'hero.description': '60歳以上の中高年のために特別に設計されたMBTI性格タイプテストで、あなたの性向に最も合うパートナーを見つけてください。無料心理テストを通じて黄金期人生の新しい可能性を発見してください。',
    'hero.seo.hook.main': '🔍 私のMBTIを確認し、相性の良いMBTIを見つけてください！',
    'hero.seo.hook.sub': 'これから残りの人生で縁を結び、一緒に生きていく性格の合う人を把握できます！シニアライフスタイルに最適化されたカスタマイズ相性分析を提供します。',
    
    // Features 섹션
    'landing.time.title': '迅速完成',
    'landing.time.desc': 'わずか2分で完了する簡単で正確な性格タイプテスト',
    'landing.method.title': '科学的方法',
    'landing.method.desc': '心理学専門家が開発した検証済み性格分析方法論',
    'landing.types.title': '16種類のタイプ',
    'landing.types.desc': 'あなたの独特な性格を16の詳細なタイプで分析',
    'landing.privacy.title': '完全匿名',
    'landing.privacy.desc': '個人情報収集なしで安全に進行される匿名テスト',
    
    'features.section.title': 'シニアMBTIが中高年に特別な理由',
    'features.section.subtitle': '60歳以上退職後人生のための専門的性格分析とライフスタイルガイド',
    
    // SEO Benefits
    'seo.benefits.title': 'シニアカスタマイズMBTIテストの特別な利点',
    'seo.benefits.item1.highlight': '中高年心理専門家',
    'seo.benefits.item1.text': 'が設計したシニア特化質問',
    'seo.benefits.item2.highlight': '退職後人生設計',
    'seo.benefits.item2.text': 'のためのカスタマイズアドバイス',
    'seo.benefits.item3.highlight': '60歳以上人間関係',
    'seo.benefits.item3.text': '改善のための相性分析',
    'seo.benefits.item4.highlight': '黄金期ライフスタイル',
    'seo.benefits.item4.text': 'に最適化された性格解釈',
    'seo.benefits.item5.highlight': 'シニア健康管理',
    'seo.benefits.item5.text': 'と連携した生活ガイド',
    
    // MBTI Compatibility Showcase
    'compatibility.showcase.title': '💕 MBTI相性分析プレビュー',
    'compatibility.showcase.subtitle': 'あなたと最高の相性と相性の悪いMBTIを事前に確認してください',
    
    'compatibility.best.title': '💖 最高の相性例',
    'compatibility.best.example': 'INTJ × ENFP 組み合わせ',
    'compatibility.best.reason': '体系的なINTJと創造的なENFPはお互いの長所を補完し、深い理解に基づいた関係を形成します。',
    
    'compatibility.challenging.title': '💛 理解が必要な例',
    'compatibility.challenging.example': 'INTJ × ESFJ 組み合わせ',
    'compatibility.challenging.reason': '異なるアプローチを持ちますが、相互理解と配慮を通じてバランスの取れた関係を築くことができます。',
    
    'compatibility.perfect': '完璧な調和',
    'compatibility.effort': '努力が必要',
    'compatibility.cta': '私のMBTI相性を確認',
    
    // MBTI Types
    'mbti.intj.name': '戦略家',
    'mbti.intj.desc': '体系的思考と独立的生活',
    'mbti.intj.trait1': '体系的',
    'mbti.intj.trait2': '独立的',
    'mbti.intj.trait3': '長期計画',
    
    'mbti.intp.name': '思想家',
    'mbti.intp.desc': '分析的思考と知的好奇心',
    'mbti.intp.trait1': '分析的',
    'mbti.intp.trait2': '好奇心',
    'mbti.intp.trait3': '論理的',
    
    'mbti.entj.name': '統率者',
    'mbti.entj.desc': 'リーダーシップと挑戦精神',
    'mbti.entj.trait1': 'リーダーシップ',
    'mbti.entj.trait2': '挑戦的',
    'mbti.entj.trait3': '推進力',
    
    'mbti.entp.name': '発明家',
    'mbti.entp.desc': '創造性と活発な議論',
    'mbti.entp.trait1': '創造的',
    'mbti.entp.trait2': '議論好き',
    'mbti.entp.trait3': '革新的',
    
    'mbti.infj.name': '預言者',
    'mbti.infj.desc': '洞察力と理想主義',
    'mbti.infj.trait1': '洞察力',
    'mbti.infj.trait2': '理想主義',
    'mbti.infj.trait3': '慎重',
    
    'mbti.infp.name': '仲裁者',
    'mbti.infp.desc': '価値中心的生活と創造性',
    'mbti.infp.trait1': '価値中心',
    'mbti.infp.trait2': '創造的',
    'mbti.infp.trait3': '個性的',
    
    'mbti.enfj.name': '先導者',
    'mbti.enfj.desc': '他人への配慮とリーダーシップ',
    'mbti.enfj.trait1': '配慮',
    'mbti.enfj.trait2': 'インスピレーション',
    'mbti.enfj.trait3': '社交的',
    
    'mbti.enfp.name': '活動家',
    'mbti.enfp.desc': '情熱的で社交的な性格',
    'mbti.enfp.trait1': '情熱的',
    'mbti.enfp.trait2': '社交的',
    'mbti.enfp.trait3': '楽観的',
    
    'mbti.istj.name': '管理者',
    'mbti.istj.desc': '責任感と誠実さ',
    'mbti.istj.trait1': '責任感',
    'mbti.istj.trait2': '誠実',
    'mbti.istj.trait3': '信頼できる',
    
    'mbti.isfj.name': '守護者',
    'mbti.isfj.desc': 'ケアと配慮の精神',
    'mbti.isfj.trait1': 'ケア',
    'mbti.isfj.trait2': '細やか',
    'mbti.isfj.trait3': '穏やか',
    
    'mbti.estj.name': '経営者',
    'mbti.estj.desc': '組織力と実務能力',
    'mbti.estj.trait1': '組織力',
    'mbti.estj.trait2': '現実的',
    'mbti.estj.trait3': '効率的',
    
    'mbti.esfj.name': '執政官',
    'mbti.esfj.desc': '社会的調和と協力',
    'mbti.esfj.trait1': '協力的',
    'mbti.esfj.trait2': '社会的',
    'mbti.esfj.trait3': '親しみやすい',
    
    'mbti.istp.name': '職人',
    'mbti.istp.desc': '実用的技術と独立性',
    'mbti.istp.trait1': '実用的',
    'mbti.istp.trait2': '独立的',
    'mbti.istp.trait3': '問題解決',
    
    'mbti.isfp.name': '冒険家',
    'mbti.isfp.desc': '芸術的感性と自由',
    'mbti.isfp.trait1': '芸術的',
    'mbti.isfp.trait2': '自由',
    'mbti.isfp.trait3': '穏やか',
    
    'mbti.estp.name': '事業家',
    'mbti.estp.desc': '活動的で現実的',
    'mbti.estp.trait1': '活動的',
    'mbti.estp.trait2': '現実的',
    'mbti.estp.trait3': '適応力',
    
    'mbti.esfp.name': 'エンターテイナー',
    'mbti.esfp.desc': '楽しさと社交性',
    'mbti.esfp.trait1': '楽しい',
    'mbti.esfp.trait2': '社交的',
    'mbti.esfp.trait3': '自発的',
    
    // FAQ Section
    'faq.section.title': 'シニアMBTIについてよくある質問',
    'faq.section.subtitle': '60歳以上の中高年が最も気になる質問をまとめました',
    
    'faq.q1.question': 'シニアMBTIテストは無料ですか？',
    'faq.q1.answer': 'はい、シニアMBTIテストは完全無料です。会員登録や支払いなしですぐにテストを始められます。',
    
    'faq.q2.question': '一般MBTIとシニアMBTIの違いは何ですか？',
    'faq.q2.answer': 'シニアMBTIは60歳以上中高年の人生経験と価値観を反映して特別に制作されました。退職後人生、人間関係、健康管理などシニア特化アドバイスを提供します。',
    
    'faq.q3.question': 'テストはどのくらいかかりますか？',
    'faq.q3.answer': 'シニアMBTIテストは約5分程度かかります。24の簡単な質問で構成されており、負担なく完了できます。',
    
    'faq.q4.question': '結果はどのように活用できますか？',
    'faq.q4.answer': '結果は退職後生活設計、趣味活動選択、人間関係改善、健康管理方法などシニアライフの様々な領域で活用できます。',
    
    'faq.q5.question': '個人情報は安全ですか？',
    'faq.q5.answer': 'シニアMBTIは100%匿名で進行されます。個人情報を収集せず、すべてのデータは安全に保護されます。',
    
    // Internal Links
    'internal.links.title': 'シニアMBTIガイド',
    'internal.links.subtitle': 'より詳細な情報とガイドを確認してください',
    
    'internal.compatibility.title': 'MBTI相性分析',
    'internal.compatibility.desc': '16のMBTIタイプ別相性と人間関係のコツ',
    
    'internal.careers.title': 'シニア適合職業',
    'internal.careers.desc': 'MBTIタイプ別退職後推奨活動と職業',
    
    'internal.health.title': '性格別健康管理',
    'internal.health.desc': 'MBTIタイプに合った健康管理と生活習慣',
    
    'internal.relationships.title': 'シニア人間関係',
    'internal.relationships.desc': '家族、友人、パートナーとの関係改善方法',
    
    // Final CTA
    'final.cta.title': '今すぐ始めてください！',
    'final.cta.subtitle': 'あなただけの特別な性格タイプを発見し、より良いシニアライフを設計してください',
    'final.cta.button': '無料テスト開始',
    'final.cta.note': '✓ 完全無料 ✓ 2分完成 ✓ 個人情報不要'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ja');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 브라우저에서 저장된 언어 설정 로드
    const savedLanguage = localStorage.getItem('mbti-language') || 'ja';
    setLanguage(savedLanguage);
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('mbti-language', newLanguage);
  };

  const t = (key) => {
    if (!mounted) return '';
    return translations[language]?.[key] || translations['ja'][key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    mounted
  };

  return (
    <LanguageContext.Provider value={value}>
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