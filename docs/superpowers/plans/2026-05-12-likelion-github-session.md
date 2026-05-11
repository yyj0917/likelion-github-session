# 멋쟁이사자처럼 GitHub 세션 사이트 — 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. 본 프로젝트는 Sonnet 서브에이전트를 비중첩 파일 스코프로 병렬 디스패치한다 (메모리 `feedback_implementation_subagents.md`).

**Goal:** Vite + React 19 + TypeScript + Tailwind 4 기반 단일 페이지 교육 사이트와 의도된 conflict가 발생하는 멋사 랜딩페이지를 하나의 레포에 구현한다. `/`는 짝 실습 대상, `/guide` `/commands` `/practice`는 교육 콘텐츠.

**Architecture:** React Router 7 기반 4-route SPA. 짝이 작업할 파일과 만지지 말아야 할 파일은 `_protected/` 폴더 명명 + 파일 상단 주석으로 명시. TOUCH 파일들(`data/`, `styles/tokens.css`, `routes/landing/**`)에는 conflict 유발용 안내 주석이 같은 위치를 가리키도록 심어둔다.

**Tech Stack:** Vite 6 · React 19 · TypeScript 5.7+ · Tailwind CSS 4 · React Router 7 · Shiki · Framer Motion 12 · pnpm.

**Subagent 분담 (참고)**

| 에이전트 | 태스크 |
|---|---|
| A | Task 1·2·3 (셋업) |
| B | Task 4·5·6 (protected 코어: tokens + router + layout) |
| C | Task 7 (TOUCH 데이터 파일) |
| D | Task 8 (landing components) |
| E | Task 9·10 (guide 데이터 + 컴포넌트) |
| F | Task 11·12 (commands 데이터 + 페이지) |
| G | Task 13·14 (practice 데이터 + 페이지) |
| H | Task 15·16 (README + CI + 최종 빌드) |

Phase 0 (Task 1~6)는 순차, Phase 1(Task 7)도 순차, Phase 2(Task 8~14)는 병렬, Phase 3(Task 15~16)은 순차.

---

## Task 1: pnpm + Vite 프로젝트 셋업

**Files:**
- Create: `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `.gitignore`

- [ ] **Step 1: Vite 템플릿으로 초기화**

```bash
cd /Users/yun-yeongjun/likelion-github-session
pnpm create vite@latest . --template react-ts
```

프롬프트에서 현재 디렉토리에 빈 파일(`docs/`)이 있어도 진행 선택.

- [ ] **Step 2: 의존성 설치**

```bash
pnpm install
```

- [ ] **Step 3: 최신 메이저 버전 확인 및 업그레이드**

`package.json`을 열어 React가 19.x, TypeScript가 5.7+ 인지 확인. 아니면:

```bash
pnpm add react@latest react-dom@latest
pnpm add -D typescript@latest @types/react@latest @types/react-dom@latest
```

- [ ] **Step 4: dev 서버 동작 검증**

```bash
pnpm dev
```

브라우저에서 `http://localhost:5173` 접속하여 기본 Vite + React 화면 확인. 확인 후 `Ctrl+C`.

- [ ] **Step 5: `.gitignore`에 누락 항목 추가**

기존 `.gitignore` 끝에 다음이 없으면 추가:

```
node_modules
dist
dist-ssr
*.local
.DS_Store
.vscode/*
!.vscode/extensions.json
```

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "chore: bootstrap vite + react + ts project"
```

---

## Task 2: Tailwind CSS 4 설정

**Files:**
- Modify: `vite.config.ts`, `src/main.tsx`
- Create: `src/styles/global.css`

- [ ] **Step 1: Tailwind v4 + Vite 플러그인 설치**

```bash
pnpm add -D tailwindcss@next @tailwindcss/vite
```

- [ ] **Step 2: `vite.config.ts`에 플러그인 추가**

`vite.config.ts` 전체를 다음으로 교체:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 3: `src/styles/global.css` 생성**

Vite 템플릿이 만든 `src/index.css`를 `src/styles/global.css`로 이동:

```bash
mkdir -p src/styles
mv src/index.css src/styles/global.css
```

`src/styles/global.css` 내용을 다음으로 교체:

```css
@import "tailwindcss";

:root {
  font-family: 'Pretendard', system-ui, -apple-system, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

html,
body,
#root {
  min-height: 100%;
  background: var(--color-bg, #0a0a0a);
  color: var(--color-fg, #f5f5f5);
}
```

- [ ] **Step 4: `src/main.tsx`에서 import 경로 갱신**

`src/main.tsx`의 `import './index.css'`를 `import './styles/global.css'`로 변경.

- [ ] **Step 5: 동작 확인**

```bash
pnpm dev
```

다크 배경 + 흰 텍스트 확인. `Ctrl+C`.

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "chore: add tailwindcss 4 with vite plugin"
```

---

## Task 3: ESLint + Prettier + 스크립트 정리

**Files:**
- Create: `.prettierrc.json`, `.prettierignore`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Prettier 의존성 설치**

```bash
pnpm add -D prettier
```

- [ ] **Step 2: `.prettierrc.json` 생성**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

- [ ] **Step 3: `.prettierignore` 생성**

```
node_modules
dist
pnpm-lock.yaml
*.md
```

- [ ] **Step 4: `package.json` scripts 정리**

`package.json`의 `scripts`를 다음으로 교체(기존 dev/build/preview/lint는 유지):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc -b --noEmit"
  }
}
```

- [ ] **Step 5: 린트·포맷·타입 통과 확인**

```bash
pnpm lint && pnpm typecheck && pnpm format:check
```

실패하면 `pnpm lint:fix && pnpm format`으로 자동 수정 후 재실행.

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "chore: add prettier and lint/format scripts"
```

---

## Task 4: 디자인 토큰 (TOUCH 시작점)

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `src/styles/global.css`

> 짝이 작업하는 TOUCH 파일. conflict 시나리오 3의 무대.

- [ ] **Step 1: `src/styles/tokens.css` 생성**

```css
/* 🎨 TOUCH: 짝이 자유롭게 색상·간격·반지름을 바꾸며 멋사 랜딩페이지를 꾸미는 파일입니다.
   짝 A와 B가 동시에 같은 변수를 다른 값으로 바꾸면 conflict가 발생합니다 (의도된 시나리오). */

:root {
  /* ── 브랜드 ── */
  --color-brand: #ff6b00;
  --color-accent: #00d4ff;

  /* ── 표면 ── */
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --color-fg: #f5f5f5;
  --color-muted: #888;

  /* ── 라인 / 카드 ── */
  --color-border: rgba(255, 255, 255, 0.08);
  --radius-card: 16px;
  --radius-sm: 8px;

  /* ── 타이포 ── */
  --font-display: 'Pretendard', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* ── 모션 ── */
  --duration-fast: 150ms;
  --duration-normal: 280ms;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme='light'] {
  --color-bg: #fafafa;
  --color-surface: #ffffff;
  --color-fg: #1a1a1a;
  --color-muted: #666;
  --color-border: rgba(0, 0, 0, 0.08);
}
```

- [ ] **Step 2: `src/styles/global.css`에 토큰 import 추가**

`@import "tailwindcss";` 다음 줄에 추가:

```css
@import "tailwindcss";
@import "./tokens.css";
```

- [ ] **Step 3: 검증**

```bash
pnpm dev
```

다크 배경(`#0a0a0a`) 확인. `Ctrl+C`.

- [ ] **Step 4: 커밋**

```bash
git add src/styles/tokens.css src/styles/global.css
git commit -m "feat(styles): add design tokens for landing customization"
```

---

## Task 5: Router + Layout + Nav (Protected Core)

**Files:**
- Create: `src/_protected/Router.tsx`, `src/_protected/components/Layout.tsx`, `src/_protected/components/Nav.tsx`, `src/_protected/components/ThemeToggle.tsx`, `src/_protected/hooks/useTheme.ts`

- [ ] **Step 1: React Router 7 설치**

```bash
pnpm add react-router
```

- [ ] **Step 2: `src/_protected/Router.tsx`**

```tsx
// 🔒 DO NOT TOUCH: 라우터 정의. 학생이 만지면 사이트가 깨집니다.
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from './components/Layout';
import { LandingPage } from '../routes/landing/LandingPage';
import { GuidePage } from '../routes/guide/GuidePage';
import { CommandsPage } from '../routes/commands/CommandsPage';
import { PracticePage } from '../routes/practice/PracticePage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/guide', element: <GuidePage /> },
      { path: '/commands', element: <CommandsPage /> },
      { path: '/practice', element: <PracticePage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
```

- [ ] **Step 3: `src/_protected/hooks/useTheme.ts`**

```ts
// 🔒 DO NOT TOUCH
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'mlh-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored ?? 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
  };
}
```

- [ ] **Step 4: `src/_protected/components/ThemeToggle.tsx`**

```tsx
// 🔒 DO NOT TOUCH
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="rounded-full border border-white/10 px-3 py-1.5 text-sm transition hover:bg-white/5"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

- [ ] **Step 5: `src/_protected/components/Nav.tsx`**

```tsx
// 🔒 DO NOT TOUCH
import { NavLink } from 'react-router';
import { ThemeToggle } from './ThemeToggle';

const items = [
  { to: '/', label: '랜딩' },
  { to: '/guide', label: '가이드' },
  { to: '/commands', label: '명령어' },
  { to: '/practice', label: '실습' },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[color:var(--color-bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="font-semibold tracking-tight">
          <span className="text-[color:var(--color-brand)]">멋사</span> Frontend
        </NavLink>
        <ul className="flex items-center gap-1">
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                end={it.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm transition ${
                    isActive
                      ? 'bg-white/10 text-[color:var(--color-fg)]'
                      : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]'
                  }`
                }
              >
                {it.label}
              </NavLink>
            </li>
          ))}
          <li className="ml-2">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
```

- [ ] **Step 6: `src/_protected/components/Layout.tsx`**

```tsx
// 🔒 DO NOT TOUCH
import { Outlet } from 'react-router';
import { Nav } from './Nav';

export function Layout() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Outlet />
      </main>
      <footer className="mt-24 border-t border-white/10 py-8 text-center text-sm text-[color:var(--color-muted)]">
        멋쟁이사자처럼 연세 프론트엔드 · GitHub 협업 세션 2026
      </footer>
    </div>
  );
}
```

- [ ] **Step 7: 커밋**

```bash
git add src/_protected
git commit -m "feat(core): add router, layout, nav, theme toggle"
```

---

## Task 6: App.tsx + placeholder 라우트 페이지

**Files:**
- Modify: `src/App.tsx`, `src/main.tsx`
- Create: `src/routes/landing/LandingPage.tsx`, `src/routes/guide/GuidePage.tsx`, `src/routes/commands/CommandsPage.tsx`, `src/routes/practice/PracticePage.tsx`

- [ ] **Step 1: `src/App.tsx` 교체**

```tsx
// 🔒 DO NOT TOUCH
import { AppRouter } from './_protected/Router';

function App() {
  return <AppRouter />;
}

export default App;
```

- [ ] **Step 2: `src/main.tsx` 상단에 주석 추가**

기존 내용은 그대로 두고 첫 줄에:

```tsx
// 🔒 DO NOT TOUCH
```

- [ ] **Step 3: 4개 placeholder 페이지 생성**

`src/routes/landing/LandingPage.tsx`:

```tsx
// 🎨 TOUCH: 짝이 꾸미는 랜딩페이지 컨테이너. Task 8에서 섹션들로 채워집니다.
export function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-bold">랜딩 (Task 8에서 완성)</h1>
    </div>
  );
}
```

`src/routes/guide/GuidePage.tsx`:

```tsx
// 🔒 DO NOT TOUCH
export function GuidePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-bold">Guide (Task 10에서 완성)</h1>
    </div>
  );
}
```

`src/routes/commands/CommandsPage.tsx`:

```tsx
// 🔒 DO NOT TOUCH
export function CommandsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-bold">Commands (Task 12에서 완성)</h1>
    </div>
  );
}
```

`src/routes/practice/PracticePage.tsx`:

```tsx
// 🔒 DO NOT TOUCH
export function PracticePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-bold">Practice (Task 14에서 완성)</h1>
    </div>
  );
}
```

- [ ] **Step 4: 4개 라우트 시각 확인**

```bash
pnpm dev
```

`/`, `/guide`, `/commands`, `/practice` 모두 정상 렌더. `Ctrl+C`.

- [ ] **Step 5: typecheck + lint 통과**

```bash
pnpm typecheck && pnpm lint
```

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "feat(core): wire router with placeholder route pages"
```

---

## Task 7: TOUCH 데이터 파일 (충돌 anchor)

**Files:**
- Create: `src/data/copy.ts`, `src/data/members.ts`, `src/_protected/data/types.ts`

> 짝이 작업하는 TOUCH 파일. conflict 시나리오 1·2의 무대.

- [ ] **Step 1: `src/_protected/data/types.ts`**

```ts
// 🔒 DO NOT TOUCH
export interface Member {
  name: string;
  role: string;
  bio: string;
  emoji?: string;
}
```

- [ ] **Step 2: `src/data/copy.ts`**

```ts
// 🎨 TOUCH: 사이트의 텍스트 카피를 모은 파일.
// 짝 A와 B가 동시에 HERO_TITLE을 서로 다른 문구로 바꾸면 conflict가 발생합니다 (시나리오 2).

export const HERO_TITLE = '멋쟁이사자처럼 프론트엔드';
export const HERO_SUBTITLE =
  '함께 만들고, 같이 PR을 날리고, 충돌을 해결하면서 자라는 동아리.';
export const HERO_CTA = '활동 보러가기';

export const ABOUT_HEADLINE = '코드로 함께 자라는 사람들';
export const ABOUT_BODY =
  '멋쟁이사자처럼은 누구나 시작할 수 있고, 누구와도 협업할 수 있는 프론트엔드 동아리입니다. 우리는 PR을 두려워하지 않습니다.';

export const FOOTER_TAGLINE = '© Likelion Yonsei Frontend';
```

- [ ] **Step 3: `src/data/members.ts`**

```ts
// 🎨 TOUCH: 동아리원 카드 데이터.
// ⭐ 짝 A와 B는 둘 다 아래 안내 주석 바로 위 라인에 본인 카드를 추가하세요.
// 같은 위치에 두 사람이 동시에 push하기 때문에 conflict가 100% 발생합니다 (시나리오 1).

import type { Member } from '../_protected/data/types';

export const members: Member[] = [
  {
    name: '윤영준',
    role: '운영진',
    bio: '협업 세션 호스트. PR 충돌도 즐겁게.',
    emoji: '🦁',
  },
  {
    name: '홍길동',
    role: '운영진',
    bio: '문서·온보딩 담당. 처음 오는 분 환영합니다.',
    emoji: '📘',
  },
  // 👇 여기에 본인 카드를 추가하세요 (짝 둘 다 이 라인 바로 위에 push)
];
```

- [ ] **Step 4: typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 5: 커밋**

```bash
git add src/data src/_protected/data
git commit -m "feat(data): seed members and copy with conflict anchors"
```

---

## Task 8: 랜딩 페이지 컴포넌트 (TOUCH 영역)

**Files:**
- Create: `src/routes/landing/Hero.tsx`, `About.tsx`, `Members.tsx`, `Activities.tsx`, `LandingFooter.tsx`
- Modify: `src/routes/landing/LandingPage.tsx`

- [ ] **Step 1: `src/routes/landing/Hero.tsx`**

```tsx
// 🎨 TOUCH: Hero 섹션. 짝이 카피·CTA·배경을 꾸미는 곳.
import { HERO_TITLE, HERO_SUBTITLE, HERO_CTA } from '../../data/copy';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 30%, color-mix(in oklab, var(--color-brand) 40%, transparent), transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-32 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          <span className="text-[color:var(--color-brand)]">{HERO_TITLE}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[color:var(--color-muted)]">
          {HERO_SUBTITLE}
        </p>
        <a
          href="#about"
          className="mt-10 inline-flex items-center rounded-full bg-[color:var(--color-brand)] px-6 py-3 font-medium text-black transition hover:scale-[1.02]"
        >
          {HERO_CTA} →
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `src/routes/landing/About.tsx`**

```tsx
// 🎨 TOUCH: About 섹션.
import { ABOUT_HEADLINE, ABOUT_BODY } from '../../data/copy';

const stats = [
  { value: '50+', label: '동아리원' },
  { value: '12', label: '진행 프로젝트' },
  { value: '∞', label: 'PR 머지' },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-semibold sm:text-4xl">{ABOUT_HEADLINE}</h2>
      <p className="mt-4 max-w-2xl text-[color:var(--color-muted)]">{ABOUT_BODY}</p>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6"
          >
            <div className="text-4xl font-bold text-[color:var(--color-brand)]">{s.value}</div>
            <div className="mt-2 text-sm text-[color:var(--color-muted)]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `src/routes/landing/Members.tsx`**

```tsx
// 🎨 TOUCH: Members 섹션. 데이터는 src/data/members.ts에서.
import { members } from '../../data/members';

export function Members() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-semibold">멤버 소개</h2>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        members.ts에 본인 카드를 추가하면 여기 나타납니다.
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, i) => (
          <li
            key={`${m.name}-${i}`}
            className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 transition hover:-translate-y-0.5"
          >
            <div className="text-3xl">{m.emoji ?? '🦁'}</div>
            <div className="mt-3 font-semibold">{m.name}</div>
            <div className="text-xs uppercase tracking-wider text-[color:var(--color-brand)]">
              {m.role}
            </div>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">{m.bio}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: `src/routes/landing/Activities.tsx`**

```tsx
// 🎨 TOUCH: 활동 섹션.
const activities = [
  { title: '주간 코드 리뷰', body: '서로의 PR을 리뷰하며 시야를 넓힙니다.' },
  { title: '해커톤', body: '학기마다 한 번, 짝과 함께 24시간 만에 결과물.' },
  { title: '오픈소스 기여', body: '실제 프로젝트에 PR을 날려봅니다.' },
];

export function Activities() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-semibold">우리가 하는 일</h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {activities.map((a) => (
          <article
            key={a.title}
            className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-6"
          >
            <h3 className="text-xl font-semibold">{a.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">{a.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: `src/routes/landing/LandingFooter.tsx`**

```tsx
// 🎨 TOUCH: 랜딩 푸터.
import { FOOTER_TAGLINE } from '../../data/copy';

const socials = [
  { label: 'GitHub', href: 'https://github.com/likelion-yonsei' },
  { label: 'Instagram', href: 'https://instagram.com' },
];

export function LandingFooter() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-[color:var(--color-muted)]">{FOOTER_TAGLINE}</p>
        <ul className="flex gap-4">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[color:var(--color-muted)] transition hover:text-[color:var(--color-fg)]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: `src/routes/landing/LandingPage.tsx` 조립**

```tsx
// 🎨 TOUCH: 랜딩페이지 컨테이너. 섹션 순서를 바꿔도 좋습니다.
import { Hero } from './Hero';
import { About } from './About';
import { Members } from './Members';
import { Activities } from './Activities';
import { LandingFooter } from './LandingFooter';

export function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Members />
      <Activities />
      <LandingFooter />
    </>
  );
}
```

- [ ] **Step 7: 시각 확인**

```bash
pnpm dev
```

`/` 라우트에 5개 섹션 + 다크/라이트 토글 확인. `Ctrl+C`.

- [ ] **Step 8: 커밋**

```bash
git add src/routes/landing
git commit -m "feat(landing): build hero, about, members, activities, footer"
```

---

## Task 9: Guide 콘텐츠 데이터

**Files:**
- Create: `src/_protected/data/guide-content.ts`

- [ ] **Step 1: `src/_protected/data/guide-content.ts`**

```ts
// 🔒 DO NOT TOUCH
export interface BranchStep {
  id: number;
  label: string;
  description: string;
  fileState: string;
  branch: 'main' | 'A' | 'B' | 'merged' | 'conflict';
}

export const branchTimeline: BranchStep[] = [
  {
    id: 1,
    label: '시작',
    description: '두 사람이 같은 main 브랜치에서 출발합니다.',
    branch: 'main',
    fileState: `export const HERO_TITLE = '멋사 프론트엔드';`,
  },
  {
    id: 2,
    label: '분기',
    description: '각자 자기 브랜치를 만듭니다 (feat/hero-A, feat/hero-B).',
    branch: 'main',
    fileState: `export const HERO_TITLE = '멋사 프론트엔드';`,
  },
  {
    id: 3,
    label: 'A가 수정',
    description: '짝 A는 같은 라인을 자기 식으로 바꿉니다.',
    branch: 'A',
    fileState: `export const HERO_TITLE = '멋쟁이사자처럼 연세';`,
  },
  {
    id: 4,
    label: 'B가 수정',
    description: '짝 B도 같은 라인을 다르게 바꿉니다.',
    branch: 'B',
    fileState: `export const HERO_TITLE = 'Likelion Yonsei Frontend';`,
  },
  {
    id: 5,
    label: '머지 시도',
    description: 'A가 먼저 머지된 후, B가 머지를 시도하면…',
    branch: 'conflict',
    fileState: `<<<<<<< HEAD
export const HERO_TITLE = '멋쟁이사자처럼 연세';
=======
export const HERO_TITLE = 'Likelion Yonsei Frontend';
>>>>>>> feat/hero-B`,
  },
  {
    id: 6,
    label: '해결 후 머지',
    description: '두 사람이 의논해서 합의된 문구로 통합합니다.',
    branch: 'merged',
    fileState: `export const HERO_TITLE = '멋쟁이사자처럼 연세 · Likelion Yonsei';`,
  },
];

export interface ConflictType {
  title: string;
  subtitle: string;
  example: string;
  takeaway: string;
}

export const conflictTypes: ConflictType[] = [
  {
    title: '같은 라인',
    subtitle: '가장 흔한 경우',
    example: `<<<<<<< HEAD
const title = 'A';
=======
const title = 'B';
>>>>>>> branch`,
    takeaway: 'Git이 어느 쪽을 살릴지 모르므로 사람이 결정해야 합니다.',
  },
  {
    title: '인접 라인',
    subtitle: 'Git이 헷갈리는 경우',
    example: `// A가 추가한 줄
// B가 추가한 줄
// 같은 영역 → 충돌`,
    takeaway: '두 줄이 떨어져 있어도 Git은 같은 hunk로 묶을 수 있습니다.',
  },
  {
    title: '파일 삭제 + 수정',
    subtitle: '당황하는 경우',
    example: `A: 파일 삭제
B: 같은 파일 수정
→ "delete/modify" conflict`,
    takeaway: '삭제할지 살릴지 결정한 뒤 git rm 또는 git add로 해결.',
  },
];
```

- [ ] **Step 2: typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: 커밋**

```bash
git add src/_protected/data/guide-content.ts
git commit -m "feat(guide): seed branch timeline and conflict type data"
```

---

## Task 10: Guide 시각화 컴포넌트 + 페이지

**Files:**
- Create: `src/_protected/components/CodePanel.tsx`, `BranchDiagram.tsx`, `ConflictMarkerExplainer.tsx`
- Modify: `src/routes/guide/GuidePage.tsx`

- [ ] **Step 1: Shiki + Framer Motion 설치**

```bash
pnpm add shiki framer-motion
```

- [ ] **Step 2: `src/_protected/components/CodePanel.tsx`**

```tsx
// 🔒 DO NOT TOUCH
import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

export function CodePanel({ code, lang = 'ts' }: { code: string; lang?: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code, { lang, theme: 'github-dark-dimmed' }).then((out) => {
      if (!cancelled) setHtml(out);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-black/40">
      <div className="flex gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-yellow-500/70" />
        <span className="size-2.5 rounded-full bg-green-500/70" />
      </div>
      <div
        className="p-4 text-sm [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
```

- [ ] **Step 3: `src/_protected/components/BranchDiagram.tsx`**

```tsx
// 🔒 DO NOT TOUCH
import { useState } from 'react';
import { motion } from 'framer-motion';
import { branchTimeline } from '../data/guide-content';
import { CodePanel } from './CodePanel';

const colorFor = (b: string) =>
  b === 'A' ? '#22d3ee' : b === 'B' ? '#c084fc' : b === 'conflict' ? '#ef4444' : '#f5f5f5';

export function BranchDiagram() {
  const [idx, setIdx] = useState(0);
  const step = branchTimeline[idx];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-6">
          <ol className="space-y-3">
            {branchTimeline.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setIdx(i)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition ${
                    i === idx ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span
                    aria-hidden
                    className="inline-block size-2.5 rounded-full"
                    style={{ background: colorFor(s.branch) }}
                  />
                  <span className="font-medium">{s.label}</span>
                  <span className="text-[color:var(--color-muted)]">{s.description}</span>
                </button>
              </li>
            ))}
          </ol>
          <input
            type="range"
            min={0}
            max={branchTimeline.length - 1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="mt-6 w-full"
            aria-label="타임라인 스크러버"
          />
        </div>
      </div>
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <CodePanel code={step.fileState} />
        {step.branch === 'conflict' && (
          <p className="mt-4 text-sm font-medium text-red-400">
            💥 Conflict 발생 — 마커 사이의 두 버전 중에서 사람이 결정해야 합니다.
          </p>
        )}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 4: `src/_protected/components/ConflictMarkerExplainer.tsx`**

```tsx
// 🔒 DO NOT TOUCH
const segments = [
  { label: '<<<<<<< HEAD', tone: 'amber', note: '현재 체크아웃된 브랜치 (내 쪽)' },
  { label: "const title = '멋사';", tone: 'plain', note: '내 쪽 변경 내용' },
  { label: '=======', tone: 'slate', note: '두 버전의 구분선' },
  { label: "const title = 'Likelion';", tone: 'plain', note: '들어오는 쪽 변경 내용' },
  { label: '>>>>>>> feat/hero', tone: 'violet', note: '들어오는 브랜치 이름' },
];

const toneClass: Record<string, string> = {
  amber: 'bg-amber-500/20 text-amber-300',
  slate: 'bg-slate-500/20 text-slate-300',
  violet: 'bg-violet-500/20 text-violet-300',
  plain: 'bg-white/5 text-[color:var(--color-fg)]',
};

export function ConflictMarkerExplainer() {
  return (
    <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-6">
      <h3 className="text-xl font-semibold">Conflict 마커 해부</h3>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        에디터에서 conflict가 나면 다음과 같은 마커가 등장합니다.
      </p>
      <ul className="mt-6 space-y-2 font-mono text-sm">
        {segments.map((s) => (
          <li
            key={s.label}
            className={`flex flex-col gap-1 rounded-md px-3 py-2 sm:flex-row sm:items-center sm:justify-between ${toneClass[s.tone]}`}
          >
            <code>{s.label}</code>
            <span className="text-xs opacity-80">{s.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 5: `src/routes/guide/GuidePage.tsx`**

```tsx
// 🔒 DO NOT TOUCH
import { BranchDiagram } from '../../_protected/components/BranchDiagram';
import { ConflictMarkerExplainer } from '../../_protected/components/ConflictMarkerExplainer';
import { conflictTypes } from '../../_protected/data/guide-content';
import { CodePanel } from '../../_protected/components/CodePanel';

export function GuidePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <p className="text-sm uppercase tracking-wider text-[color:var(--color-brand)]">Guide</p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">왜 conflict가 나는가</h1>
        <p className="mt-4 text-[color:var(--color-muted)]">
          분기 → 양쪽 수정 → 머지 시도 → 충돌. 단계를 직접 따라가 보세요.
        </p>
      </header>

      <section className="mt-16">
        <BranchDiagram />
      </section>

      <section className="mt-24">
        <ConflictMarkerExplainer />
      </section>

      <section className="mt-24">
        <h2 className="text-2xl font-semibold">3가지 충돌 유형</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {conflictTypes.map((c) => (
            <article
              key={c.title}
              className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-6"
            >
              <header>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
                  {c.subtitle}
                </p>
              </header>
              <CodePanel code={c.example} lang="diff" />
              <p className="text-sm text-[color:var(--color-muted)]">{c.takeaway}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 6: 시각 점검**

```bash
pnpm dev
```

`/guide`에서 타임라인 스크러버, 마커 해부, 3유형 카드 동작 확인. `Ctrl+C`.

- [ ] **Step 7: 커밋**

```bash
git add -A
git commit -m "feat(guide): build branch diagram, marker explainer, conflict types"
```

---

## Task 11: Commands 데이터

**Files:**
- Create: `src/_protected/data/commands.ts`

- [ ] **Step 1: `src/_protected/data/commands.ts`**

```ts
// 🔒 DO NOT TOUCH
export interface CommandRecipe {
  id: string;
  emoji: string;
  situation: string;
  command: string;
  steps: string[];
  danger?: string;
  recovery?: string;
}

export const commands: CommandRecipe[] = [
  {
    id: 'merge-conflict',
    emoji: '💥',
    situation: '지금 막 PR에서 conflict 났어요',
    command: `git switch main
git pull origin main
git switch <내-브랜치>
git merge main
# 에디터에서 마커 해결
git add .
git commit
git push`,
    steps: [
      'main을 최신 상태로 가져옵니다.',
      '내 브랜치로 돌아와 main을 머지합니다.',
      '에디터에 등장한 conflict 마커를 직접 편집해 해결합니다.',
      '`git add`로 해결됐다고 알린 뒤 commit + push.',
    ],
    recovery: '`git merge --abort`로 머지 전 상태로 돌아갈 수 있어요.',
  },
  {
    id: 'rebase',
    emoji: '🔄',
    situation: '내 브랜치를 최신 main 위에 올리고 싶어요',
    command: `git switch <내-브랜치>
git fetch origin
git rebase origin/main
# 충돌 발생 시 해결 → git add → git rebase --continue
git push --force-with-lease`,
    steps: [
      'origin의 최신 main을 받아옵니다.',
      'rebase로 내 커밋들을 최신 main 위에 다시 쌓습니다.',
      '도중에 충돌이 나면 해결 후 `git rebase --continue`.',
      '히스토리가 바뀌었으니 `--force-with-lease`로 안전하게 push.',
    ],
    danger: '`git push --force`는 짝의 작업을 덮어쓸 수 있어요. 반드시 `--force-with-lease`.',
    recovery: '`git rebase --abort`로 rebase 시작 전으로 돌아갑니다.',
  },
  {
    id: 'reflog',
    emoji: '⏪',
    situation: '방금 reset 잘못 했어요!! 작업이 사라졌어요',
    command: `git reflog
# 잃어버린 커밋의 hash를 찾아서
git reset --hard <hash>`,
    steps: [
      '`git reflog`는 최근 HEAD 이동을 모두 기록한 비밀 일지입니다.',
      '잃어버렸다고 생각한 커밋의 hash를 찾습니다.',
      '`git reset --hard <hash>`로 그 시점으로 돌아갑니다.',
    ],
    danger: 'reflog는 영원하지 않습니다 (기본 90일). 사고가 나면 즉시 복구하세요.',
  },
  {
    id: 'cherry-pick',
    emoji: '🍒',
    situation: '다른 브랜치의 그 커밋 하나만 가져오고 싶어요',
    command: `git switch <내-브랜치>
git cherry-pick <hash>`,
    steps: [
      '가져올 커밋의 hash를 `git log`로 찾습니다.',
      '내 브랜치에서 `git cherry-pick <hash>` 실행.',
      '충돌이 나면 해결 후 `git cherry-pick --continue`.',
    ],
    recovery: '`git cherry-pick --abort`로 취소.',
  },
  {
    id: 'switch',
    emoji: '🔀',
    situation: '브랜치 옮기고 싶어요. switch와 checkout 차이가 뭐예요?',
    command: `git switch <브랜치>           # 이동
git switch -c <새-브랜치>     # 새로 만들면서 이동`,
    steps: [
      '`git switch`는 "브랜치 이동"만 담당하는 새 명령어입니다 (Git 2.23+).',
      '`git checkout`은 브랜치 이동 + 파일 복원 둘 다 하는 만능 명령어라 헷갈리기 쉽습니다.',
      '입문자는 `switch`(브랜치) + `restore`(파일)로 나눠 쓰는 게 안전합니다.',
    ],
  },
  {
    id: 'force-with-lease',
    emoji: '⚠️',
    situation: 'force push 해도 돼요?',
    command: `git push --force-with-lease`,
    steps: [
      '평소엔 `--force` 대신 `--force-with-lease`를 씁니다.',
      'origin이 내가 받았던 상태와 같을 때만 덮어씁니다.',
      '짝이 그 사이에 push 했다면 거부되어 사고를 막아줍니다.',
    ],
    danger: '`--force`는 짝의 커밋도 무조건 덮어씁니다. 절대 main에는 쓰지 마세요.',
  },
];
```

- [ ] **Step 2: typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 3: 커밋**

```bash
git add src/_protected/data/commands.ts
git commit -m "feat(commands): seed situation-based command recipes"
```

---

## Task 12: Commands 페이지

**Files:**
- Create: `src/_protected/components/CommandCard.tsx`
- Modify: `src/routes/commands/CommandsPage.tsx`

- [ ] **Step 1: `src/_protected/components/CommandCard.tsx`**

```tsx
// 🔒 DO NOT TOUCH
import { useState } from 'react';
import type { CommandRecipe } from '../data/commands';
import { CodePanel } from './CodePanel';

export function CommandCard({ recipe }: { recipe: CommandRecipe }) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(recipe.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <article className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl">{recipe.emoji}</div>
          <h3 className="mt-2 text-lg font-semibold">{recipe.situation}</h3>
        </div>
        <button
          type="button"
          onClick={copyCommand}
          className="rounded-md border border-white/10 px-2.5 py-1 text-xs transition hover:bg-white/5"
        >
          {copied ? '복사됨 ✓' : '복사'}
        </button>
      </header>

      <div className="mt-4">
        <CodePanel code={recipe.command} lang="bash" />
      </div>

      <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-[color:var(--color-muted)]">
        {recipe.steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>

      {recipe.danger && (
        <p className="mt-4 rounded-md bg-red-500/10 px-3 py-2 text-xs text-red-300">
          ⚠️ {recipe.danger}
        </p>
      )}
      {recipe.recovery && (
        <p className="mt-2 rounded-md bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
          🔁 {recipe.recovery}
        </p>
      )}
    </article>
  );
}
```

- [ ] **Step 2: `src/routes/commands/CommandsPage.tsx`**

```tsx
// 🔒 DO NOT TOUCH
import { CommandCard } from '../../_protected/components/CommandCard';
import { commands } from '../../_protected/data/commands';

export function CommandsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <p className="text-sm uppercase tracking-wider text-[color:var(--color-brand)]">
          Commands
        </p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">상황별 플레이북</h1>
        <p className="mt-4 text-[color:var(--color-muted)]">
          외울 명령어 목록이 아니라, 닥쳤을 때 펼쳐 보는 처방전.
        </p>
      </header>
      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {commands.map((r) => (
          <CommandCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 시각 점검**

```bash
pnpm dev
```

`/commands` 6장 카드 + 복사 버튼 동작 확인. `Ctrl+C`.

- [ ] **Step 4: 커밋**

```bash
git add -A
git commit -m "feat(commands): build command cards page"
```

---

## Task 13: Practice 데이터 + Progress hook

**Files:**
- Create: `src/_protected/data/practice-steps.ts`, `src/_protected/hooks/useProgress.ts`

- [ ] **Step 1: `src/_protected/data/practice-steps.ts`**

```ts
// 🔒 DO NOT TOUCH
export interface PracticeStep {
  id: number;
  title: string;
  minutes: number;
  body: string;
  stuck: string;
}

export const practiceSteps: PracticeStep[] = [
  {
    id: 1,
    title: '셋업 확인',
    minutes: 5,
    body:
      '레포 클론 → `pnpm install` → `pnpm dev`. 짝이 둘 다 collaborator로 초대되어 있는지 GitHub Settings → Collaborators에서 확인하세요.',
    stuck:
      'pnpm이 없다면 `npm install -g pnpm`. Node 버전은 18 이상. dev 서버가 안 뜨면 포트 5173이 이미 사용 중인지 확인.',
  },
  {
    id: 2,
    title: '각자 브랜치 생성',
    minutes: 3,
    body:
      '짝 A: `git switch -c feat/hero-<이름>`. 짝 B: `git switch -c feat/footer-<이름>`. 이름은 영문 소문자로.',
    stuck:
      '`switch`는 Git 2.23+. 안 되면 `git checkout -b ...`. 브랜치 이름 오타나면 `git branch -m 새이름`.',
  },
  {
    id: 3,
    title: '본인 영역 수정 → commit → push',
    minutes: 10,
    body:
      'A는 `src/data/copy.ts`의 HERO_TITLE을 바꾸고 `src/data/members.ts`의 안내 주석 위에 본인 카드를 추가. B는 `src/routes/landing/LandingFooter.tsx`의 socials를 바꾸고 `members.ts`에도 본인 카드 추가. 각자 `git add → commit → push -u origin <브랜치>`.',
    stuck:
      'commit 메시지는 `feat: 내 카드 추가` 정도. push가 거부되면 origin에 같은 이름 브랜치가 있는지 확인.',
  },
  {
    id: 4,
    title: 'PR 생성 + 서로 리뷰 + 첫 PR 머지',
    minutes: 10,
    body:
      'GitHub에서 두 PR을 만들고 짝에게 리뷰 요청. 가위바위보로 정해서 한 쪽 PR을 먼저 머지합니다 (Squash and merge 권장).',
    stuck:
      'PR 설명에는 "어떤 변화"인지 한 줄. 리뷰는 한 줄짜리 코멘트로 충분합니다 (LGTM, 좋아요).',
  },
  {
    id: 5,
    title: '💥 conflict 발생 (라이브 시연)',
    minutes: 5,
    body:
      '두 번째 PR을 보세요. "This branch has conflicts that must be resolved" 메시지가 나타날 거예요. 사이트 `/guide`로 가서 마커 해부도를 다시 확인합니다.',
    stuck:
      '버튼이 안 보이면 짝의 PR이 정말 머지됐는지 main에서 확인. GitHub UI의 "Resolve conflicts"는 간단할 때만 쓰고, 본격적으로는 로컬에서.',
  },
  {
    id: 6,
    title: '로컬에서 해결 → push',
    minutes: 15,
    body:
      '`git switch main && git pull` → `git switch <내-브랜치>` → `git merge main` → 에디터에서 마커 해결 → `git add . && git commit && git push`. PR이 자동으로 머지 가능 상태가 됩니다.',
    stuck:
      '마커를 잘못 지웠다면 `git merge --abort`로 처음으로. 어떤 줄이 누구 것인지 모르겠으면 VS Code의 GitLens 활용.',
  },
  {
    id: 7,
    title: '보너스: rebase로 깔끔한 히스토리',
    minutes: 10,
    body:
      '동일 상황을 merge가 아니라 rebase로. 시나리오를 다시 만들고(양쪽 동시 수정 → A 머지) → B는 `git fetch && git rebase origin/main` → 충돌 해결 → `git add && git rebase --continue` → `git push --force-with-lease`. 히스토리가 일자로 깔끔해진 걸 확인.',
    stuck:
      'rebase 중 길을 잃었으면 `git rebase --abort`. force push는 반드시 `--force-with-lease`. main에는 절대 force하지 않습니다.',
  },
];
```

- [ ] **Step 2: `src/_protected/hooks/useProgress.ts`**

```ts
// 🔒 DO NOT TOUCH
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'mlh-practice-progress';

export function useProgress(total: number) {
  const [done, setDone] = useState<Set<number>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return new Set(raw ? (JSON.parse(raw) as number[]) : []);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(done)));
  }, [done]);

  function toggle(id: number) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return { done, toggle, completed: done.size, total };
}
```

- [ ] **Step 3: typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 4: 커밋**

```bash
git add src/_protected/data/practice-steps.ts src/_protected/hooks/useProgress.ts
git commit -m "feat(practice): seed steps data and progress hook"
```

---

## Task 14: Practice 페이지 + StepCard + 진행도

**Files:**
- Create: `src/_protected/components/StepCard.tsx`, `ProgressBadge.tsx`
- Modify: `src/routes/practice/PracticePage.tsx`

- [ ] **Step 1: `src/_protected/components/StepCard.tsx`**

```tsx
// 🔒 DO NOT TOUCH
import { useState } from 'react';
import type { PracticeStep } from '../data/practice-steps';

export function StepCard({
  step,
  isDone,
  onToggle,
}: {
  step: PracticeStep;
  isDone: boolean;
  onToggle: () => void;
}) {
  const [stuckOpen, setStuckOpen] = useState(false);

  return (
    <article
      className={`rounded-[var(--radius-card)] border p-6 transition ${
        isDone
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)]'
      }`}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-mono text-[color:var(--color-muted)]">Step {step.id}</span>
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <span className="text-xs text-[color:var(--color-muted)]">~ {step.minutes}분</span>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isDone}
            onChange={onToggle}
            className="size-4 accent-emerald-500"
          />
          완료
        </label>
      </header>

      <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-fg)]/90">{step.body}</p>

      <button
        type="button"
        onClick={() => setStuckOpen((v) => !v)}
        className="mt-4 text-xs font-medium text-[color:var(--color-brand)] hover:underline"
      >
        💡 {stuckOpen ? '접기' : '막혔어요'}
      </button>
      {stuckOpen && (
        <p className="mt-2 rounded-md bg-white/5 px-3 py-2 text-xs text-[color:var(--color-muted)]">
          {step.stuck}
        </p>
      )}
    </article>
  );
}
```

- [ ] **Step 2: `src/_protected/components/ProgressBadge.tsx`**

```tsx
// 🔒 DO NOT TOUCH
export function ProgressBadge({ completed, total }: { completed: number; total: number }) {
  return (
    <div className="fixed bottom-6 left-6 z-50 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-sm shadow-lg">
      <span className="text-[color:var(--color-muted)]">Practice</span>{' '}
      <span className="font-semibold">
        {completed}/{total}
      </span>
    </div>
  );
}
```

- [ ] **Step 3: `src/routes/practice/PracticePage.tsx`**

```tsx
// 🔒 DO NOT TOUCH
import { practiceSteps } from '../../_protected/data/practice-steps';
import { useProgress } from '../../_protected/hooks/useProgress';
import { StepCard } from '../../_protected/components/StepCard';
import { ProgressBadge } from '../../_protected/components/ProgressBadge';

export function PracticePage() {
  const { done, toggle, completed, total } = useProgress(practiceSteps.length);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header>
        <p className="text-sm uppercase tracking-wider text-[color:var(--color-brand)]">Practice</p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">짝 실습 walkthrough</h1>
        <p className="mt-4 text-[color:var(--color-muted)]">
          7단계를 차례로 따라가며 PR · conflict · 해결을 경험합니다. 좌하단 진행도는 자동 저장됩니다.
        </p>
      </header>

      <ol className="mt-12 space-y-4">
        {practiceSteps.map((s) => (
          <li key={s.id}>
            <StepCard step={s} isDone={done.has(s.id)} onToggle={() => toggle(s.id)} />
          </li>
        ))}
      </ol>

      <ProgressBadge completed={completed} total={total} />
    </div>
  );
}
```

- [ ] **Step 4: 시각 점검**

```bash
pnpm dev
```

`/practice` 7카드 + 막혔어요 토글 + 좌하단 배지 + 새로고침 후 체크 유지 확인. `Ctrl+C`.

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat(practice): build step cards with persisted progress"
```

---

## Task 15: README + 강사·학생 가이드

**Files:**
- Create: `README.md`, `INSTRUCTOR.md`, `STUDENT.md`

- [ ] **Step 1: `README.md`**

````markdown
# 멋쟁이사자처럼 GitHub 협업 세션

> 2026년 멋쟁이사자처럼 연세 프론트엔드 동아리원을 위한 **PR · conflict 해결 1회성 세션 자료**.

## 무엇을 할 건가요?

- 짝(2명)이 함께 멋사 프론트엔드 랜딩페이지를 꾸미면서 GitHub PR을 날리고, **의도된 conflict**를 만나서 해결해 봅니다.
- 사이트의 `/guide`에서 conflict 시각화, `/commands`에서 상황별 명령어, `/practice`에서 단계별 가이드를 봅니다.

## 시작하기

```bash
pnpm install
pnpm dev
```

브라우저: `http://localhost:5173`

## 짝과 같이 하기 (요약)

자세한 7단계는 사이트 `/practice` 참고.

1. 한 사람이 이 레포를 GitHub에 새 레포로 만들고 짝을 collaborator로 초대.
2. 둘 다 clone → 각자 브랜치 → 본인 영역 수정 → PR.
3. 첫 PR 머지 후 두 번째 PR에서 conflict 발생.
4. 로컬에서 해결 → push.
5. (보너스) rebase로 깔끔한 히스토리.

## 🎨 TOUCH vs 🔒 DO NOT TOUCH

| 만져도 되는 곳 (🎨) | 만지면 사이트가 깨지는 곳 (🔒) |
|---|---|
| `src/data/copy.ts` | `src/_protected/**` |
| `src/data/members.ts` ⭐ | `src/App.tsx`, `src/main.tsx` |
| `src/styles/tokens.css` | `src/routes/guide/**` |
| `src/routes/landing/**` | `src/routes/commands/**`, `src/routes/practice/**` |

⭐ 표시: 의도된 conflict 발생 지점.

## 강사·학생 가이드

- 강사: [INSTRUCTOR.md](./INSTRUCTOR.md)
- 학생: [STUDENT.md](./STUDENT.md)

## 기술 스택

Vite 6 · React 19 · TypeScript 5.7 · Tailwind CSS 4 · React Router 7 · Shiki · Framer Motion · pnpm.

## 라이선스

MIT
````

- [ ] **Step 2: `INSTRUCTOR.md`**

```markdown
# 강사 가이드

## 세션 전 준비 (D-1)

- [ ] 이 레포를 fork 또는 template으로 만들어 GitHub에 push.
- [ ] 짝을 정해서 짝마다 새 레포(예: `gh-session-team-01`)를 만들고 두 학생을 collaborator로 초대.
- [ ] 학생 사전 공지:
  - GitHub 계정 (2FA 권장)
  - Node 18 이상, pnpm (`npm i -g pnpm`)
  - Git 설치 + `user.name`, `user.email` 설정 확인
  - VS Code + GitLens 확장 권장

## 세션 진행 (1.5~2시간)

| 시간 | 내용 |
|---|---|
| 0~15분 | 소개 + `/guide` 시각화 보면서 conflict 개념 |
| 15~30분 | `/commands` 6개 카드 함께 훑기 |
| 30~50분 | Step 1~3 (셋업·브랜치·수정) |
| 50~75분 | Step 4~6 (PR·conflict·해결) — **메인** |
| 75~90분 | Step 7 (rebase 보너스) + Q&A |

## 사고 대응

- 누군가 `git reset --hard`로 작업 날림 → `/commands`의 reflog 카드 펼쳐서 즉석 시연.
- force push로 짝 작업 덮어쓰기 사고 → reflog로 복구 + `--force-with-lease`의 가치 강조.
- 마커 잘못 지움 → `git merge --abort` or `git rebase --abort`.

## 화면 셋업

- 강사 화면: dev 서버 + `/guide` 와 `/commands` 띄워두기.
- 마이크 + 화면공유 (Zoom/Meet).
```

- [ ] **Step 3: `STUDENT.md`**

````markdown
# 학생 사전 준비

## 설치

1. **Git 설치 확인**
   ```bash
   git --version    # 2.23 이상 권장
   ```
2. **Node.js 18 이상**
   ```bash
   node -v
   ```
3. **pnpm**
   ```bash
   npm install -g pnpm
   pnpm -v
   ```
4. **VS Code + GitLens 확장** (선택)

## GitHub 계정 설정

```bash
git config --global user.name "내이름"
git config --global user.email "내이메일@example.com"
```

## 세션 당일

- 짝 정해지면 강사가 만들어준 레포 또는 직접 만들 레포의 invite 수락.
- `pnpm install && pnpm dev`로 사이트가 잘 뜨는지 미리 확인.
- 사이트 `/practice`를 열어두고 따라가세요.

## 막혔을 때

- `/commands`의 카드들 → 상황별 처방.
- `git status`는 만능 — 뭘 해야 할지 모르겠으면 일단 `git status`.
- 강사에게 물어보거나 짝과 의논.
````

- [ ] **Step 4: 커밋**

```bash
git add README.md INSTRUCTOR.md STUDENT.md
git commit -m "docs: add readme and instructor/student guides"
```

---

## Task 16: CI + 최종 검증

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: GitHub Actions workflow**

```yaml
name: ci

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm build
```

- [ ] **Step 2: 전체 빌드 검증**

```bash
pnpm typecheck && pnpm lint && pnpm build
```

세 명령 모두 통과해야 함.

- [ ] **Step 3: preview에서 4개 라우트 시각 확인**

```bash
pnpm preview
```

브라우저에서 `/`, `/guide`, `/commands`, `/practice` 각각:

- 흰 화면 없이 렌더
- 다크/라이트 토글 동작
- `/`의 5개 섹션
- `/guide`의 타임라인 스크러버 + 마커 해부 + 3유형 카드
- `/commands`의 6개 카드 + 복사 버튼
- `/practice`의 7개 카드 + 진행도 배지 + 새로고침 후 진행도 유지

확인 후 `Ctrl+C`.

- [ ] **Step 4: 커밋**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: typecheck, lint, build on push and pr"
```

- [ ] **Step 5: 최종 상태 확인**

```bash
git status
git log --oneline
```

워킹 트리가 클린해야 하고, 커밋 히스토리에 의미 있는 메시지들이 남아 있어야 함.

---

## Self-Review (스펙 대비 검수)

| 스펙 섹션 | 구현 태스크 |
|---|---|
| 2.1 라우트 분리 단일 사이트 | Task 5·6 |
| 2.3 기술 스택 | Task 1·2·3·5·10 |
| 2.4 파일 구조 | Task 4·5·7·8 |
| 3.1 랜딩페이지 5섹션 | Task 8 |
| 3.2 Guide (다이어그램·마커·3유형) | Task 9·10 |
| 3.3 Commands 6장 | Task 11·12 |
| 3.4 Practice 7단계 + 진행도 | Task 13·14 |
| 3.5 전역 nav/footer/다크모드 | Task 5 |
| 4.1~4.5 conflict 시나리오 | Task 4·7·8 (anchors), Task 11 (reflog 처방) |
| 5 시각화 톤 | Task 4·5·10 |
| 6 사전 준비 | Task 15 |
| 7 품질/테스트 (타입체크·린트·빌드 CI) | Task 16 |
| 10 성공 기준 | Task 16 Step 3 (수동 시각 검증) |

검수 완료 — placeholder 없음, 타입 식별자 일관 (`Member`, `BranchStep`, `ConflictType`, `CommandRecipe`, `PracticeStep`는 한 곳에서 정의되고 import).
