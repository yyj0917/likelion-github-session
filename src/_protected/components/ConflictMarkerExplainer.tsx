// 🔒 DO NOT TOUCH
const segments = [
  { label: '<<<<<<< HEAD', tone: 'amber', note: '현재 체크아웃된 브랜치 (내 쪽)' },
  { label: "const title = '멋사';", tone: 'plain', note: '내 쪽 변경 내용' },
  { label: '=======', tone: 'slate', note: '두 버전의 구분선' },
  { label: "const title = 'Likelion';", tone: 'plain', note: '들어오는 쪽 변경 내용' },
  { label: '>>>>>>> feat/hero', tone: 'violet', note: '들어오는 브랜치 이름' },
];

const toneClass: Record<string, string> = {
  amber: 'bg-amber-500/20 text-amber-300',
  slate: 'bg-slate-500/20 text-slate-300',
  violet: 'bg-violet-500/20 text-violet-300',
  plain: 'bg-white/5 text-[color:var(--color-fg)]',
};

export function ConflictMarkerExplainer() {
  return (
    <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-6">
      <h3 className="text-xl font-semibold">Conflict 마커 해부</h3>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        에디터에서 conflict가 나면 다음과 같은 마커가 등장합니다.
      </p>
      <ul className="mt-6 space-y-2 font-mono text-sm">
        {segments.map((s) => (
          <li
            key={s.label}
            className={`flex flex-col gap-1 rounded-md px-3 py-2 sm:flex-row sm:items-center sm:justify-between ${toneClass[s.tone]}`}
          >
            <code>{s.label}</code>
            <span className="text-xs opacity-80">{s.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
