import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FooterNavItem from '../FooterNavItem';

describe('FooterNavItem', () => {
  it('renders a list item with the provided link label and href', () => {
    render(<FooterNavItem href='/about' label='About' />);

    const link = screen.getByRole('link', { name: 'About' });

    expect(screen.getByRole('listitem')).toContainElement(link);
    expect(link).toHaveAttribute('href', '/about');
  });

  it('forwards link props and merges custom link classes', () => {
    render(
      <FooterNavItem
        className='custom-footer-link'
        href='/projects'
        label='Projects'
        prefetch={false}
      />,
    );

    const link = screen.getByRole('link', { name: 'Projects' });

    expect(link).toHaveClass('custom-footer-link');
  });

  it('supports custom list item classes', () => {
    render(
      <FooterNavItem
        href='/news'
        label='News'
        listItemClassName='custom-list-item'
      />,
    );

    expect(screen.getByRole('listitem')).toHaveClass('custom-list-item');
  });
});
