# Todo App 만들기 프롬프트

아래 내용을 Claude Code 터미널에 붙여넣으면 이 프로젝트를 처음부터 만들 수 있습니다.

---

## 프롬프트

```
Next.js Todo App을 만들어줘. 아래 요구사항을 모두 포함해서 한번에 완성해줘.

## 프로젝트 초기화
- npx create-next-app@latest 사용 (TypeScript, Tailwind CSS, App Router, src/ 디렉토리)
- 프로젝트 이름: todo-app

## 기능 요구사항

### 핵심 기능
- 할 일 추가 (텍스트 입력 + Enter 키 또는 추가 버튼)
- 할 일 완료/미완료 토글 (체크박스)
- 할 일 삭제 (× 버튼)
- 할 일 인라인 수정 (더블클릭 또는 ✎ 버튼으로 편집 모드, Enter로 저장, Escape로 취소)
- 필터링: 전체 / 진행중 / 완료 (탭 UI)
- 남은 할 일 개수 표시

### 음성 입력
- Web Speech API(SpeechRecognition)로 한국어 음성 입력
- 마이크 버튼(🎤) 클릭으로 토글
- 녹음 중일 때 빨간색 펄스 애니메이션
- getUserMedia로 먼저 권한을 확보해서 매번 권한 팝업이 뜨지 않도록 처리
- 음성 인식 미지원 브라우저에서는 마이크 버튼 숨김

### 데이터 저장
- localStorage에 자동 저장/로드
- 새로고침해도 데이터 유지
- SSR 하이드레이션 불일치 방지 (isLoaded 상태 사용)

### PWA (Progressive Web App)
- public/manifest.json: name "Todo App", display standalone, theme_color #3b82f6
- public/sw.js: 네트워크 우선 + 캐시 폴백 전략의 Service Worker
- public/icons/: 파란 배경 + 흰색 체크마크 SVG 아이콘 (192, 512)
- layout.tsx에 manifest 링크, theme-color meta, apple-mobile-web-app meta, SW 등록 스크립트
- next.config.ts에 sw.js Cache-Control: no-cache 헤더

## 기술 구조
- src/types/todo.ts: Todo 인터페이스 (id, text, completed, createdAt), FilterType 타입
- src/components/TodoInput.tsx: 텍스트 입력 + 음성 입력 컴포넌트
- src/components/TodoItem.tsx: 개별 할 일 (체크, 텍스트, 인라인 수정, 삭제)
- src/components/TodoList.tsx: 할 일 목록 렌더링
- src/components/TodoFilter.tsx: 전체/진행중/완료 필터 탭
- src/app/page.tsx: 메인 페이지 (상태 관리, localStorage 연동)
- src/app/layout.tsx: PWA 메타데이터 포함

## 디자인
- 모바일 우선 반응형, 최대 너비 lg (32rem)
- 배경: bg-gray-50, 카드: bg-white + border-gray-200
- 강조색: blue-500, 폰트: Geist Sans
- 한국어 UI (placeholder, 버튼 텍스트, 필터 라벨 모두 한국어)

완성 후 npm run build로 빌드 성공을 확인해줘.
```
