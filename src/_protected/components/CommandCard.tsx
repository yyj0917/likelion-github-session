// 🔒 DO NOT TOUCH
import { useState } from 'react';
import type { CommandRecipe } from '../data/commands';
import { CodePanel } from './CodePanel';

export function CommandCard({ recipe }: { recipe: CommandRecipe }) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(recipe.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <article className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl">{recipe.emoji}</div>
          <h3 className="mt-2 text-lg font-semibold">{recipe.situation}</h3>
        </div>
        <button
          type="button"
          onClick={copyCommand}
          className="rounded-md border border-white/10 px-2.5 py-1 text-xs transition hover:bg-white/5"
        >
          {copied ? '복사됨 ✓' : '복사'}
        </button>
      </header>

      <div className="mt-4">
        <CodePanel code={recipe.command} lang="bash" />
      </div>

      <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-[color:var(--color-muted)]">
        {recipe.steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>

      {recipe.danger && (
        <p className="mt-4 rounded-md bg-red-500/10 px-3 py-2 text-xs text-red-300">
          ⚠️ {recipe.danger}
        </p>
      )}
      {recipe.recovery && (
        <p className="mt-2 rounded-md bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
          🔁 {recipe.recovery}
        </p>
      )}
    </article>
  );
}
