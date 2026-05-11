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
