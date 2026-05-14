// 🎨 TOUCH: About 섹션.
import { ABOUT_HEADLINE, ABOUT_BODY } from '../../data/copy';

const stats = [
  { value: '30+', label: '동아리원' },
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
