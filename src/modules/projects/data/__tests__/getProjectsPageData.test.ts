import { describe, expect, it } from 'vitest';

import type { Config, Media, Project } from '@/payload-types';

import { defaultProjectsPageData } from '../projectsPageDefaults';
import {
  normalizePageHeroData,
  normalizeProjectsPageData,
} from '../getProjectsPageData';

type ProjectsPageGlobal = Config['globals']['projects-page'];

const media: Media = {
  alt: 'Project logo',
  createdAt: '2026-01-01T00:00:00.000Z',
  height: 300,
  id: 1,
  updatedAt: '2026-01-01T00:00:00.000Z',
  url: '/api/media/file/project-logo.png',
  width: 300,
};

function createProject(overrides: Partial<Project> = {}): Project {
  return {
    createdAt: '2026-01-01T00:00:00.000Z',
    id: 1,
    shortDescription:
      'A community-led project summary suitable for the projects page.',
    slug: 'example-project',
    status: 'current',
    title: 'Example Project',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('normalizeProjectsPageData', () => {
  it('normalizes projects page hero copy and collection projects', () => {
    const projectsPage: ProjectsPageGlobal = {
      hero: {
        description:
          'Projects selected from the CMS for the public projects page.',
        heading: 'Research Projects',
      },
      completedProjects: {
        actionLabel: 'View all',
        description: 'Completed work from past research partnerships.',
        heading: 'Completed Projects',
      },
      id: 1,
    };

    expect(
      normalizeProjectsPageData({
        projects: [
          createProject({
            logo: media,
            logoAlt: 'Custom logo alt',
            slug: 'community-wellness',
            title: 'Community Wellness',
          }),
          createProject({
            completionYear: 2024,
            id: 2,
            slug: 'completed-wellness',
            status: 'completed',
            title: 'Completed Wellness',
          }),
          createProject({
            completionYear: 2023,
            id: 3,
            slug: 'completed-alpha',
            status: 'completed',
            title: 'Completed Alpha',
          }),
          createProject({
            completionYear: 2022,
            id: 4,
            slug: 'completed-beta',
            status: 'completed',
            title: 'Completed Beta',
          }),
          createProject({
            completionYear: 2021,
            id: 5,
            slug: 'completed-gamma',
            status: 'completed',
            title: 'Completed Gamma',
          }),
          createProject({
            completionYear: 2020,
            id: 6,
            slug: 'completed-delta',
            status: 'completed',
            title: 'Completed Delta',
          }),
        ],
        projectsPage,
      }),
    ).toEqual({
      completedProjects: {
        action: {
          href: '/projects/completed',
          label: 'View all',
        },
        description: 'Completed work from past research partnerships.',
        heading: 'Completed Projects',
        projects: [
          {
            completionYear: 2024,
            description:
              'A community-led project summary suitable for the projects page.',
            logo: null,
            title: 'Completed Wellness',
            url: '/projects/completed-wellness',
          },
          {
            completionYear: 2023,
            description:
              'A community-led project summary suitable for the projects page.',
            logo: null,
            title: 'Completed Alpha',
            url: '/projects/completed-alpha',
          },
          {
            completionYear: 2022,
            description:
              'A community-led project summary suitable for the projects page.',
            logo: null,
            title: 'Completed Beta',
            url: '/projects/completed-beta',
          },
          {
            completionYear: 2021,
            description:
              'A community-led project summary suitable for the projects page.',
            logo: null,
            title: 'Completed Gamma',
            url: '/projects/completed-gamma',
          },
        ],
      },
      hero: {
        description:
          'Projects selected from the CMS for the public projects page.',
        heading: 'Research Projects',
      },
      currentProjects: [
        {
          description:
            'A community-led project summary suitable for the projects page.',
          logo: {
            alt: 'Custom logo alt',
            height: 300,
            url: '/api/media/file/project-logo.png',
            width: 300,
          },
          title: 'Community Wellness',
          url: '/projects/community-wellness',
        },
      ],
    });
  });

  it('uses defaults and ignores incomplete projects', () => {
    expect(
      normalizeProjectsPageData({
        projects: [
          createProject({
            id: 1,
            shortDescription: ' ',
            slug: 'missing-description',
            title: 'Missing Description',
          }),
          createProject({
            id: 2,
            title: 'Valid Project',
          }),
        ],
        projectsPage: {
          hero: {
            description: ' ',
            heading: ' ',
          },
          id: 1,
        },
      }),
    ).toEqual({
      ...defaultProjectsPageData,
      currentProjects: [
        {
          description:
            'A community-led project summary suitable for the projects page.',
          logo: null,
          title: 'Valid Project',
          url: '/projects/example-project',
        },
      ],
    });
  });

  it('derives project URLs from titles when legacy projects have no slug', () => {
    expect(
      normalizeProjectsPageData({
        projects: [
          createProject({
            slug: ' ',
            title: 'Legacy Project Title',
          }),
        ],
        projectsPage: null,
      }).currentProjects,
    ).toEqual([
      {
        description:
          'A community-led project summary suitable for the projects page.',
        logo: null,
        title: 'Legacy Project Title',
        url: '/projects/legacy-project-title',
      },
    ]);
  });

  it('ignores completed projects that are missing required card content', () => {
    expect(
      normalizeProjectsPageData({
        projects: [
          createProject({
            id: 1,
            shortDescription: ' ',
            status: 'completed',
            title: 'Incomplete Completed Project',
          }),
          createProject({
            completionYear: 2023,
            id: 2,
            status: 'completed',
            title: 'Valid Completed Project',
          }),
        ],
        projectsPage: null,
      }).completedProjects.projects,
    ).toEqual([
      {
        completionYear: 2023,
        description:
          'A community-led project summary suitable for the projects page.',
        logo: null,
        title: 'Valid Completed Project',
        url: '/projects/example-project',
      },
    ]);
  });

  it('hides the completed projects action when there are not more than four completed projects', () => {
    expect(
      normalizeProjectsPageData({
        projects: [
          createProject({
            completionYear: 2024,
            id: 1,
            status: 'completed',
            title: 'Completed Project',
          }),
        ],
        projectsPage: {
          completedProjects: {
            actionLabel: 'View all',
          },
          id: 1,
        },
      }).completedProjects.action,
    ).toBeNull();
  });

  it('normalizes hero defaults independently', () => {
    expect(normalizePageHeroData(null)).toEqual(defaultProjectsPageData.hero);
  });
});
