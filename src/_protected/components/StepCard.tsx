// 🔒 DO NOT TOUCH
import { useState } from 'react';
import type { PracticeStep } from '../data/practice-steps';

export function StepCard({
  step,
  isDone,
  onToggle,
}: {
  step: PracticeStep;
  isDone: boolean;
  onToggle: () => void;
}) {
  const [stuckOpen, setStuckOpen] = useState(false);

  return (
    <article
      className={`rounded-[var(--radius-card)] border p-6 transition ${
        isDone
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)]'
      }`}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-mono text-[color:var(--color-muted)]">Step {step.id}</span>
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <span className="text-xs text-[color:var(--color-muted)]">~ {step.minutes}분</span>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isDone}
            onChange={onToggle}
            className="size-4 accent-emerald-500"
          />
          완료
        </label>
      </header>

      <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-fg)]/90">{step.body}</p>

      <button
        type="button"
        onClick={() => setStuckOpen((v) => !v)}
        className="mt-4 text-xs font-medium text-[color:var(--color-brand)] hover:underline"
      >
        💡 {stuckOpen ? '접기' : '막혔어요'}
      </button>
      {stuckOpen && (
        <p className="mt-2 rounded-md bg-white/5 px-3 py-2 text-xs text-[color:var(--color-muted)]">
          {step.stuck}
        </p>
      )}
    </article>
  );
}
