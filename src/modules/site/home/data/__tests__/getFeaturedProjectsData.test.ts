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
    href: '/projects/example',
    id: 1,
    shortDescription:
      'A community-led project summary suitable for a featured card.',
    title: 'Example Project',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('normalizeFeaturedProjectsData', () => {
  it('normalizes home global copy and ordered project relationships', () => {
    const firstProject = createProject({
      href: '/projects/first',
      id: 1,
      image: media,
      imageAlt: 'Custom project image alt',
      title: 'First Project',
    });
    const secondProject = createProject({
      href: 'https://example.com/second',
      id: 2,
      newTab: true,
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
          newTab: undefined,
          title: 'First Project',
          url: '/projects/first',
        },
        {
          description:
            'A community-led project summary suitable for a featured card.',
          image: null,
          newTab: true,
          title: 'Second Project',
          url: 'https://example.com/second',
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
            id: 'missing-url',
            project: createProject({
              href: ' ',
              id: 2,
              title: 'Missing URL',
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
          newTab: undefined,
          title: 'Valid Project',
          url: '/projects/example',
        },
      ],
    });
  });
});
