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
