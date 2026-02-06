# 🍃 Nook Todo List

**깔끔하고 효율적인 할일 관리 앱** - Nintendo의 "Nook Inc." 디자인 감성으로 만든 모던 Todo 앱

[![Deploy](https://github.com/naturalkei/vrt-todo-r3/actions/workflows/deploy.yml/badge.svg)](https://github.com/naturalkei/vrt-todo-r3/actions/workflows/deploy.yml)
[![CI](https://github.com/naturalkei/vrt-todo-r3/actions/workflows/ci.yml/badge.svg)](https://github.com/naturalkei/vrt-todo-r3/actions/workflows/ci.yml)

🔗 **Live Demo**: [https://naturalkei.github.io/vrt-todo-r3/](https://naturalkei.github.io/vrt-todo-r3/)

---

## ✨ Features

### Core Features
- ✅ **CRUD Operations**: 할일 추가, 완료, 수정, 삭제
- 🎨 **Nook Inc. Design**: 민트그린을 메인 컬러로 하는 깔끔한 디자인
- 🔍 **Real-time Search**: 실시간 검색 기능
- 📊 **View Modes**: All / Active / Completed 필터링
- 🎯 **Priority Levels**: Low / Medium / High 우선순위
- 📅 **Due Dates**: 마감일 설정 및 표시
- 🔄 **Recurring Tasks**: Daily / Weekly / Monthly 반복 작업
- 🎭 **Drag & Drop**: 직관적인 순서 변경
- 💾 **IndexedDB**: 로컬 데이터 저장
- 📤 **Import/Export**: JSON 형식 백업/복원

### Advanced Features
- 🕒 **Smart Date Display**: "Today", "Tomorrow" 등 자동 변환
- 🔁 **Auto Recurrence**: 반복 작업 자동 갱신
- 🎨 **Priority Colors**: 우선순위별 색상 구분
- 📱 **Mobile First**: 모바일 최적화 UI
- 🌐 **GitHub Pages**: 자동 배포

---

## 🎨 Design System

### Nook Inc. Color Palette
```css
--nook-green: #1CCD9E    /* Primary Brand Color */
--nook-bg: #F0F8F6       /* Pale Mint Background */
--nook-card: #FFFFFF     /* Clean White Cards */
--nook-text: #4A4A4A     /* Dark Grey Text */
--nook-border: #C8E6DE   /* Soft Green Border */
```

### Design Principles
- 🍃 **Clean & Digital**: NookPhone 앱 스타일
- 🎯 **Modern Flat Design**: 벡터 스타일, 고대비
- 📱 **Touch-Friendly**: 44px+ 터치 영역
- 🌊 **Smooth Transitions**: 부드러운 애니메이션

### UI Components Preview
![Design Draft](./public/ui-design-draft.svg)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **State Management**: Zustand
- **Database**: IndexedDB (idb wrapper)
- **Styling**: Tailwind CSS 3
- **Utils**: clsx, date-fns

### Drag & Drop
- **Library**: @hello-pangea/dnd

### Testing
- **Unit Tests**: Vitest + Happy-DOM
- **E2E Tests**: Playwright
- **Accessibility**: @axe-core/playwright

### DevOps
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages
- **Package Manager**: pnpm

---

## 🚀 Quick Start

### Prerequisites
- Node.js 24+
- pnpm 10+

### Installation
```bash
# Clone repository
git clone https://github.com/naturalkei/vrt-todo-r3.git
cd vrt-todo-r3

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

### Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm test         # Run unit tests
pnpm test:ui      # Run tests with UI
pnpm test:e2e     # Run E2E tests
pnpm test:e2e:ui  # Run E2E tests with UI
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
```

---

## 📁 Project Structure

```
vrt-todo-r3/
├── .github/
│   └── workflows/       # CI/CD workflows
├── e2e/                 # Playwright E2E tests
├── public/              # Static assets
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── bg-pattern.svg
│   └── ui-design-draft.svg
├── src/
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ViewModeTabs.tsx
│   │   ├── FilterButtons.tsx
│   │   ├── AddTodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── ImportExport.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useFilteredTodos.ts
│   ├── lib/             # Utility functions
│   │   ├── db.ts        # IndexedDB wrapper
│   │   ├── recurrence.ts
│   │   └── utils.ts
│   ├── store/           # Zustand store
│   │   └── todoStore.ts
│   ├── types/           # TypeScript types
│   │   └── todo.ts
│   ├── test/            # Test setup
│   │   └── setup.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .editorconfig        # Editor configuration
├── .env                 # Environment variables
├── eslint.config.js     # ESLint configuration
├── playwright.config.ts # Playwright configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

---

## 🧪 Testing

### Unit Tests (15 tests)
```bash
pnpm test run
```
- ✅ Utility functions
- ✅ Recurrence logic
- ✅ Date formatting

### E2E Tests
```bash
pnpm test:e2e
```
- ✅ CRUD operations
- ✅ Search & filtering
- ✅ Drag & drop
- ✅ Priority & due dates
- ✅ Accessibility (axe-core)

---

## 📦 Data Format

### Todo JSON Structure
```json
[
  {
    "id": "abc123",
    "title": "Complete project documentation",
    "completed": false,
    "priority": "high",
    "dueDate": "2024-02-07T00:00:00.000Z",
    "recurrence": "none",
    "createdAt": "2024-02-06T00:00:00.000Z",
    "updatedAt": "2024-02-06T00:00:00.000Z",
    "order": 0
  }
]
```

### Import/Export
- **Export**: JSON 파일로 다운로드
- **Import**: JSON 파일 업로드로 복원

---

## 🎯 Code Style

### Clean Code Rules
1. **No Semicolons**: ESLint 자동 제거
2. **clsx Array Syntax**: 가독성 향상
```tsx
className={cn([
  'bg-white',
  'rounded-2xl',
  'border-2',
  'border-nook-border',
])}
```

---

## 🚀 Deployment

### GitHub Pages
- **Branch**: `main`
- **Base Path**: `/vrt-todo-r3/`
- **Auto Deploy**: Push to main triggers deployment

### Manual Deployment
```bash
pnpm build
# Deploy dist/ folder to hosting service
```

---

## 📝 License

MIT License - feel free to use this project for learning or personal use.

---

## 👏 Credits

- **Design Inspiration**: Nintendo's Animal Crossing "Nook Inc."
- **Built with**: React, TypeScript, Vite, Zustand, Tailwind CSS
- **Orchestrated by**: Cursor Agent + Gemini CLI

---

## 🔗 Links

- 🌐 **Live Demo**: [https://naturalkei.github.io/vrt-todo-r3/](https://naturalkei.github.io/vrt-todo-r3/)
- 📦 **Repository**: [https://github.com/naturalkei/vrt-todo-r3](https://github.com/naturalkei/vrt-todo-r3)
- 🎨 **Design Assets**: [./public/ui-design-draft.svg](./public/ui-design-draft.svg)

---

**Made with 🍃 by the Nook Inc. Development Team**
