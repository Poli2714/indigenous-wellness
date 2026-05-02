import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CurrentProjectsList from '../CurrentProjectsList';
import type { CurrentProject } from '../CurrentProjectItem';

const projects: CurrentProject[] = [
  {
    description: 'Community-led research supporting wellness priorities.',
    logo: {
      alt: 'Community Wellness logo',
      height: 300,
      url: '/media/community-wellness-logo.png',
      width: 300,
    },
    title: 'Community Wellness Project',
    url: '/projects/community-wellness',
  },
  {
    description: 'A land-based education project with youth and Elders.',
    logo: {
      alt: 'Land Learning logo',
      height: 240,
      url: '/media/land-learning-logo.png',
      width: 240,
    },
    title: 'Land Learning Project',
    url: '/projects/land-learning',
  },
];

describe('CurrentProjectsList', () => {
  it('renders current projects as an ordered visual list', () => {
    render(<CurrentProjectsList projects={projects} />);

    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');

    expect(items).toHaveLength(2);
    expect(screen.getByText('01.')).toBeInTheDocument();
    expect(screen.getByText('02.')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Community Wellness Project' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Land Learning Project' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Community Wellness logo' }),
    ).toHaveAttribute(
      'src',
      expect.stringContaining('community-wellness-logo.png'),
    );
  });

  it('passes through list props and project item options', () => {
    render(
      <CurrentProjectsList
        aria-label='Current projects'
        className='custom-current-projects-list'
        data-testid='current-projects-list'
        logoSizes='8rem'
        priorityLogoCount={2}
        projects={projects}
        startPosition={4}
      />,
    );

    const list = screen.getByTestId('current-projects-list');
    const images = screen.getAllByRole('img');

    expect(list).toHaveAttribute('aria-label', 'Current projects');
    expect(list).toHaveClass('custom-current-projects-list');
    expect(screen.getByText('04.')).toBeInTheDocument();
    expect(screen.getByText('05.')).toBeInTheDocument();
    for (const image of images) {
      expect(image).toHaveAttribute('sizes', '8rem');
    }
  });

  it('links each project to its internal project page', () => {
    render(<CurrentProjectsList projects={projects} />);

    const links = screen.getAllByRole('link', {
      name: /Land Learning Project/,
    });

    for (const link of links) {
      expect(link).toHaveAttribute('href', '/projects/land-learning');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    }
  });

  it('renders an empty-state message when no projects are available', () => {
    render(<CurrentProjectsList projects={[]} />);

    expect(
      screen.getByText(
        'We are currently updating our projects. Please check back soon.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
