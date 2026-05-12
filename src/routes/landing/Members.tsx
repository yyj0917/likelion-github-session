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
        {members.map((m) => (
          <li
            key={m.name}
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
