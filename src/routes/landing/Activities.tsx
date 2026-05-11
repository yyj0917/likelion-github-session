// 🎨 TOUCH: 활동 섹션.
const activities = [
  { title: '주간 코드 리뷰', body: '서로의 PR을 리뷰하며 시야를 넓힙니다.' },
  { title: '해커톤', body: '학기마다 한 번, 짝과 함께 24시간 만에 결과물.' },
  { title: '오픈소스 기여', body: '실제 프로젝트에 PR을 날려봅니다.' },
];

export function Activities() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-semibold">우리가 하는 일</h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {activities.map((a) => (
          <article
            key={a.title}
            className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-6"
          >
            <h3 className="text-xl font-semibold">{a.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">{a.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
