# 🎲 로또 번호 추첨기 (Lotto Number Generator)

## 📋 개요
이 프로젝트는 사용자 친화적인 인터페이스를 통해 로또 번호를 생성하고 시각화하는 웹 애플리케이션입니다. Next.js와 React를 기반으로 제작되었으며, 모던하고 인터랙티브한 사용자 경험을 제공합니다.

## 🎯 목적
- 사용자들에게 직관적이고 재미있는 로또 번호 생성 경험 제공
- 애니메이션과 시각적 요소를 통한 실제 추첨기와 유사한 경험 구현
- 반응형 디자인을 통한 모든 디바이스에서의 최적화된 사용성 제공

## 🛠️ 주요 기술 스택
- **Framework:** Next.js 15.2.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animation:** Custom CSS Animations
- **Package Manager:** pnpm

## 📁 프로젝트 구조
```
src/ 
├── app/ # Next.js 앱 라우터 
│ └── page.tsx # 메인 페이지 
├── components/ # 리액트 컴포넌트 
│ ├── ui/ # 재사용 가능한 UI 컴포넌트 
│ └── lotto-game/ # 로또 게임 관련 컴포넌트 
├── styles/ # 스타일 관련 파일 
│ └── globals.css # 전역 스타일 
└── lib/ # 유틸리티 함수 및 상수
```

## 🌟 주요 기능
- 1~45 사이의 랜덤 번호 6개 생성
- 실시간 애니메이션 효과를 통한 추첨 과정 시각화
- 번호 볼의 동적인 움직임 구현
- 반응형 디자인으로 모바일/데스크톱 환경 모두 지원

## 🚀 시작하기

### 설치
```bash
# 저장소 클론
git clone [repository-url]
# 의존성 설치
pnpm install
# 개발 서버 실행
pnpm dev
``` 

### 빌드
```
bash
# 프로덕션 빌드
pnpm build
# 프로덕션 서버 실행
pnpm start
``` 

## 🌐 브라우저 지원
- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 📱 반응형 디자인
- 모바일 (320px+)
- 태블릿 (768px+)
- 데스크톱 (1024px+)

## 🤝 기여하기
프로젝트에 기여하고 싶으시다면:
1. 이슈를 생성하여 변경 사항에 대해 논의해주세요
2. 포크 후 새로운 브랜치를 생성하세요
3. 변경사항을 커밋하고 풀 리퀘스트를 보내주세요

## 📝 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.
```
