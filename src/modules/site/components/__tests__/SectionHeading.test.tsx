import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SectionHeading from '../SectionHeading';

describe('SectionHeading', () => {
  it('renders children as a second-level heading with default typography', () => {
    render(<SectionHeading>Community-led research</SectionHeading>);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Community-led research',
    });

    expect(heading).toHaveClass('max-w-150', 'font-semibold', 'tracking-tight');
  });

  it('supports custom classes and native heading props', () => {
    render(
      <SectionHeading
        aria-label='About Indigenous wellness'
        className='custom-heading max-w-none'
        data-testid='section-heading'
        id='about'
      >
        About
      </SectionHeading>,
    );

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Indigenous wellness',
    });

    expect(heading).toHaveAttribute('id', 'about');
    expect(heading).toHaveAttribute('data-testid', 'section-heading');
    expect(heading).toHaveClass('custom-heading', 'max-w-none');
    expect(heading).not.toHaveClass('max-w-150');
  });
});
