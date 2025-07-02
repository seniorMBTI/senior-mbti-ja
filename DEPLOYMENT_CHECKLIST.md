# 시니어 MBTI 배포 체크리스트

## 🚀 배포 전 체크리스트

### 📁 파일 정리
- [ ] 백업 파일 제거 (`*backup*`, `*.bak`)
- [ ] 미사용 컴포넌트 삭제
- [ ] tsconfig.json 관련 파일 제거
- [ ] node_modules 및 .next 폴더 정리

### 📦 의존성 확인
- [ ] package.json에 핵심 3개 패키지만 포함
  - [ ] next: 14.1.0
  - [ ] react: 18.2.0  
  - [ ] react-dom: 18.2.0
- [ ] devDependencies 모두 제거
- [ ] scripts에 build, dev, start만 포함

### ⚙️ 설정 파일
- [ ] next.config.js 간소화 (빈 객체)
- [ ] vercel.json 최소 설정
- [ ] middleware.js 구현 (다국어 지원 시)

### 🔍 코드 점검
- [ ] 'use client' 지시문 필요한 곳에 추가
- [ ] import 경로 상대 경로로 수정
- [ ] console.log 디버깅 코드 제거 (선택사항)
- [ ] TypeScript 문법 제거

## 🌐 다국어 기능 체크리스트

### 🛠️ 미들웨어
- [ ] src/middleware.js 파일 존재
- [ ] URL 파라미터 lang 감지
- [ ] 쿠키에 언어 저장
- [ ] 지원 언어: ko, en, zh, ja

### 🎯 언어 컨텍스트
- [ ] LanguageContext.jsx 구현
- [ ] 마운트 상태 관리
- [ ] URL 파라미터 우선 확인
- [ ] 쿠키 → localStorage 순서로 폴백
- [ ] 번역 데이터 완성

### 🔄 컴포넌트
- [ ] LanguageSelector 구현
- [ ] t() 함수 사용
- [ ] 언어 변경 시 리렌더링
- [ ] 국기 이모지 표시

## 📝 Git 및 배포

### 🔄 Git 준비
- [ ] 변경사항 스테이징: `git add -A`
- [ ] 의미있는 커밋 메시지 작성
- [ ] 마스터 브랜치에 푸시: `git push origin master`

### ⏱️ 배포 모니터링
- [ ] Vercel 대시보드 확인
- [ ] 빌드 로그 점검
- [ ] 배포 완료까지 2-3분 대기

## ✅ 배포 후 검증

### 🌍 기본 사이트 확인
- [ ] https://senior-mbti-nextjs.vercel.app/ 접속
- [ ] 한국어 페이지 정상 로딩
- [ ] 언어 선택기 표시 확인

### 🇺🇸 영어 버전
- [ ] ?lang=en 파라미터로 접속
- [ ] "Senior MBTI" 제목 확인
- [ ] "Welcome!" 인사말 확인
- [ ] "✨ Start Test" 버튼 확인

### 🇨🇳 중국어 버전
- [ ] ?lang=zh 파라미터로 접속
- [ ] "银发族MBTI" 제목 확인
- [ ] "欢迎您，尊敬的长者！" 인사말 확인
- [ ] "✨ 开始测试" 버튼 확인

### 🇯🇵 일본어 버전
- [ ] ?lang=ja 파라미터로 접속
- [ ] "シニアMBTI" 제목 확인
- [ ] "ようこそ！" 인사말 확인
- [ ] "✨ テスト開始" 버튼 확인

### 🔄 기능 테스트
- [ ] 언어 선택기 드롭다운 동작
- [ ] 언어 변경 시 즉시 반영
- [ ] URL 파라미터 자동 업데이트
- [ ] 페이지 새로고침 시 언어 유지

## 🚨 문제 해결

### 배포 실패 시
1. [ ] package.json 문법 확인
2. [ ] import 경로 점검
3. [ ] 'use client' 누락 확인
4. [ ] 미들웨어 문법 점검

### 언어 전환 안됨
1. [ ] 브라우저 쿠키 확인
2. [ ] 개발자 도구 콘솔 로그 점검
3. [ ] 네트워크 탭에서 미들웨어 동작 확인
4. [ ] localStorage 확인

### 페이지 로딩 오류
1. [ ] Next.js 13+ App Router 문법 확인
2. [ ] 서버 컴포넌트 vs 클라이언트 컴포넌트 구분
3. [ ] 하이드레이션 오류 점검

## 📊 성능 확인

### ⚡ 속도 테스트
- [ ] 초기 로딩 2초 이내
- [ ] 언어 전환 즉시 반응
- [ ] 모바일에서도 정상 동작

### 🔍 SEO 확인
- [ ] 메타 태그 올바른 언어로 표시
- [ ] 각 언어별 제목 확인
- [ ] Open Graph 태그 동작

## 📋 완료 후 작업

### 📚 문서 업데이트
- [ ] DEPLOYMENT_SUCCESS_LOG.md 업데이트
- [ ] 버전 태그 생성 (선택사항)
- [ ] README.md 업데이트

### 🔔 알림
- [ ] 팀원에게 배포 완료 알림
- [ ] 테스트 URL 공유
- [ ] 변경사항 공지

---

## 🎯 Quick Reference

**주요 명령어:**
```bash
# 정리
rm -f *backup* *.bak
rm -rf node_modules .next

# 배포
git add -A
git commit -m "배포 메시지"
git push origin master
```

**테스트 URL:**
- 🇰🇷 https://senior-mbti-nextjs.vercel.app/
- 🇺🇸 https://senior-mbti-nextjs.vercel.app/?lang=en
- 🇨🇳 https://senior-mbti-nextjs.vercel.app/?lang=zh
- 🇯🇵 https://senior-mbti-nextjs.vercel.app/?lang=ja