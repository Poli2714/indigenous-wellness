import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NavItem from '../NavItem';

describe('NavItem', () => {
  it('renders a navigation link with the provided label and href', () => {
    render(<NavItem href='/about' label='About' />);

    const link = screen.getByRole('link', { name: 'About' });

    expect(link).toHaveAttribute('href', '/about');
  });

  it('marks the current page when requested', () => {
    render(<NavItem current href='/programs' label='Programs' />);

    const link = screen.getByRole('link', { name: 'Programs' });

    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('forwards link props and merges custom classes', () => {
    render(
      <NavItem
        className='custom-nav-item'
        href='/resources'
        label='Resources'
        prefetch={false}
      />,
    );

    const link = screen.getByRole('link', { name: 'Resources' });

    expect(link).toHaveClass('custom-nav-item');
  });
});
