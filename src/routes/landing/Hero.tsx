// 🎨 TOUCH: Hero 섹션. 짝이 카피·CTA·배경을 꾸미는 곳.
import { HERO_TITLE, HERO_SUBTITLE, HERO_CTA } from '../../data/copy';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(40% 10% at 20% 50%, color-mix(in oklab, var(--color-brand) 40% transparent), transparent 20%)',
        }}
      />
      <div className="mx-auto max-w-6xl px-10 py-32 text-center">
        <h1 className="text-3xl  tracking-tight sm:text-4xl">
          <span className="text-[color:var(--color-brand)]">{HERO_TITLE}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[color:var(--color-muted)]">
          {HERO_SUBTITLE}
        </p>
        <a
          href="#about"
          className="mt-10 inline-flex items-center bg-[color:var(--color-brand)] px-10 py-1 font-medium text-black transition hover:scale-[1.02]"
        >
          {HERO_CTA} →
        </a>
      </div>
    </section>
  );
}
