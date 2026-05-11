// 🔒 DO NOT TOUCH
export function ProgressBadge({ completed, total }: { completed: number; total: number }) {
  return (
    <div className="fixed bottom-6 left-6 z-50 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-sm shadow-lg">
      <span className="text-[color:var(--color-muted)]">Practice</span>{' '}
      <span className="font-semibold">
        {completed}/{total}
      </span>
    </div>
  );
}
