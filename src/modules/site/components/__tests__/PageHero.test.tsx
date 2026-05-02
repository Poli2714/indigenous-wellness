import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import PageHero, { type PageHeroData } from '../PageHero';

const heroData: PageHeroData = {
  description:
    'Current projects created through respectful research relationships.',
  heading: 'Current Projects',
};

describe('PageHero', () => {
  it('renders page hero copy', () => {
    render(<PageHero data={heroData} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Current Projects',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(heroData.description ?? '')).toBeInTheDocument();
  });

  it('renders only the provided hero content', () => {
    render(<PageHero data={{ description: heroData.description }} />);

    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByText(heroData.description ?? '')).toBeInTheDocument();
  });

  it('renders nothing when no values are provided', () => {
    const { container, rerender } = render(<PageHero />);

    expect(container).toBeEmptyDOMElement();

    rerender(<PageHero data={{ description: ' ', heading: '' }} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('supports native header props', () => {
    const { container } = render(
      <PageHero
        className='custom-page-hero'
        data={heroData}
        data-testid='page-hero'
      />,
    );

    const header = container.querySelector('header');

    expect(screen.getByTestId('page-hero')).toBe(header);
    expect(header).toHaveClass('custom-page-hero');
  });
});
