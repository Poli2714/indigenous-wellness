import CompletedProjects from '@/modules/projects/components/CompletedProjects';
import CurrentProjectsList from '@/modules/projects/components/CurrentProjectsList';
import { getProjectsPageData } from '@/modules/projects/data/getProjectsPageData';
import PageHero from '@/modules/site/components/PageHero';
import Section from '@/modules/site/components/Section';

export default async function ProjectsPage() {
  const data = await getProjectsPageData();

  return (
    <>
      <PageHero data={data.hero} />
      <Section aria-labelledby='current-projects-heading'>
        <h2 className='sr-only' id='current-projects-heading'>
          Current projects
        </h2>
        <CurrentProjectsList projects={data.currentProjects} />
      </Section>
      <CompletedProjects data={data.completedProjects} />
    </>
  );
}
