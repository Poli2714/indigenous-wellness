import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProjectCard, { type ProjectCardProject } from '../ProjectCard';

const project: ProjectCardProject = {
  description:
    'Community-led research supporting Indigenous health and wellness priorities.',
  image: {
    alt: 'People walking together outside a community building',
    height: 900,
    url: '/media/project-card.jpg',
    width: 1200,
  },
  title: 'Community Wellness Project',
  url: '/projects/community-wellness',
};

describe('ProjectCard', () => {
  it('renders the project card as a link with content and image', () => {
    render(<ProjectCard project={project} />);

    const link = screen.getByRole('link', {
      name: 'Community Wellness Project',
    });

    expect(link).toHaveAttribute('href', '/projects/community-wellness');
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Community Wellness Project',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Read more' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: 'People walking together outside a community building',
      }),
    ).toHaveAttribute('src', expect.stringContaining('project-card.jpg'));
  });

  it('renders an accessible card with a decorative fallback when no image is available', () => {
    const { container } = render(
      <ProjectCard
        className='custom-project-card'
        imageClassName='aspect-video'
        project={{
          ...project,
          image: null,
        }}
      />,
    );

    const link = screen.getByRole('link', {
      name: 'Community Wellness Project',
    });
    const fallback = container.querySelector('[aria-hidden="true"]');

    expect(link).toHaveClass('custom-project-card');
    expect(container.querySelector('.aspect-video')).toBeInTheDocument();
    expect(fallback?.querySelector('svg')).toHaveAttribute(
      'focusable',
      'false',
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('supports image loading options and new tab links', () => {
    render(
      <ProjectCard
        imagePriority
        imageSizes='50vw'
        project={{
          ...project,
          newTab: true,
          url: 'https://example.com/projects/community-wellness',
        }}
      />,
    );

    const link = screen.getByRole('link', {
      name: 'Community Wellness Project',
    });
    const image = screen.getByRole('img', {
      name: 'People walking together outside a community building',
    });

    expect(link).toHaveAttribute(
      'href',
      'https://example.com/projects/community-wellness',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
    expect(image).toHaveAttribute('sizes', '50vw');
  });

  it('supports native link props and custom labelling', () => {
    render(
      <ProjectCard
        aria-labelledby='custom-project-heading'
        className='custom-project-card'
        data-testid='project-card'
        project={project}
      />,
    );

    const link = screen.getByTestId('project-card');

    expect(link).toHaveAttribute('href', '/projects/community-wellness');
    expect(link).toHaveClass('custom-project-card');
    expect(link).toHaveAttribute('aria-labelledby', 'custom-project-heading');
    expect(
      screen.getByRole('heading', { name: 'Community Wellness Project' }),
    ).toHaveAttribute('id', 'custom-project-heading');
  });
});
