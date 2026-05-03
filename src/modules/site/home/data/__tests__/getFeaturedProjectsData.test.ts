import { describe, expect, it } from 'vitest';

import type { Config, Media, Project } from '@/payload-types';

import { defaultFeaturedProjectsData } from '../featuredProjectsDefaults';
import { normalizeFeaturedProjectsData } from '../getFeaturedProjectsData';

type HomeGlobal = Config['globals']['home'];

const media: Media = {
  alt: 'Community workshop',
  createdAt: '2026-01-01T00:00:00.000Z',
  height: 900,
  id: 1,
  updatedAt: '2026-01-01T00:00:00.000Z',
  url: '/media/community-workshop.jpg',
  width: 1200,
};

function createProject(overrides: Partial<Project> = {}): Project {
  return {
    createdAt: '2026-01-01T00:00:00.000Z',
    id: 1,
    shortDescription:
      'A community-led project summary suitable for a featured card.',
    slug: 'example',
    status: 'current',
    title: 'Example Project',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('normalizeFeaturedProjectsData', () => {
  it('normalizes home global copy and ordered project relationships', () => {
    const firstProject = createProject({
      id: 1,
      image: media,
      imageAlt: 'Custom project image alt',
      slug: 'first',
      title: 'First Project',
    });
    const secondProject = createProject({
      id: 2,
      slug: 'second',
      title: 'Second Project',
    });
    const home: HomeGlobal = {
      featuredProjects: {
        action: {
          href: '/all-projects',
          label: 'Browse projects',
          newTab: false,
        },
        description: 'Featured work selected by the home page editor.',
        heading: 'Selected Projects',
        projects: [
          {
            id: 'first',
            project: firstProject,
          },
          {
            id: 'second',
            project: secondProject,
          },
        ],
      },
      id: 1,
    };

    expect(normalizeFeaturedProjectsData(home)).toEqual({
      action: {
        href: '/all-projects',
        label: 'Browse projects',
        newTab: false,
      },
      description: 'Featured work selected by the home page editor.',
      heading: 'Selected Projects',
      projects: [
        {
          description:
            'A community-led project summary suitable for a featured card.',
          image: {
            alt: 'Custom project image alt',
            height: 900,
            url: '/media/community-workshop.jpg',
            width: 1200,
          },
          title: 'First Project',
          url: '/projects/first',
        },
        {
          description:
            'A community-led project summary suitable for a featured card.',
          image: null,
          title: 'Second Project',
          url: '/projects/second',
        },
      ],
    });
  });

  it('uses defaults and ignores unpopulated or incomplete project rows', () => {
    const home: HomeGlobal = {
      featuredProjects: {
        action: {
          href: ' ',
          label: ' ',
        },
        description: ' ',
        heading: ' ',
        projects: [
          {
            id: 'unpopulated',
            project: 1,
          },
          {
            id: 'missing-description',
            project: createProject({
              id: 2,
              shortDescription: ' ',
              slug: 'missing-description',
              title: 'Missing Description',
            }),
          },
          {
            id: 'valid',
            project: createProject({
              id: 3,
              title: 'Valid Project',
            }),
          },
        ],
      },
      id: 1,
    };

    expect(normalizeFeaturedProjectsData(home)).toEqual({
      ...defaultFeaturedProjectsData,
      projects: [
        {
          description:
            'A community-led project summary suitable for a featured card.',
          image: null,
          title: 'Valid Project',
          url: '/projects/example',
        },
      ],
    });
  });

  it('derives project URLs from titles when legacy projects have no slug', () => {
    const home: HomeGlobal = {
      featuredProjects: {
        projects: [
          {
            id: 'legacy',
            project: createProject({
              slug: ' ',
              title: 'Legacy Featured Project',
            }),
          },
        ],
      },
      id: 1,
    };

    expect(normalizeFeaturedProjectsData(home).projects).toEqual([
      {
        description:
          'A community-led project summary suitable for a featured card.',
        image: null,
        title: 'Legacy Featured Project',
        url: '/projects/legacy-featured-project',
      },
    ]);
  });
});
