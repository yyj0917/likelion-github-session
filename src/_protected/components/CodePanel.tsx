// 🔒 DO NOT TOUCH
import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

export function CodePanel({ code, lang = 'ts' }: { code: string; lang?: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code, { lang, theme: 'github-dark-dimmed' }).then((out) => {
      if (!cancelled) setHtml(out);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-black/40">
      <div className="flex gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-yellow-500/70" />
        <span className="size-2.5 rounded-full bg-green-500/70" />
      </div>
      <div
        className="p-4 text-sm [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
