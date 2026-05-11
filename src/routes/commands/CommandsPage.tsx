// 🔒 DO NOT TOUCH
import { CommandCard } from '../../_protected/components/CommandCard';
import { commands } from '../../_protected/data/commands';

export function CommandsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <p className="text-sm uppercase tracking-wider text-[color:var(--color-brand)]">
          Commands
        </p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">상황별 플레이북</h1>
        <p className="mt-4 text-[color:var(--color-muted)]">
          외울 명령어 목록이 아니라, 닥쳤을 때 펼쳐 보는 처방전.
        </p>
      </header>
      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {commands.map((r) => (
          <CommandCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
}
