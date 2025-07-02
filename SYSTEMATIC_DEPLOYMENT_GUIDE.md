# 📋 체계적 배포 가이드 및 문제 해결 매뉴얼

## 🎯 목적
향후 배포 실수를 방지하고 안정적인 배포를 보장하기 위한 상세한 가이드

## 📝 배포 전 체크리스트

### 1. 코드 검증 ✅
```bash
# 로컬에서 빌드 테스트
npm run build
npm run start

# 주요 기능 동작 확인
- [ ] 홈페이지 로딩
- [ ] 언어 선택기 동작
- [ ] 설문조사 진행
- [ ] 결과 페이지 표시
- [ ] 16개 MBTI 유형 확인
```

### 2. Git 상태 확인 ✅
```bash
# 현재 브랜치 확인
git branch

# 변경사항 확인
git status
git diff

# 최신 커밋 확인
git log --oneline -5
```

### 3. 파일 구조 검증 ✅
```bash
# 핵심 파일 존재 확인
ls -la src/app/page.jsx           # 홈페이지
ls -la src/app/survey/page.jsx    # 설문조사
ls -la src/app/result/[id]/page.jsx # 결과 페이지
ls -la src/contexts/LanguageContext.jsx # 언어 컨텍스트
ls -la src/components/LanguageSelector.jsx # 언어 선택기
```

## 🚀 배포 절차

### Step 1: 준비 단계
```bash
# 1. 작업 디렉토리 정리
rm -rf .next .vercel node_modules/.cache

# 2. 의존성 재설치 (필요시)
npm ci

# 3. 로컬 빌드 테스트
npm run build
```

### Step 2: Git 커밋
```bash
# 1. 변경사항 스테이징
git add .

# 2. 의미있는 커밋 메시지
git commit -m "feat: [기능 설명]

- 주요 변경사항 1
- 주요 변경사항 2
- 테스트 완료 항목

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# 3. 원격 저장소 푸시
git push origin master
```

### Step 3: 배포 확인
```bash
# 1. 배포 완료 대기 (2-3분)
sleep 180

# 2. 새로운 buildId 확인
curl -s "https://senior-mbti-nextjs.vercel.app/" | grep -o "buildId.*," | head -1

# 3. 주요 기능 테스트
curl -s "https://senior-mbti-nextjs.vercel.app/" | grep -o "<title>.*</title>"
curl -s "https://senior-mbti-nextjs.vercel.app/?lang=en" | grep -o "<title>.*</title>"
```

## 🔧 문제 해결 방법

### 문제 1: 빌드 ID가 변경되지 않음

#### 증상
```bash
# 같은 buildId가 계속 반환됨
buildId":"dXv4-0GwObi3Nykrf8-8Y"
```

#### 해결 방법
```bash
# 1. next.config.js 수정
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    return `build-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
  }
}
module.exports = nextConfig
EOF

# 2. 캐시 완전 삭제
rm -rf .next .vercel node_modules/.cache

# 3. 더미 파일로 강제 변경
echo "// Force rebuild $(date)" > src/force-rebuild-$(date +%s).js

# 4. 커밋 및 푸시
git add .
git commit -m "Force rebuild: Clear cache and regenerate buildId"
git push origin master
```

### 문제 2: 새로운 기능이 반영되지 않음

#### 증상
- 최신 코드 변경사항이 배포된 사이트에 보이지 않음
- 이전 버전의 UI/기능이 계속 표시됨

#### 해결 방법
```bash
# 1. 로컬 코드 확인
git log --oneline -10
git show HEAD:src/app/page.jsx | head -20

# 2. 원격 저장소 동기화 확인
git fetch origin
git diff origin/master

# 3. 강제 배포 트리거
echo "export const DEPLOYMENT_TIMESTAMP = '$(date)';" > src/deployment-timestamp.js
git add .
git commit -m "Deploy: Force deployment trigger - $(date)"
git push origin master
```

### 문제 3: Vercel 배포 실패

#### 증상
- GitHub에서 코드는 업데이트되었지만 Vercel 배포가 실패
- 빌드 에러 또는 배포 중단

#### 해결 방법
```bash
# 1. Vercel CLI를 통한 수동 배포
npm i -g vercel
vercel login
vercel --prod

# 2. 설정 파일 재생성
cat > vercel.json << 'EOF'
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm ci"
}
EOF

# 3. 환경 변수 확인
vercel env ls
```

## 📊 배포 검증 체크리스트

### 자동 검증 스크립트
```bash
#!/bin/bash
# deployment-verify.sh

echo "🔍 배포 검증 시작..."

# 1. buildId 확인
BUILD_ID=$(curl -s "https://senior-mbti-nextjs.vercel.app/" | grep -o "buildId.*," | head -1)
echo "BuildId: $BUILD_ID"

# 2. 홈페이지 타이틀 확인
TITLE=$(curl -s "https://senior-mbti-nextjs.vercel.app/" | grep -o "<title>.*</title>")
echo "Title: $TITLE"

# 3. 프리미엄 기능 확인
HERO_SECTION=$(curl -s "https://senior-mbti-nextjs.vercel.app/" | grep -c "hero-section")
echo "Hero Section Present: $HERO_SECTION"

# 4. 언어 지원 확인
EN_TITLE=$(curl -s "https://senior-mbti-nextjs.vercel.app/?lang=en" | grep -o "<title>.*</title>")
echo "English Title: $EN_TITLE"

# 5. 결과 페이지 확인
RESULT_PAGE=$(curl -s "https://senior-mbti-nextjs.vercel.app/result/INTJ" | grep -c "result-container")
echo "Result Page Present: $RESULT_PAGE"

echo "✅ 배포 검증 완료"
```

### 수동 검증 항목
- [ ] **홈페이지**: 프리미엄 히어로 섹션 표시
- [ ] **언어 선택기**: 4개 언어 전환 동작
- [ ] **설문조사**: 진행률 표시 및 키보드 네비게이션
- [ ] **결과 페이지**: 16개 MBTI 유형 표시
- [ ] **반응형**: 모바일/태블릿/데스크톱 정상 표시
- [ ] **성능**: 페이지 로딩 3초 이내

## 🚨 긴급 상황 대응

### 즉시 롤백이 필요한 경우
```bash
# 1. 이전 작동 버전으로 롤백
git log --oneline -10  # 작동하던 커밋 찾기
git reset --hard [COMMIT_HASH]
git push origin master --force

# 2. 롤백 확인
curl -s "https://senior-mbti-nextjs.vercel.app/" | head -10
```

### 완전 재배포가 필요한 경우
```bash
# 1. 새로운 브랜치 생성
git checkout -b emergency-redeploy
git push origin emergency-redeploy

# 2. Vercel에서 브랜치 변경
# Vercel Dashboard > Settings > Git > Production Branch

# 3. 정상 확인 후 master 병합
git checkout master
git merge emergency-redeploy
```

## 📋 배포 로그 템플릿

### 성공 로그
```markdown
# 배포 성공 로그

## 배포 정보
- 일시: YYYY-MM-DD HH:mm:ss
- 커밋: [COMMIT_HASH]
- buildId: [NEW_BUILD_ID]

## 배포된 기능
- ✅ 기능 1
- ✅ 기능 2
- ✅ 기능 3

## 검증 결과
- ✅ 홈페이지 로딩
- ✅ 언어 전환
- ✅ 설문조사 동작
- ✅ 결과 표시

## 성능 지표
- 로딩 시간: X초
- 빌드 크기: X MB
- 접근성 점수: X/100
```

### 실패 로그
```markdown
# 배포 실패 로그

## 문제 상황
- 증상: [구체적 증상]
- 발생 시간: YYYY-MM-DD HH:mm:ss
- 영향 범위: [영향받는 기능]

## 시도한 해결책
1. 해결책 1 - 결과: 실패/성공
2. 해결책 2 - 결과: 실패/성공

## 최종 해결 방법
- 적용된 방법: [상세 설명]
- 소요 시간: X분
- 완료 시간: YYYY-MM-DD HH:mm:ss

## 재발 방지책
- 예방책 1
- 예방책 2
```

## 🎯 모니터링 및 알림

### 자동 모니터링 설정
```javascript
// monitor.js - 정기적 사이트 상태 확인
const https = require('https');

function checkSite() {
  const url = 'https://senior-mbti-nextjs.vercel.app/';
  
  https.get(url, (res) => {
    if (res.statusCode === 200) {
      console.log(`✅ Site is up - ${new Date()}`);
    } else {
      console.log(`❌ Site is down - Status: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.log(`❌ Error: ${err.message}`);
  });
}

// 5분마다 체크
setInterval(checkSite, 5 * 60 * 1000);
```

이 가이드를 통해 향후 배포 문제를 예방하고 신속하게 해결할 수 있습니다.