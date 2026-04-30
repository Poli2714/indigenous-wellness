import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Section from '../Section';

describe('Section', () => {
  it('renders children inside a semantic section with default spacing', () => {
    const { container } = render(
      <Section>
        <h2>Community priorities</h2>
      </Section>,
    );

    const section = container.querySelector('section');

    expect(section).toContainElement(
      screen.getByRole('heading', { level: 2, name: 'Community priorities' }),
    );
    expect(section).toHaveClass('flex', 'w-full', 'flex-col', 'px-4');
  });

  it('supports custom classes and standard section props', () => {
    render(
      <Section
        aria-label='Research partnerships'
        className='custom-section md:px-12'
        data-testid='site-section'
        id='research-partnerships'
      />,
    );

    const section = screen.getByRole('region', {
      name: 'Research partnerships',
    });

    expect(section).toHaveAttribute('id', 'research-partnerships');
    expect(section).toHaveAttribute('data-testid', 'site-section');
    expect(section).toHaveClass('custom-section', 'md:px-12');
    expect(section).not.toHaveClass('md:px-8');
  });

  it('supports native aria-labelledby labelling', () => {
    render(
      <>
        <h2 id='section-heading'>Indigenous wellness</h2>
        <Section aria-labelledby='section-heading' />
      </>,
    );

    expect(
      screen.getByRole('region', { name: 'Indigenous wellness' }),
    ).toHaveAttribute('aria-labelledby', 'section-heading');
  });
});
