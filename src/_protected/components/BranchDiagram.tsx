// 🔒 DO NOT TOUCH
import { useState } from 'react';
import { motion } from 'framer-motion';
import { branchTimeline } from '../data/guide-content';
import { CodePanel } from './CodePanel';

const colorFor = (b: string) =>
  b === 'A' ? '#22d3ee' : b === 'B' ? '#c084fc' : b === 'conflict' ? '#ef4444' : '#f5f5f5';

export function BranchDiagram() {
  const [idx, setIdx] = useState(0);
  const step = branchTimeline[idx];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-6">
          <ol className="space-y-3">
            {branchTimeline.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setIdx(i)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition ${
                    i === idx ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span
                    aria-hidden
                    className="inline-block size-2.5 rounded-full"
                    style={{ background: colorFor(s.branch) }}
                  />
                  <span className="font-medium">{s.label}</span>
                  <span className="text-[color:var(--color-muted)]">{s.description}</span>
                </button>
              </li>
            ))}
          </ol>
          <input
            type="range"
            min={0}
            max={branchTimeline.length - 1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="mt-6 w-full"
            aria-label="타임라인 스크러버"
          />
        </div>
      </div>
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <CodePanel code={step.fileState} />
        {step.branch === 'conflict' && (
          <p className="mt-4 text-sm font-medium text-red-400">
            💥 Conflict 발생 — 마커 사이의 두 버전 중에서 사람이 결정해야 합니다.
          </p>
        )}
      </motion.div>
    </div>
  );
}
