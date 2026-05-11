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
