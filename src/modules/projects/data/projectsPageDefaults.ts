import type { CompletedProjectsData } from '../components/CompletedProjects';
import type { CurrentProject } from '../components/CurrentProjectItem';
import type { PageHeroData } from '@/modules/site/components/PageHero';

export type ProjectsPageData = {
  completedProjects: CompletedProjectsData;
  hero: PageHeroData | null;
  currentProjects: CurrentProject[];
};

export const defaultProjectsPageData: ProjectsPageData = {
  completedProjects: {
    action: null,
    description: null,
    heading: null,
    projects: [],
  },
  hero: null,
  currentProjects: [],
};
