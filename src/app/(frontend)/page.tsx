import AboutSection from '@/modules/site/home/components/AboutSection';
import FeaturedProjects from '@/modules/site/home/components/FeaturedProjects';
import HomeHero from '@/modules/site/home/components/HomeHero';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutSection />
      <FeaturedProjects />
    </>
  );
}
