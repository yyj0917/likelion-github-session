// 🎨 TOUCH: 랜딩페이지 컨테이너. 섹션 순서를 바꿔도 좋습니다.
import { Hero } from './Hero';
import { About } from './About';
import { Members } from './Members';
import { Activities } from './Activities';
import { LandingFooter } from './LandingFooter';

export function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Members />
      <Activities />
      <LandingFooter />
    </>
  );
}
