import { ImageResponse } from 'next/og';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'landing';
    const lang = searchParams.get('lang') || 'ko';
    const mbti = searchParams.get('mbti') || 'INTJ';

    // 언어별 컨텐츠
    const content = {
      ko: {
        title: '시니어 MBTI',
        subtitle: '60세 이상 맞춤형 성격 유형 테스트',
        description1: '당신의 성격 유형을 발견하고',
        description2: '더 나은 노후를 설계하세요',
        button: '무료 테스트 시작하기',
        result: '결과'
      },
      en: {
        title: 'Senior MBTI',
        subtitle: 'Personality Test for Ages 60+',
        description1: 'Discover your personality type',
        description2: 'and design a better retirement',
        button: 'Start Free Test',
        result: 'Result'
      },
      zh: {
        title: '银发族MBTI',
        subtitle: '60岁以上专属性格测试',
        description1: '发现您的性格类型',
        description2: '设计更美好的晚年生活',
        button: '开始免费测试',
        result: '结果'
      },
      ja: {
        title: 'シニアMBTI',
        subtitle: '60歳以上向け性格診断テスト',
        description1: 'あなたの性格タイプを発見し',
        description2: 'より良い老後を設計しましょう',
        button: '無料テストを始める',
        result: '結果'
      }
    };

    const langContent = content[lang] || content.ko;
    
    // MBTI 유형별 이름
    const mbtiNames = {
      ko: {
        'INTJ': '건축가', 'INTP': '논리술사', 'ENTJ': '통솔자', 'ENTP': '토론가',
        'INFJ': '옹호자', 'INFP': '중재자', 'ENFJ': '선도자', 'ENFP': '활동가',
        'ISTJ': '현실주의자', 'ISFJ': '수호자', 'ESTJ': '경영자', 'ESFJ': '집정관',
        'ISTP': '만능재주꾼', 'ISFP': '모험가', 'ESTP': '사업가', 'ESFP': '연예인'
      },
      en: {
        'INTJ': 'Architect', 'INTP': 'Thinker', 'ENTJ': 'Commander', 'ENTP': 'Debater',
        'INFJ': 'Advocate', 'INFP': 'Mediator', 'ENFJ': 'Protagonist', 'ENFP': 'Campaigner',
        'ISTJ': 'Logistician', 'ISFJ': 'Protector', 'ESTJ': 'Executive', 'ESFJ': 'Consul',
        'ISTP': 'Virtuoso', 'ISFP': 'Adventurer', 'ESTP': 'Entrepreneur', 'ESFP': 'Entertainer'
      },
      zh: {
        'INTJ': '建筑师', 'INTP': '逻辑学家', 'ENTJ': '指挥官', 'ENTP': '辩论家',
        'INFJ': '提倡者', 'INFP': '调停者', 'ENFJ': '主人公', 'ENFP': '竞选者',
        'ISTJ': '物流师', 'ISFJ': '守护者', 'ESTJ': '总经理', 'ESFJ': '执政官',
        'ISTP': '鉴赏家', 'ISFP': '探险家', 'ESTP': '企业家', 'ESFP': '表演者'
      },
      ja: {
        'INTJ': '建築家', 'INTP': '論理学者', 'ENTJ': '指揮官', 'ENTP': '討論者',
        'INFJ': '提唱者', 'INFP': '仲介者', 'ENFJ': '主人公', 'ENFP': '運動家',
        'ISTJ': '管理者', 'ISFJ': '擁護者', 'ESTJ': '幹部', 'ESFJ': '領事',
        'ISTP': '巨匠', 'ISFP': '冒険家', 'ESTP': '起業家', 'ESFP': 'エンターテイナー'
      }
    };

    // 제목 결정
    let title = langContent.title;
    let subtitle = langContent.subtitle;
    
    if (type === 'result') {
      const mbtiName = mbtiNames[lang]?.[mbti] || mbtiNames.ko[mbti] || '건축가';
      title = `${mbti} ${mbtiName}`;
      subtitle = `${langContent.subtitle} - ${langContent.result}`;
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            color: 'white',
            position: 'relative',
            padding: '40px',
          }}
        >
          {/* 배경 패턴 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
          
          {/* 메인 컨테이너 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              padding: '60px',
              textAlign: 'center',
              maxWidth: '900px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 뇌 이모지 */}
            <div
              style={{
                fontSize: '80px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🧠
            </div>
            
            {/* 제목 */}
            <div
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textAlign: 'center',
                lineHeight: '1.1',
              }}
            >
              {title}
            </div>
            
            {/* 부제목 */}
            <div
              style={{
                fontSize: '36px',
                fontWeight: '500',
                marginBottom: '30px',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                lineHeight: '1.3',
              }}
            >
              {subtitle}
            </div>
            
            {/* 설명 텍스트 */}
            <div
              style={{
                fontSize: '24px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '10px',
                textAlign: 'center',
              }}
            >
              {langContent.description1}
            </div>
            <div
              style={{
                fontSize: '24px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '40px',
                textAlign: 'center',
              }}
            >
              {langContent.description2}
            </div>
            
            {/* 버튼 */}
            <div
              style={{
                background: 'white',
                color: '#667eea',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '16px 32px',
                borderRadius: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {langContent.button}
            </div>
          </div>
          
          {/* 브랜딩 */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '60px',
              fontSize: '20px',
              fontWeight: '500',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Senior MBTI
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Content-Type': 'image/png',
        },
      }
    );
  } catch (e) {
    console.log(`Error generating thumbnail: ${e.message}`);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}