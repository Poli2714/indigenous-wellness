import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import BrandLink from '../BrandLink';

describe('BrandLink', () => {
  it('renders a home link with a single accessible name', () => {
    render(<BrandLink />);

    const link = screen.getByRole('link', { name: 'Pewaseskwan home' });

    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByText('Pewaseskwan')).toBeInTheDocument();
  });

  it('keeps the logo image decorative inside the labelled link', () => {
    render(<BrandLink />);

    const image = screen.getByRole('presentation', { hidden: true });

    expect(image).toHaveAttribute('alt', '');
  });

  it('supports custom labels, hrefs, and link props', () => {
    render(
      <BrandLink
        className='custom-logo'
        href='/welcome'
        label='Go to welcome page'
        prefetch={false}
      />,
    );

    const link = screen.getByRole('link', { name: 'Go to welcome page' });

    expect(link).toHaveAttribute('href', '/welcome');
    expect(link).toHaveClass('custom-logo');
  });
});
