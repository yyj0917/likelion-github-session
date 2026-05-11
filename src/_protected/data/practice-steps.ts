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
    body: '레포 클론 → `pnpm install` → `pnpm dev`. 짝이 둘 다 collaborator로 초대되어 있는지 GitHub Settings → Collaborators에서 확인하세요.',
    stuck:
      'pnpm이 없다면 `npm install -g pnpm`. Node 버전은 18 이상. dev 서버가 안 뜨면 포트 5173이 이미 사용 중인지 확인.',
  },
  {
    id: 2,
    title: '각자 브랜치 생성',
    minutes: 3,
    body: '짝 A: `git switch -c feat/hero-<이름>`. 짝 B: `git switch -c feat/footer-<이름>`. 이름은 영문 소문자로.',
    stuck:
      '`switch`는 Git 2.23+. 안 되면 `git checkout -b ...`. 브랜치 이름 오타나면 `git branch -m 새이름`.',
  },
  {
    id: 3,
    title: '본인 영역 수정 → commit → push',
    minutes: 10,
    body: 'A는 `src/data/copy.ts`의 HERO_TITLE을 바꾸고 `src/data/members.ts`의 안내 주석 위에 본인 카드를 추가. B는 `src/routes/landing/LandingFooter.tsx`의 socials를 바꾸고 `members.ts`에도 본인 카드 추가. 각자 `git add → commit → push -u origin <브랜치>`.',
    stuck:
      'commit 메시지는 `feat: 내 카드 추가` 정도. push가 거부되면 origin에 같은 이름 브랜치가 있는지 확인.',
  },
  {
    id: 4,
    title: 'PR 생성 + 서로 리뷰 + 첫 PR 머지',
    minutes: 10,
    body: 'GitHub에서 두 PR을 만들고 짝에게 리뷰 요청. 가위바위보로 정해서 한 쪽 PR을 먼저 머지합니다 (Squash and merge 권장).',
    stuck:
      'PR 설명에는 "어떤 변화"인지 한 줄. 리뷰는 한 줄짜리 코멘트로 충분합니다 (LGTM, 좋아요).',
  },
  {
    id: 5,
    title: '💥 conflict 발생 (라이브 시연)',
    minutes: 5,
    body: '두 번째 PR을 보세요. "This branch has conflicts that must be resolved" 메시지가 나타날 거예요. 사이트 `/guide`로 가서 마커 해부도를 다시 확인합니다.',
    stuck:
      '버튼이 안 보이면 짝의 PR이 정말 머지됐는지 main에서 확인. GitHub UI의 "Resolve conflicts"는 간단할 때만 쓰고, 본격적으로는 로컬에서.',
  },
  {
    id: 6,
    title: '로컬에서 해결 → push',
    minutes: 15,
    body: '`git switch main && git pull` → `git switch <내-브랜치>` → `git merge main` → 에디터에서 마커 해결 → `git add . && git commit && git push`. PR이 자동으로 머지 가능 상태가 됩니다.',
    stuck:
      '마커를 잘못 지웠다면 `git merge --abort`로 처음으로. 어떤 줄이 누구 것인지 모르겠으면 VS Code의 GitLens 활용.',
  },
  {
    id: 7,
    title: '보너스: rebase로 깔끔한 히스토리',
    minutes: 10,
    body: '동일 상황을 merge가 아니라 rebase로. 시나리오를 다시 만들고(양쪽 동시 수정 → A 머지) → B는 `git fetch && git rebase origin/main` → 충돌 해결 → `git add && git rebase --continue` → `git push --force-with-lease`. 히스토리가 일자로 깔끔해진 걸 확인.',
    stuck:
      'rebase 중 길을 잃었으면 `git rebase --abort`. force push는 반드시 `--force-with-lease`. main에는 절대 force하지 않습니다.',
  },
];
