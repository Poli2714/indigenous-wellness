import type { ProjectCardProject } from '../components/ProjectCard';

export type FeaturedProjectsLink = {
  href: string;
  label: string;
  newTab?: boolean | null;
};

export type FeaturedProjectsData = {
  action: FeaturedProjectsLink;
  description: string;
  heading: string;
  projects: ProjectCardProject[];
};

export const defaultFeaturedProjectsData: FeaturedProjectsData = {
  action: {
    href: '/projects',
    label: 'View all projects',
  },
  description:
    'Explore selected community-led research projects advancing Indigenous health and wellness priorities.',
  heading: 'Featured Projects',
  projects: [],
};
