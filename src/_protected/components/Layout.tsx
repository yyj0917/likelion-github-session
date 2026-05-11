// 🔒 DO NOT TOUCH
import { Outlet } from 'react-router';
import { Nav } from './Nav';

export function Layout() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Outlet />
      </main>
      <footer className="mt-24 border-t border-white/10 py-8 text-center text-sm text-[color:var(--color-muted)]">
        멋쟁이사자처럼 연세 프론트엔드 · GitHub 협업 세션 2026
      </footer>
    </div>
  );
}
