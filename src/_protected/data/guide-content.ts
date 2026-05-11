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
