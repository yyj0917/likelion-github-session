// 🔒 DO NOT TOUCH
import { NavLink } from 'react-router';
import { ThemeToggle } from './ThemeToggle';

const items = [
  { to: '/', label: '랜딩' },
  { to: '/guide', label: '가이드' },
  { to: '/commands', label: '명령어' },
  { to: '/practice', label: '실습' },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[color:var(--color-bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="font-semibold tracking-tight">
          <span className="text-[color:var(--color-brand)]">멋사</span> Frontend
        </NavLink>
        <ul className="flex items-center gap-1">
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                end={it.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm transition ${
                    isActive
                      ? 'bg-white/10 text-[color:var(--color-fg)]'
                      : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]'
                  }`
                }
              >
                {it.label}
              </NavLink>
            </li>
          ))}
          <li className="ml-2">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
