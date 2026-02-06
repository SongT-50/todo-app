# todo-app Design Document

> **Summary**: 할 일을 추가, 완료, 삭제할 수 있는 투두리스트 웹 애플리케이션의 상세 설계
>
> **Project**: new_test
> **Version**: 0.1.0
> **Author**: User
> **Date**: 2026-02-06
> **Status**: Draft
> **Planning Doc**: [todo-app.plan.md](../../01-plan/features/todo-app.plan.md)

### Pipeline References

| Phase | Document | Status |
|-------|----------|--------|
| Phase 1 | Schema Definition | N/A |
| Phase 2 | Coding Conventions | N/A |
| Phase 3 | Mockup | N/A |
| Phase 4 | API Spec | N/A (Starter - no backend) |

---

## 1. Overview

### 1.1 Design Goals

- 간결한 UI로 할 일 CRUD 기능 제공
- Starter 레벨에 맞는 단순한 컴포넌트 구조
- useState 기반 로컬 상태 관리
- Tailwind CSS로 반응형 레이아웃 구현

### 1.2 Design Principles

- **단일 책임**: 각 컴포넌트는 하나의 역할만 수행
- **단순함 우선**: 과도한 추상화 없이 직관적인 구조
- **즉각적 피드백**: 사용자 액션에 즉시 UI 반영

---

## 2. Architecture

### 2.1 Component Diagram

```
┌──────────────────────────────────────────────┐
│                   page.tsx                    │
│              (메인 페이지, 상태 관리)            │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │           TodoInput.tsx                │  │
│  │     (텍스트 입력 + 추가 버튼)            │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │           TodoFilter.tsx               │  │
│  │   (전체 / 진행중 / 완료 필터 탭)          │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │           TodoList.tsx                 │  │
│  │  ┌──────────────────────────────────┐  │  │
│  │  │       TodoItem.tsx               │  │  │
│  │  │  (체크박스 + 텍스트 + 삭제버튼)    │  │  │
│  │  └──────────────────────────────────┘  │  │
│  │  ┌──────────────────────────────────┐  │  │
│  │  │       TodoItem.tsx               │  │  │
│  │  └──────────────────────────────────┘  │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │        남은 할 일: N개                  │  │
│  └────────────────────────────────────────┘  │
│                                              │
└──────────────────────────────────────────────┘
```

### 2.2 Data Flow

```
사용자 입력 → TodoInput → addTodo() → todos 상태 업데이트 → TodoList 리렌더링
체크박스 클릭 → TodoItem → toggleTodo() → todos 상태 업데이트 → TodoList 리렌더링
삭제 클릭 → TodoItem → deleteTodo() → todos 상태 업데이트 → TodoList 리렌더링
필터 클릭 → TodoFilter → setFilter() → filter 상태 업데이트 → TodoList 필터링
```

### 2.3 Dependencies

| Component | Depends On | Purpose |
|-----------|-----------|---------|
| TodoList | TodoItem | 개별 할 일 항목 렌더링 |
| TodoList | filter 상태 | 필터링된 목록 표시 |
| TodoItem | Todo 타입 | 할 일 데이터 구조 |
| page.tsx | TodoInput, TodoList, TodoFilter | 전체 조합 |

---

## 3. Data Model

### 3.1 Entity Definition

```typescript
// Todo 엔티티
interface Todo {
  id: string;          // 고유 식별자 (crypto.randomUUID())
  text: string;        // 할 일 내용
  completed: boolean;  // 완료 여부
  createdAt: number;   // 생성 시각 (Date.now())
}

// 필터 타입
type FilterType = "all" | "active" | "completed";
```

### 3.2 Entity Relationships

```
이 앱은 단일 엔티티(Todo)만 사용. 관계 없음.
```

### 3.3 Database Schema

```
N/A - Starter 레벨, 로컬 상태(useState)만 사용.
향후 localStorage 연동 가능.
```

---

## 4. API Specification

```
N/A - Starter 레벨, 서버 API 없음.
모든 데이터는 클라이언트 측 useState로 관리.
```

---

## 5. UI/UX Design

### 5.1 Screen Layout

```
┌──────────────────────────────────────┐
│           Todo App                   │  ← 제목
├──────────────────────────────────────┤
│  ┌─────────────────────────┐ ┌────┐ │
│  │ 할 일을 입력하세요...     │ │추가│ │  ← 입력 영역
│  └─────────────────────────┘ └────┘ │
├──────────────────────────────────────┤
│  [전체]  [진행중]  [완료]            │  ← 필터 탭
├──────────────────────────────────────┤
│  ☐ 장보기                      [×]  │  ← 할 일 항목
│  ☑ 운동하기 (취소선)            [×]  │
│  ☐ 책 읽기                     [×]  │
├──────────────────────────────────────┤
│  남은 할 일: 2개                     │  ← 카운터
└──────────────────────────────────────┘
```

### 5.2 User Flow

```
페이지 로드 → 빈 목록 표시
  → 텍스트 입력 → Enter/버튼 클릭 → 목록에 추가
  → 체크박스 클릭 → 완료 토글 (취소선 표시)
  → 삭제 버튼 클릭 → 목록에서 제거
  → 필터 탭 클릭 → 해당 상태만 표시
```

### 5.3 Component List

| Component | Location | Responsibility |
|-----------|----------|----------------|
| **TodoInput** | `src/components/TodoInput.tsx` | 텍스트 입력, Enter/버튼으로 할 일 추가 |
| **TodoItem** | `src/components/TodoItem.tsx` | 개별 할 일 표시, 체크박스 토글, 삭제 |
| **TodoList** | `src/components/TodoList.tsx` | 필터링된 할 일 목록 렌더링 |
| **TodoFilter** | `src/components/TodoFilter.tsx` | 전체/진행중/완료 필터 탭 |

---

## 6. Error Handling

### 6.1 에러 시나리오

| 시나리오 | 원인 | 처리 방법 |
|----------|------|-----------|
| 빈 텍스트 입력 | 사용자가 빈 값으로 추가 시도 | 입력 무시 (trim 후 빈 문자열 체크) |
| 목록이 비어있음 | 할 일이 없거나 필터 결과 없음 | "할 일이 없습니다" 메시지 표시 |

---

## 7. Security Considerations

- [x] XSS 방지: React의 기본 이스케이핑 활용 (dangerouslySetInnerHTML 미사용)
- [ ] 인증: N/A (Starter 레벨)
- [ ] 암호화: N/A (민감 데이터 없음)
- [ ] HTTPS: 배포 시 적용

---

## 8. Test Plan

### 8.1 Test Scope

| Type | Target | Tool |
|------|--------|------|
| 수동 테스트 | UI 동작 확인 | 브라우저 |

### 8.2 Test Cases (Key)

- [ ] Happy path: 할 일 추가 → 완료 토글 → 삭제
- [ ] Edge case: 빈 텍스트 입력 시 추가되지 않음
- [ ] 필터: 각 탭 전환 시 올바른 목록 표시
- [ ] 카운터: 미완료 항목 수가 정확히 표시됨

---

## 9. Clean Architecture

### 9.1 Layer Structure (Starter)

| Layer | Responsibility | Location |
|-------|---------------|----------|
| **Presentation** | UI 컴포넌트, 페이지 | `src/components/`, `src/app/` |
| **Domain** | 타입 정의 | `src/types/` |

> Starter 레벨이므로 Application, Infrastructure 레이어는 불필요.

### 9.2 This Feature's Layer Assignment

| Component | Layer | Location |
|-----------|-------|----------|
| page.tsx | Presentation | `src/app/page.tsx` |
| TodoInput | Presentation | `src/components/TodoInput.tsx` |
| TodoItem | Presentation | `src/components/TodoItem.tsx` |
| TodoList | Presentation | `src/components/TodoList.tsx` |
| TodoFilter | Presentation | `src/components/TodoFilter.tsx` |
| Todo, FilterType | Domain | `src/types/todo.ts` |

---

## 10. Coding Convention

### 10.1 Naming Conventions

| Target | Rule | Example |
|--------|------|---------|
| Components | PascalCase | `TodoInput`, `TodoItem` |
| Functions | camelCase | `addTodo()`, `toggleTodo()` |
| Types/Interfaces | PascalCase | `Todo`, `FilterType` |
| Files (component) | PascalCase.tsx | `TodoInput.tsx` |
| Files (type) | camelCase.ts | `todo.ts` |

### 10.2 Import Order

```typescript
// 1. React
import { useState } from "react";

// 2. Components
import { TodoInput } from "@/components/TodoInput";

// 3. Types
import type { Todo, FilterType } from "@/types/todo";
```

### 10.3 This Feature's Conventions

| Item | Convention Applied |
|------|-------------------|
| Component naming | PascalCase (TodoInput, TodoItem, etc.) |
| File organization | Starter 구조 (components/, types/) |
| State management | useState (page.tsx에서 중앙 관리) |
| Styling | Tailwind CSS 유틸리티 클래스 |

---

## 11. Implementation Guide

### 11.1 File Structure

```
src/
├── app/
│   ├── layout.tsx          ← 루트 레이아웃 (Tailwind 설정)
│   ├── page.tsx            ← 메인 페이지 (상태 관리 + 컴포넌트 조합)
│   └── globals.css         ← 글로벌 스타일 (Tailwind)
├── components/
│   ├── TodoInput.tsx       ← 입력 컴포넌트
│   ├── TodoItem.tsx        ← 개별 항목 컴포넌트
│   ├── TodoList.tsx        ← 목록 컴포넌트
│   └── TodoFilter.tsx      ← 필터 컴포넌트
└── types/
    └── todo.ts             ← Todo, FilterType 타입 정의
```

### 11.2 Implementation Order

1. [ ] 타입 정의 (`src/types/todo.ts`)
2. [ ] TodoItem 컴포넌트 (`src/components/TodoItem.tsx`)
3. [ ] TodoInput 컴포넌트 (`src/components/TodoInput.tsx`)
4. [ ] TodoFilter 컴포넌트 (`src/components/TodoFilter.tsx`)
5. [ ] TodoList 컴포넌트 (`src/components/TodoList.tsx`)
6. [ ] 메인 페이지 조합 (`src/app/page.tsx`)
7. [ ] 레이아웃 설정 (`src/app/layout.tsx`)
8. [ ] 스타일 및 반응형 조정

### 11.3 Component Props Specification

```typescript
// TodoInput
interface TodoInputProps {
  onAdd: (text: string) => void;
}

// TodoItem
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// TodoList
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// TodoFilter
interface TodoFilterProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
}
```

### 11.4 State Management (page.tsx)

```typescript
// 상태
const [todos, setTodos] = useState<Todo[]>([]);
const [filter, setFilter] = useState<FilterType>("all");

// 파생 데이터
const filteredTodos = todos.filter(todo => {
  if (filter === "active") return !todo.completed;
  if (filter === "completed") return todo.completed;
  return true;
});
const remainingCount = todos.filter(t => !t.completed).length;

// 핸들러
const addTodo = (text: string) => { ... };
const toggleTodo = (id: string) => { ... };
const deleteTodo = (id: string) => { ... };
```

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-02-06 | 초기 작성 | User |
