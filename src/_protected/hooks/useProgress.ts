// 🔒 DO NOT TOUCH
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'mlh-practice-progress';

function readStored(): Set<number> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((n): n is number => typeof n === 'number'));
  } catch {
    return new Set();
  }
}

export function useProgress(total: number) {
  const [done, setDone] = useState<Set<number>>(readStored);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(done)));
  }, [done]);

  function toggle(id: number) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return { done, toggle, completed: done.size, total };
}
