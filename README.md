# 🛒 Grocery Bud

A modern, glassmorphism-styled grocery list app built with React, TypeScript, and Vite. Add items with categories, mark them as purchased, edit inline, filter, and toggle between light/dark/system themes — all persisted to localStorage.

## ✨ Features

- **Add items** with 7 categories (Produce, Dairy, Bakery, Drinks, Snacks, Home, Other)
- **Mark as purchased** with a single click — completed items move to the bottom
- **Inline editing** — double-click or tap the edit icon to rename items
- **Search** by name and **filter** by category chip
- **Dark mode** with light/dark/system preference, no flash on refresh
- **Persistent storage** — items and theme survive page reloads via `localStorage`
- **Toast notifications** for add, edit, delete, and clear actions
- **Responsive** layout — works on desktop and mobile
- **Accessible** — proper ARIA roles, keyboard navigation, reduced motion support

## 🧱 Tech Stack

| Layer      | Technology                                                                          |
| ---------- | ----------------------------------------------------------------------------------- |
| Framework  | [React 19](https://react.dev)                                                       |
| Language   | [TypeScript 6](https://www.typescriptlang.org)                                      |
| Build tool | [Vite 8](https://vite.dev)                                                          |
| Icons      | [react-icons](https://react-icons.github.io/react-icons)                            |
| Toasts     | [react-toastify](https://fkhadra.github.io/react-toastify)                          |
| Linting    | [ESLint 10](https://eslint.org) + [Prettier](https://prettier.io)                   |
| Git hooks  | [Husky](https://typicode.github.io/husky) + [commitlint](https://commitlint.js.org) |

## 📂 Project Structure

```
grocery-bud/
├── index.html                     # Anti-flash dark mode script + entry point
├── src/
│   ├── App.tsx                    # Top-level shell: state, filtering, CRUD handlers
│   ├── main.tsx                   # React root mount
│   ├── index.css                  # All styles — tokens, glass card, responsive
│   ├── types/
│   │   └── index.ts              # Item, CategoryMeta, ThemePreference types + constants
│   ├── hooks/
│   │   ├── useLocalStorage.ts    # Generic localStorage-backed useState
│   │   └── useDarkMode.ts        # Light / dark / system theme hook
│   └── components/
│       ├── Header.tsx            # Title, theme toggle, item counters
│       ├── AddForm.tsx           # New item input + category chip picker
│       ├── CategoryChip.tsx      # Reusable chip button (SSOT for chips)
│       ├── CategoryFilter.tsx    # Search bar + category filter tabs
│       ├── List.tsx              # Item list with purchase toggle + inline edit
│       └── EmptyState.tsx        # Placeholder when list is empty or filtered
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── .prettierrc.json
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18 (check `.nvmrc`)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` by default.

### Build

```bash
npm run build      # typecheck + production build
npm run preview    # preview the production build locally
```

### Lint & Format

```bash
npm run lint            # ESLint (max warnings 0)
npm run format          # Prettier write
npm run format:check    # Prettier dry-run
```

## 🎨 Design Tokens

The entire UI is driven by CSS custom properties defined in `:root` and `[data-theme="dark"]`. Key token families:

- **Spacing:** `--space-1` … `--space-8`
- **Radius:** `--r-sm`, `--r-md`, `--r-lg`, `--r-xl`, `--r-pill`
- **Motion:** `--motion-fast` (120ms), `--motion` (200ms), `--motion-slow` (320ms)
- **Palette:** `--bg-base`, `--surface`, `--text`, `--accent`, `--success`, `--danger`

The glassmorphism card uses `backdrop-filter: blur(16px)` with translucent backgrounds for a modern, layered look on both light and dark themes.

## 🏗️ Architecture Decisions

- **DRY / SSOT:** The `CategoryChip` component is the single source of truth for category chip rendering, used by both `AddForm` and `CategoryFilter`. The localStorage theme key is synced between `index.html` (inline script) and `useDarkMode.ts`.
- **No CSS framework:** All styles are hand-written CSS custom properties — no Tailwind, no runtime CSS-in-JS overhead.
- **Generic `useLocalStorage` hook:** Type-safe, handles serialization errors, reusable for any persisted state.
- **Dark mode anti-flash:** An inline `<script>` + `<style>` in `index.html` applies the correct background and text color before React or external CSS loads, eliminating the white flash on refresh.
