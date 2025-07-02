# 시니어 MBTI - Next.js Edition

시니어를 위한 특별한 MBTI 성격 유형 테스트 웹 애플리케이션입니다.

## 🌟 특징

- **시니어 친화적 UI/UX**: 큰 폰트, 쉬운 네비게이션, 직관적인 인터페이스
- **24개 맞춤 질문**: 시니어 세대의 생활과 경험에 맞춘 질문들
- **16가지 유형 결과**: 각 MBTI 유형별 시니어 특화 설명
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- **빠른 성능**: Next.js 14 App Router 사용

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Deployment**: Vercel
- **Icons**: Lucide React

## 🚀 로컬 개발 환경 설정

1. **저장소 클론**
```bash
git clone https://github.com/your-username/senior-mbti-nextjs.git
cd senior-mbti-nextjs
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
```bash
cp .env.example .env.local
```
`.env.local` 파일에서 데이터베이스 URL을 설정하세요.

4. **데이터베이스 설정**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. **개발 서버 실행**
```bash
npm run dev
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   ├── test/[step]/       # 테스트 페이지
│   ├── result/[id]/       # 결과 페이지
│   ├── layout.tsx         # 메인 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
├── lib/                   # 유틸리티 함수
└── types/                 # TypeScript 타입 정의
```

## 🎯 주요 기능

### 1. 시니어 맞춤 MBTI 테스트
- 24개의 생활 밀착형 질문
- 직관적인 선택지 인터페이스
- 실시간 진행률 표시

### 2. 상세한 결과 분석
- 16가지 MBTI 유형별 시니어 특화 설명
- 차원별 점수 시각화
- 결과 공유 기능

### 3. 접근성 최적화
- 큰 폰트 사이즈 (18px 기본)
- 터치하기 쉬운 버튼 크기 (최소 64px)
- 고대비 색상 조합
- 키보드 네비게이션 지원

## 🔗 API 엔드포인트

### 질문 관련
- `GET /api/questions` - 모든 질문과 선택지 조회
- `POST /api/questions` - 새 질문 생성 (관리용)

### 테스트 관련
- `POST /api/test/submit` - 테스트 답변 제출 및 결과 계산
  ```json
  {
    "answers": {"1": 1, "2": 3, ...},
    "sessionId": "session_123"
  }
  ```

### 결과 관련
- `GET /api/results/[id]` - 테스트 결과 상세 조회
  - 응답: 테스트 결과 + MBTI 설명

### 시드 데이터
- `POST /api/seed` - 데이터베이스 초기 데이터 생성 (배포 시 1회 실행)

## 🚀 Vercel 배포 가이드

### 1. 사전 준비
- Vercel 계정 생성 (https://vercel.com)
- PostgreSQL 데이터베이스 준비 (Vercel Postgres 또는 외부 DB)

### 2. 프로젝트 배포
1. **Vercel에 프로젝트 연결**
   ```bash
   npx vercel --prod
   ```
   또는 Vercel 대시보드에서 GitHub 저장소 연결

2. **환경 변수 설정**
   Vercel 대시보드 → Settings → Environment Variables에서 추가:
   ```
   DATABASE_URL=postgresql://username:password@host:5432/database?schema=public
   ```

3. **데이터베이스 초기화**
   배포 후 Vercel Function을 통해 시드 데이터 생성:
   ```
   https://your-app.vercel.app/api/seed (POST 요청)
   ```

### 3. 배포 확인
- 홈페이지 로딩 확인
- MBTI 테스트 전체 플로우 테스트
- 결과 페이지 및 공유 기능 확인

### 4. 배포 후 설정
- Custom Domain 연결 (선택사항)
- Analytics 설정
- Performance 모니터링

## 📊 데이터베이스 스키마

### Question (질문)
- `id`: 고유 ID
- `step`: 질문 순서 (1-24)
- `dimension`: MBTI 차원 (E/I, S/N, T/F, J/P)
- `text`: 질문 내용

### Choice (선택지)
- `id`: 고유 ID
- `questionId`: 질문 ID (외래키)
- `text`: 선택지 내용
- `mbtiType`: MBTI 타입 (E, I, S, N, T, F, J, P)
- `weight`: 가중치 (1.0-2.0)

### ResultDescription (결과 설명)
- `id`: 고유 ID
- `mbtiType`: MBTI 유형 (ISTJ, ENFP 등)
- `title`: 한국어 제목 ("명예로운 교장 선생님" 등)
- `description`: 상세 설명

### TestResult (테스트 결과)
- `id`: 고유 ID (CUID)
- `sessionId`: 세션 ID (비회원용)
- `answers`: 답변 데이터 (JSON)
- `mbtiType`: 최종 MBTI 결과
- `scores`: 차원별 점수 (JSON)
- `completedAt`: 완료 시간

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: 파란색 계열 (신뢰감, 안정감)
- **Warm**: 따뜻한 베이지/오렌지 계열 (친근감)
- **Gray**: 텍스트 및 배경

### 타이포그래피
- 기본 폰트 크기: 18px
- 제목: 24px-42px
- 줄 간격: 1.6-1.8

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👥 제작팀

- **기획/개발**: Claude Code Team
- **UI/UX 디자인**: 시니어 친화적 디자인 적용
- **콘텐츠**: 시니어 세대 맞춤 MBTI 질문 및 결과