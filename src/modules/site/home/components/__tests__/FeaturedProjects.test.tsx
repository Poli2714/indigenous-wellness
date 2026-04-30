import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { FeaturedProjectsData } from '../../data/featuredProjectsDefaults';
import FeaturedProjects, { FeaturedProjectsView } from '../FeaturedProjects';

const featuredProjectsDataMock = vi.hoisted(() => ({
  getFeaturedProjectsData: vi.fn(),
}));

vi.mock('../../data/getFeaturedProjectsData', () => ({
  getFeaturedProjectsData: featuredProjectsDataMock.getFeaturedProjectsData,
}));

const featuredProjectsData: FeaturedProjectsData = {
  action: {
    href: '/projects',
    label: 'View all projects',
  },
  description:
    'Selected projects rooted in community-led Indigenous health research.',
  heading: 'Featured research projects',
  projects: [
    {
      description: 'A short summary for project one.',
      image: {
        alt: 'Project one community workshop',
        height: 900,
        url: '/media/project-one.jpg',
        width: 1200,
      },
      title: 'Project One',
      url: '/projects/project-one',
    },
    {
      description: 'A short summary for project two.',
      title: 'Project Two',
      url: '/projects/project-two',
    },
    {
      description: 'A short summary for project three.',
      title: 'Project Three',
      url: '/projects/project-three',
    },
    {
      description: 'A short summary for project four.',
      newTab: true,
      title: 'Project Four',
      url: 'https://example.com/project-four',
    },
  ],
};

describe('FeaturedProjects', () => {
  beforeEach(() => {
    featuredProjectsDataMock.getFeaturedProjectsData.mockReset();
  });

  it('renders CMS-managed featured project content', async () => {
    featuredProjectsDataMock.getFeaturedProjectsData.mockResolvedValue(
      featuredProjectsData,
    );

    const { container } = render(
      await FeaturedProjects({ className: 'custom-featured-projects' }),
    );

    expect(
      featuredProjectsDataMock.getFeaturedProjectsData,
    ).toHaveBeenCalledTimes(1);
    expect(container.querySelector('section')).toHaveClass(
      'custom-featured-projects',
    );
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Featured research projects',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Selected projects rooted in community-led Indigenous health research.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'View all projects' }),
    ).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Project One' })).toHaveAttribute(
      'href',
      '/projects/project-one',
    );
    expect(screen.getByRole('link', { name: 'Project Four' })).toHaveAttribute(
      'target',
      '_blank',
    );
    expect(
      screen.getByRole('img', {
        name: 'Project one community workshop',
      }),
    ).toHaveAttribute('src', expect.stringContaining('project-one.jpg'));
  });

  it('renders nothing when there are no featured projects', () => {
    const { container } = render(
      <FeaturedProjectsView
        data={{
          ...featuredProjectsData,
          projects: [],
        }}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('supports custom section props and accessible labelling', () => {
    const { container } = render(
      <FeaturedProjectsView
        aria-labelledby='custom-featured-heading'
        data={featuredProjectsData}
        data-testid='featured-projects-section'
      />,
    );

    const section = container.querySelector('section');

    expect(section).toHaveAttribute(
      'aria-labelledby',
      'custom-featured-heading',
    );
    expect(section).toHaveAttribute('data-testid', 'featured-projects-section');
    expect(
      screen.getByRole('heading', { name: 'Featured research projects' }),
    ).toHaveAttribute('id', 'custom-featured-heading');
  });

  it('limits the rendered project cards to five projects', () => {
    render(
      <FeaturedProjectsView
        data={{
          ...featuredProjectsData,
          projects: [
            ...featuredProjectsData.projects,
            {
              description: 'A short summary for project five.',
              title: 'Project Five',
              url: '/projects/project-five',
            },
            {
              description: 'A short summary for project six.',
              title: 'Project Six',
              url: '/projects/project-six',
            },
          ],
        }}
      />,
    );

    expect(
      screen.getByRole('link', { name: 'Project Five' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Project Six' }),
    ).not.toBeInTheDocument();
  });
});
