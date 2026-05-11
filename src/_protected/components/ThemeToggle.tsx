// 🔒 DO NOT TOUCH
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="rounded-full border border-white/10 px-3 py-1.5 text-sm transition hover:bg-white/5"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
