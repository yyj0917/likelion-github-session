// 🎨 TOUCH: 랜딩 푸터.
import { FOOTER_TAGLINE } from '../../data/copy';

const socials = [
  { label: 'GitHub', href: 'https://github.com/likelion-yonsei' },
  { label: 'Instagram', href: 'https://instagram.com' },
];

export function LandingFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-[color:var(--color-muted)]">{FOOTER_TAGLINE}</p>
        <ul className="flex gap-4">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[color:var(--color-muted)] transition hover:text-[color:var(--color-fg)]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
