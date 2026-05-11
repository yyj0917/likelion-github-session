// 🔒 DO NOT TOUCH
import { practiceSteps } from '../../_protected/data/practice-steps';
import { useProgress } from '../../_protected/hooks/useProgress';
import { StepCard } from '../../_protected/components/StepCard';
import { ProgressBadge } from '../../_protected/components/ProgressBadge';

export function PracticePage() {
  const { done, toggle, completed, total } = useProgress(practiceSteps.length);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header>
        <p className="text-sm uppercase tracking-wider text-[color:var(--color-brand)]">Practice</p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">짝 실습 walkthrough</h1>
        <p className="mt-4 text-[color:var(--color-muted)]">
          7단계를 차례로 따라가며 PR · conflict · 해결을 경험합니다. 좌하단 진행도는 자동
          저장됩니다.
        </p>
      </header>

      <ol className="mt-12 space-y-4">
        {practiceSteps.map((s) => (
          <li key={s.id}>
            <StepCard step={s} isDone={done.has(s.id)} onToggle={() => toggle(s.id)} />
          </li>
        ))}
      </ol>

      <ProgressBadge completed={completed} total={total} />
    </div>
  );
}
