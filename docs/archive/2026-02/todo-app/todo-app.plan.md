# todo-app Planning Document

> **Summary**: 할 일을 추가, 완료, 삭제할 수 있는 투두리스트 웹 애플리케이션
>
> **Project**: new_test
> **Version**: 0.1.0
> **Author**: User
> **Date**: 2026-02-06
> **Status**: Draft

---

## 1. Overview

### 1.1 Purpose

일상적인 할 일(Task)을 관리할 수 있는 간단한 웹 애플리케이션을 만든다. 사용자는 할 일을 추가하고, 완료 표시하고, 삭제할 수 있다.

### 1.2 Background

투두리스트는 웹 개발의 기본 패턴(CRUD)을 학습하기에 적합한 프로젝트이며, 프론트엔드 상태 관리와 UI 인터랙션의 핵심을 다룬다.

### 1.3 Related Documents

- Design: `docs/02-design/features/todo-app.design.md` (예정)

---

## 2. Scope

### 2.1 In Scope

- [x] 할 일 추가 (텍스트 입력)
- [x] 할 일 완료/미완료 토글
- [x] 할 일 삭제
- [x] 할 일 목록 표시
- [x] 필터링 (전체 / 진행중 / 완료)

### 2.2 Out of Scope

- 서버/DB 연동 (로컬 상태만 사용)
- 사용자 인증 (로그인/회원가입)
- 드래그 앤 드롭 정렬
- 카테고리/태그 기능

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | 텍스트를 입력하고 Enter 또는 버튼으로 할 일 추가 | High | Pending |
| FR-02 | 체크박스로 할 일 완료/미완료 토글 | High | Pending |
| FR-03 | 삭제 버튼으로 할 일 제거 | High | Pending |
| FR-04 | 전체/진행중/완료 필터 탭 | Medium | Pending |
| FR-05 | 남은 할 일 개수 표시 | Low | Pending |

### 3.2 Non-Functional Requirements

| Category | Criteria | Measurement Method |
|----------|----------|-------------------|
| Performance | 입력 후 즉시 반영 (< 100ms) | 체감 테스트 |
| Accessibility | 키보드 탐색 가능 | 수동 테스트 |
| Responsive | 모바일/데스크톱 대응 | 브라우저 테스트 |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] 모든 기능 요구사항(FR-01~05) 구현
- [ ] 브라우저에서 정상 동작 확인
- [ ] 반응형 레이아웃 적용

### 4.2 Quality Criteria

- [ ] 빌드 에러 없음
- [ ] 린트 에러 없음

---

## 5. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| 새로고침 시 데이터 소실 | Medium | High | localStorage 활용 고려 |
| 대량 항목 시 성능 저하 | Low | Low | 가상 스크롤 또는 페이징 (향후) |

---

## 6. Architecture Considerations

### 6.1 Project Level Selection

| Level | Characteristics | Recommended For | Selected |
|-------|-----------------|-----------------|:--------:|
| **Starter** | Simple structure (`components/`, `lib/`, `types/`) | Static sites, portfolios, landing pages | ✅ |
| **Dynamic** | Feature-based modules, services layer | Web apps with backend, SaaS MVPs | ☐ |
| **Enterprise** | Strict layer separation, DI, microservices | High-traffic systems, complex architectures | ☐ |

### 6.2 Key Architectural Decisions

| Decision | Options | Selected | Rationale |
|----------|---------|----------|-----------|
| Framework | Next.js / React / Vue | Next.js (App Router) | Starter 레벨 기본 프레임워크 |
| State Management | Context / Zustand / useState | useState | 단순한 앱이므로 로컬 상태로 충분 |
| Styling | Tailwind / CSS Modules | Tailwind CSS | 빠른 스타일링, 유틸리티 기반 |

### 6.3 Clean Architecture Approach

```
Selected Level: Starter

Folder Structure Preview:
src/
├── app/              ← Next.js App Router 페이지
│   ├── layout.tsx
│   └── page.tsx
├── components/       ← UI 컴포넌트
│   ├── TodoInput.tsx
│   ├── TodoItem.tsx
│   ├── TodoList.tsx
│   └── TodoFilter.tsx
├── lib/              ← 유틸리티
│   └── types.ts
└── types/            ← 타입 정의
    └── todo.ts
```

---

## 7. Convention Prerequisites

### 7.1 Existing Project Conventions

- [ ] `CLAUDE.md` has coding conventions section
- [ ] ESLint configuration
- [ ] Prettier configuration
- [ ] TypeScript configuration (`tsconfig.json`)

### 7.2 Conventions to Define/Verify

| Category | Current State | To Define | Priority |
|----------|---------------|-----------|:--------:|
| **Naming** | missing | PascalCase (컴포넌트), camelCase (변수/함수) | High |
| **Folder structure** | missing | Starter 레벨 구조 | High |
| **Styling** | missing | Tailwind CSS 유틸리티 클래스 | Medium |

### 7.3 Environment Variables Needed

| Variable | Purpose | Scope | To Be Created |
|----------|---------|-------|:-------------:|
| 없음 | Starter 레벨, 외부 API 없음 | - | - |

---

## 8. Next Steps

1. [ ] 설계 문서 작성 (`/pdca design todo-app`)
2. [ ] 리뷰 및 승인
3. [ ] 구현 시작

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-02-06 | 초기 작성 | User |
