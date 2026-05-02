import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CurrentProjectItem, { type CurrentProject } from '../CurrentProjectItem';

const project: CurrentProject = {
  description:
    'Community-led research supporting Indigenous wellness priorities.',
  logo: {
    alt: 'Community Wellness logo',
    height: 300,
    url: '/media/community-wellness-logo.png',
    width: 300,
  },
  title: 'Community Wellness Project',
  url: '/projects/community-wellness',
};

describe('CurrentProjectItem', () => {
  it('renders a numbered project list item with linked logo, title and action', () => {
    render(<CurrentProjectItem position={1} project={project} />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Community Wellness Project',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('01.')).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/projects/community-wellness');
    }

    expect(
      screen.getByRole('img', { name: 'Community Wellness logo' }),
    ).toHaveAttribute(
      'src',
      expect.stringContaining('community-wellness-logo.png'),
    );
    expect(
      screen.getByRole('link', { name: 'View Community Wellness Project' }),
    ).toBeInTheDocument();
  });

  it('supports string positions and custom list item props', () => {
    render(
      <CurrentProjectItem
        className='custom-current-project-item'
        data-testid='current-project-item'
        position='07.'
        project={{
          ...project,
          url: '/projects/custom-community-wellness',
        }}
      />,
    );

    const listItem = screen.getByTestId('current-project-item');
    const links = screen.getAllByRole('link');

    expect(listItem).toHaveClass('custom-current-project-item');
    expect(screen.getByText('07.')).toBeInTheDocument();
    for (const link of links) {
      expect(link).toHaveAttribute(
        'href',
        '/projects/custom-community-wellness',
      );
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    }
  });

  it('uses the default logo when a project logo is unavailable', () => {
    render(
      <CurrentProjectItem
        imagePriority
        logoSizes='6rem'
        position={2}
        project={{
          ...project,
          logo: null,
        }}
      />,
    );

    const image = screen.getByRole('img', { name: 'Pewaseskwan logo' });

    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('pewaseskwan-logo.png'),
    );
    expect(image).toHaveAttribute('sizes', '6rem');
  });
});
