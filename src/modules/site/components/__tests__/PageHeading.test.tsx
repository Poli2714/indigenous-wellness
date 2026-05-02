import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import PageHeading from '../PageHeading';

describe('PageHeading', () => {
  it('renders children as a first-level heading with default typography', () => {
    render(<PageHeading>Current Projects</PageHeading>);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Current Projects',
    });

    expect(heading).toHaveClass(
      'max-w-160',
      'font-semibold',
      'tracking-tight',
      'text-balance',
    );
  });

  it('supports custom classes and native heading props', () => {
    render(
      <PageHeading
        aria-label='Current research projects'
        className='custom-page-heading max-w-none'
        data-testid='page-heading'
        id='projects-heading'
      >
        Projects
      </PageHeading>,
    );

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Current research projects',
    });

    expect(heading).toHaveAttribute('id', 'projects-heading');
    expect(heading).toHaveAttribute('data-testid', 'page-heading');
    expect(heading).toHaveClass('custom-page-heading', 'max-w-none');
    expect(heading).not.toHaveClass('max-w-160');
  });
});
