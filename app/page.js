import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import CustomCursor from '@/components/CustomCursor';
import ScrollReveal from '@/components/ScrollReveal';
import { getContent } from '@/lib/blob';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getContent();

  return (
    <>
      <CustomCursor />
      <ScrollReveal />
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
      <Header />
      <main>
        <HeroSection profile={data.profile} />
        <AboutSection profile={data.profile} />
        <SkillsSection skills={data.skills} />
        <ProjectsSection projects={data.projects} />
        <EducationSection education={data.education} />
        <ExperienceSection experiences={data.experiences} />
        <ContactSection profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
      <BackToTop />
    </>
  );
}
