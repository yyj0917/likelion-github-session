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
