import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CompletedProjectCard, {
  type CompletedProject,
} from '../CompletedProjectCard';

const project: CompletedProject = {
  completionYear: 2024,
  description:
    'A completed community-led research project with practical wellness outcomes.',
  logo: {
    alt: 'Completed Wellness logo',
    height: 300,
    url: '/api/media/file/completed-wellness-logo.png',
    width: 300,
  },
  title: 'Completed Wellness Project',
  url: '/projects/completed-wellness',
};

describe('CompletedProjectCard', () => {
  it('renders completed project content and links', () => {
    render(<CompletedProjectCard project={project} />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Completed Wellness Project',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Completed in 2024')).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/projects/completed-wellness');
    }
    expect(screen.getByRole('link', { name: 'Read more' })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Completed Wellness logo' }),
    ).toHaveAttribute(
      'src',
      expect.stringContaining('completed-wellness-logo.png'),
    );
  });

  it('supports native article props and image options', () => {
    render(
      <CompletedProjectCard
        className='custom-completed-project-card'
        data-testid='completed-project-card'
        imagePriority
        logoSizes='5rem'
        project={project}
      />,
    );

    const article = screen.getByTestId('completed-project-card');
    const image = screen.getByRole('img', { name: 'Completed Wellness logo' });

    expect(article).toHaveClass('custom-completed-project-card');
    expect(image).toHaveAttribute('sizes', '5rem');
  });

  it('uses the default logo and hides the year when those values are unavailable', () => {
    render(
      <CompletedProjectCard
        project={{
          ...project,
          completionYear: null,
          logo: null,
        }}
      />,
    );

    expect(screen.queryByText(/Completed in/)).not.toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Pewaseskwan logo' }),
    ).toHaveAttribute('src', expect.stringContaining('pewaseskwan-logo.png'));
  });
});
