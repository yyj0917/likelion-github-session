// 🔒 DO NOT TOUCH
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'mlh-theme';

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw === 'dark' || raw === 'light' ? raw : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
  };
}
