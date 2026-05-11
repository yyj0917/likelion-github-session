# 멋쟁이사자처럼 프론트엔드 GitHub 협업 세션 — 디자인 스펙

- **작성일**: 2026-05-12
- **저자**: 윤영준 (yyj0917)
- **대상**: 멋쟁이사자처럼 연세 프론트엔드 동아리원 (Git/GitHub 입문자)
- **목적**: 2인 1조로 PR · conflict · 해결 흐름을 1회성 세션(약 1.5~2시간)에서 학습

---

## 1. 개요

이 프로젝트는 두 가지 역할을 동시에 한다:

1. **교육 사이트**: conflict가 왜 나는지 시각화하고, 상황별 명령어(rebase / merge / cherry-pick / reflog / switch / force-with-lease)를 가이드한다.
2. **실습 대상 코드베이스**: 짝이 같은 레포를 collaborator로 공유하면서 멋사 프론트엔드 랜딩페이지를 꾸미는 과정에서 **의도된 conflict**가 자연스럽게 발생한다.

세션이 끝나면 각 짝의 손으로 완성된 멋사 랜딩페이지가 남고, 사이트 자체는 이후에도 동아리 학습 자료로 재사용된다.

## 2. 아키텍처 결정

### 2.1 사이트 구조: Approach A — 라우트 분리 단일 사이트

| 라우트 | 역할 | 코드 영역 |
|---|---|---|
| `/` | 멋사 랜딩페이지 (실습 대상) | `src/routes/landing/**` (TOUCH) |
| `/guide` | conflict 왜 나는지 시각화 | `src/routes/guide/**` (DO NOT TOUCH) |
| `/commands` | 상황별 명령어 플레이북 | `src/routes/commands/**` (DO NOT TOUCH) |
| `/practice` | 짝 실습 단계별 walkthrough | `src/routes/practice/**` (DO NOT TOUCH) |

**근거**: 단일 SPA 라우팅이 입문자에게 mental model이 단순하고, 가이드 라우트는 디자인 시스템 하나로 깔끔하게 정리되며, 1회 세션 구현 분량에 맞다. 모드 토글(B)이나 사이드바 동시 UI(C)는 첫 노출 학습 곡선이 높고 구현 비용이 과하다.

### 2.2 짝 실습 구조

각 짝마다 **공유 레포** (둘 다 collaborator) 1개. fork 개념을 입문자에게 강요하지 않는다. 강사는 짝별로 빈 레포를 만들고 두 학생을 collaborator로 초대하거나, 학생이 직접 새 레포를 만들고 짝을 초대하도록 가이드한다.

### 2.3 기술 스택

| 항목 | 선택 |
|---|---|
| 빌드 도구 | Vite 6 |
| 프레임워크 | React 19 |
| 언어 | TypeScript 5.7+ |
| 스타일 | Tailwind CSS 4 (Vite 플러그인) |
| 라우팅 | React Router 7 |
| 코드 하이라이트 | Shiki |
| 애니메이션 | Framer Motion 12 |
| 패키지 매니저 | pnpm |
| 린트/포맷 | ESLint + Prettier |

**Next.js 미채택 사유**: SSR/SSG가 불필요한 정적 교육 사이트. Vite가 더 가볍고 dev 경험이 빠르며 입문자에게 마법 같지 않다(폴더 = 라우트 같은 암묵 규칙이 없다).

### 2.4 파일 구조

```
src/
├── routes/
│   ├── landing/         🎨 TOUCH (짝이 작업)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Members.tsx
│   │   ├── Activities.tsx
│   │   └── Footer.tsx
│   ├── guide/           🔒 DO NOT TOUCH
│   ├── commands/        🔒 DO NOT TOUCH
│   └── practice/        🔒 DO NOT TOUCH
├── data/
│   ├── members.ts       🎨 TOUCH ⭐ 충돌 지점
│   └── copy.ts          🎨 TOUCH ⭐ 충돌 지점
├── styles/
│   └── tokens.css       🎨 TOUCH ⭐ 충돌 지점
├── _protected/          🔒 절대 만지지 말 것
│   ├── Router.tsx
│   ├── Nav.tsx
│   └── data/            (가이드 / 명령어 / 실습 콘텐츠)
├── App.tsx              🔒 DO NOT TOUCH
└── main.tsx             🔒 DO NOT TOUCH
```

- `_protected/`라는 명명으로 학생에게 시각적 신호를 준다.
- 각 파일 상단 주석에 `// 🔒 DO NOT TOUCH` 또는 `// 🎨 짝이 작업하는 파일`을 명시한다.
- README에 TOUCH / DO NOT TOUCH 표가 들어간다.

## 3. 페이지 상세

### 3.1 `/` — 멋사 프론트엔드 랜딩페이지 (실습 대상)

| 섹션 | 짝 A 작업 영역 | 짝 B 작업 영역 |
|---|---|---|
| Hero | 타이틀 카피, CTA 버튼 | 배경 그라데이션, 이미지 |
| About | 본문 카피, 슬로건 | 통계 카드 |
| Members | `members.ts`에 본인 카드 추가 ⭐ | `members.ts`에 본인 카드 추가 ⭐ |
| Activities | 활동 사진 그리드 | 활동 설명 카피 |
| Footer | 소셜 링크 | 카피라이트, 정렬 |

### 3.2 `/guide` — conflict가 왜 나는가

**메인 인터랙티브 다이어그램**: 분기 → 양쪽 수정 → 머지 시도 → 💥충돌 흐름을 Framer Motion 타임라인 스크러버로 표현. 슬라이더를 드래그하면 단계별로 진행되고, 우측 코드 패널이 해당 시점의 파일 상태를 Shiki syntax-highlight로 보여준다. 충돌 발생 순간 코드 패널이 conflict 마커 형태로 변환되고 빨간 펄스가 강조한다.

**Conflict 마커 해부 위젯**: `<<<<<<< HEAD` / `=======` / `>>>>>>> branch` 부분을 컬러 칩으로 시각화. 클릭하면 사이드 패널에서 해설.

**3가지 충돌 유형 비교**: 같은 라인 / 인접 라인 / 파일 삭제+수정 — 가로 3개 카드로 비교.

### 3.3 `/commands` — 상황별 명령어 플레이북

외울 명령어 목록이 아니라 **상황 → 처방** 카드:

| 상황 | 명령어 카드 |
|---|---|
| 💥 PR에서 conflict 났어요 | `git pull origin main` → 해결 → `git push` |
| 🔄 내 브랜치를 최신 main 위에 올리고 싶어요 | `git rebase main` |
| ⏪ 방금 reset 잘못 했어요!! | `git reflog` → `git reset --hard <hash>` |
| 🍒 다른 브랜치 그 커밋만 갖고 오고 싶어요 | `git cherry-pick <hash>` |
| 🔀 브랜치 옮기고 싶어요 / switch와 checkout 차이 | `git switch <branch>` |
| ⚠️ force push 해도 돼요? | `git push --force-with-lease` |

각 카드: 상황 / 복사 가능한 명령어 블록 / 한국어 단계 설명 / 위험 경고 / 복구 방법.

### 3.4 `/practice` — 짝 실습 walkthrough

7개 스텝 카드. 각 카드는 [상태 인디케이터] + [본문] + [💡 막혔어요 토글] + [✅ 완료 체크박스]. 진행도는 localStorage에 저장.

| Step | 제목 | 예상 시간 |
|---|---|---|
| 1 | 셋업 확인 (clone, install, dev 서버) | 5분 |
| 2 | 각자 브랜치 생성 (`feat/hero-<이름>` / `feat/footer-<이름>`) | 3분 |
| 3 | 본인 영역 수정 → commit → push | 10분 |
| 4 | PR 생성 → 서로 리뷰 → 첫 PR 머지 | 10분 |
| 5 | 💥 conflict 발생 (라이브 시연) | 5분 |
| 6 | 로컬에서 해결 → push **(메인 학습 포인트)** | 15분 |
| 7 | 보너스: rebase로 깔끔한 히스토리 | 10분 |

합계 실습 ~58분 + 강의(시각화·명령어) 30~40분 = 1.5~2시간.

### 3.5 전역 요소

- 상단 nav: 로고(멋사) · 메뉴 4개 · 다크모드 토글
- 좌하단 floating: 진행도 인디케이터 "Practice Step 3/7" — `/practice`에서만 노출
- 푸터: 동아리 표기, 깃허브 링크

## 4. Conflict 시나리오 카탈로그

### 4.1 시나리오 1 — Members 배열 (필수, 가장 쉬움)

`src/data/members.ts`의 배열 끝에 짝 A·B 모두 본인 카드를 추가한다. 안내 주석 바로 위 같은 위치에 push하므로 **같은 라인 conflict가 100% 발생**한다.

**해결**: 두 카드 모두 살리고 마커 제거.
**교훈**: conflict 해결은 "한쪽 고르기"가 아니라 "둘의 의도 합치기".

### 4.2 시나리오 2 — Hero 타이틀

`src/data/copy.ts`의 `HERO_TITLE` 상수. A는 `'멋쟁이사자처럼 연세'`, B는 `'Likelion Yonsei Frontend'`로 같은 라인을 변경한다.

**해결**: 의논 후 합의된 문구로 통합.
**교훈**: conflict 해결은 기술 문제가 아니라 커뮤니케이션 문제.

### 4.3 시나리오 3 — Design Tokens

`src/styles/tokens.css`. A·B가 서로 다른 CSS 변수만 수정하면 **자동 머지**, 같은 변수(`--color-accent`)를 다른 값으로 수정하면 conflict.

**교훈**: Git이 똑똑한 부분과 사람이 결정해야 하는 부분의 차이.

### 4.4 시나리오 4 — Rebase 보너스

시나리오 1·2가 머지된 상태에서, 또 한 번의 양쪽 동시 수정 → A 머지 후 B는 outdated → B가 `git rebase main` → 같은 conflict가 rebase 도중에 등장 → `git add` → `git rebase --continue` → `git push --force-with-lease`.

**교훈**: merge와 rebase의 결과 차이(히스토리 모양), force push 안전 가이드.

### 4.5 시나리오 5 — Reflog 안전망 (사고 대응)

사전에 만들지 않는다. 누군가 `reset --hard`나 force push로 실수하면 즉석에서 `/commands` reflog 카드를 펼쳐 복구. 사고가 없으면 강사가 데모로 보여주는 것으로 충분.

## 5. 시각화 톤

- **다크 모드 기본**, 라이트 모드 토글 (스토리지 영속)
- 색 팔레트: `오렌지(멋사 브랜드) + 청록(브랜치 A) + 보라(브랜치 B) + 빨강(충돌)` — semantic 일관
- 타이포: `Pretendard` (한글 본문) + `JetBrains Mono` (코드)
- 코드 블록: macOS 터미널 풍 (윈도우 dot 3개 헤더, 어두운 배경)
- 모션: 절제, `prefers-reduced-motion: reduce` 존중

## 6. 사전 준비

### 6.1 강사 체크리스트

- 템플릿 레포를 GitHub public으로 push (`likelion-github-session-template` 같은 이름)
- 짝마다 새 레포 생성 + 둘 다 collaborator 초대 (또는 학생이 직접 만들고 짝을 초대하도록 안내)
- 학생 사전 공지: Node 18+, pnpm, Git, GitHub 계정, VS Code 권장 + GitLens 확장
- 세션 중 강사 화면: dev 서버 + 사이트 `/guide` 와 `/commands` 띄워두기

### 6.2 학생 체크리스트

- GitHub 계정 (2FA 권장)
- Node 18 이상, pnpm 설치
- Git 설치 + `user.name`, `user.email` 설정
- VS Code + GitLens

## 7. 품질 / 테스트 (가볍게)

교육용 정적 사이트라 무거운 테스트는 도입하지 않는다.

- **타입 체크**: `pnpm tsc --noEmit` (PR마다 CI)
- **린트/포맷**: ESLint + Prettier (PostToolUse 훅으로 자동)
- **빌드 확인**: `pnpm build` (PR마다 CI)
- **시각 점검**: 4개 라우트(`/`, `/guide`, `/commands`, `/practice`)가 빌드 후 정상 렌더되는지 수동 확인
- **E2E·유닛 테스트 생략**: 1회성 세션 자료에 과한 투자

## 8. 구현 분담 전략

이 프로젝트는 main context(Opus)가 계획·조율·검증을 맡고, 실제 코드 작성은 **Sonnet 서브에이전트들이 비중첩 파일 스코프로 병렬 작업**한다. 에이전트 간 파일 충돌이 없도록 다음과 같이 분담한다(잠정):

| 에이전트 | 스코프 |
|---|---|
| 1 | 프로젝트 셋업 (`package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config`, ESLint/Prettier) |
| 2 | `_protected/` (Router, Nav, 공통 컴포넌트) + `App.tsx` + `main.tsx` |
| 3 | `routes/landing/**` (Hero, About, Members, Activities, Footer) |
| 4 | `routes/guide/**` + 시각화 컴포넌트 |
| 5 | `routes/commands/**` + 명령어 데이터 |
| 6 | `routes/practice/**` + step 데이터 |
| 7 | `data/` (members.ts, copy.ts) + `styles/tokens.css` + 안내 주석 |
| 8 | README + 강사·학생 체크리스트 + TOUCH/DO NOT TOUCH 표 |

세부 분담과 순서는 구현 계획 단계(`writing-plans`)에서 확정한다.

## 9. 비범위 (Out of Scope)

- E2E 테스트, 유닛 테스트
- i18n (한국어만 지원)
- 백엔드 / DB / 사용자 인증
- GitHub OAuth 연동 (학생 본인의 활동 표시)
- 모바일 우선 디자인 (반응형은 하되 모바일 데모는 핵심 아님)
- 다국어 명령어 가이드
- 영상 임베드 (사이트는 정적 텍스트·다이어그램 중심)

## 10. 성공 기준

- [ ] 4개 라우트가 모두 빌드되고 시각적으로 완성도 있게 렌더된다.
- [ ] 짝 두 명이 README만 보고 30분 안에 첫 PR을 올릴 수 있다.
- [ ] 시나리오 1·2에서 의도된 conflict가 실제로 재현된다.
- [ ] `/guide`만 보고도 conflict 마커가 무엇을 의미하는지 입문자가 이해할 수 있다.
- [ ] 세션 후에도 자료로 재사용 가능한 수준의 디자인·문서 완성도.
