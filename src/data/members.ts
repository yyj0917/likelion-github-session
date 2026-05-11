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
