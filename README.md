# 🍃 Nook Todo List

**A clean and efficient task management app** - a modern todo app inspired by Nintendo's "Nook Inc." design language

[![Deploy](https://github.com/naturalkei/vrt-todo-r3/actions/workflows/deploy.yml/badge.svg)](https://github.com/naturalkei/vrt-todo-r3/actions/workflows/deploy.yml)
[![CI](https://github.com/naturalkei/vrt-todo-r3/actions/workflows/ci.yml/badge.svg)](https://github.com/naturalkei/vrt-todo-r3/actions/workflows/ci.yml)

🔗 **Live Demo**: [https://naturalkei.github.io/vrt-todo-r3/](https://naturalkei.github.io/vrt-todo-r3/)

---

## ✨ Features

### Core Features
- ✅ **CRUD Operations**: Add, complete, edit, and delete tasks
- 🎨 **Nook Inc. Design**: Clean design with mint green as the primary color
- 🔍 **Real-time Search**: Instant search as you type
- 📊 **View Modes**: Filter by All / Active / Completed
- 🎯 **Priority Levels**: Low / Medium / High priority
- 📅 **Due Dates**: Set and display due dates
- 🔄 **Recurring Tasks**: Daily / Weekly / Monthly recurring tasks
- 🎭 **Drag & Drop**: Intuitive drag-and-drop reordering
- 💾 **IndexedDB**: Local data persistence
- 📤 **Import/Export**: Backup and restore in JSON format

### Advanced Features
- 🕒 **Smart Date Display**: Automatically shows labels like "Today" and "Tomorrow"
- 🔁 **Auto Recurrence**: Automatically renews recurring tasks
- 🎨 **Priority Colors**: Color-coded by priority level
- 📱 **Mobile First**: Mobile-optimized UI
- 🌐 **GitHub Pages**: Automated deployments

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
- 🍃 **Clean & Digital**: NookPhone-style app UI
- 🎯 **Modern Flat Design**: Vector-style, high-contrast visuals
- 📱 **Touch-Friendly**: 44px+ touch targets
- 🌊 **Smooth Transitions**: Gentle, smooth animations

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
- **Export**: Download as a JSON file
- **Import**: Restore from an uploaded JSON file

---

## 🎯 Code Style

### Clean Code Rules
1. **No Semicolons**: Automatically removed by ESLint
2. **clsx Array Syntax**: For improved readability
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
