import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FooterNavItems from '../FooterNavItems';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/news', label: 'News', prefetch: false },
];

describe('FooterNavItems', () => {
  it('renders footer navigation items as a list of links', () => {
    render(<FooterNavItems navItems={navItems} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(screen.getByRole('link', { name: 'News' })).toHaveAttribute(
      'href',
      '/news',
    );
  });

  it('supports custom list props and forwards item props', () => {
    render(
      <FooterNavItems
        aria-label='Footer company links'
        className='custom-footer-list'
        navItems={[
          {
            className: 'custom-footer-link',
            href: '/team',
            label: 'Team',
            listItemClassName: 'custom-list-item',
          },
        ]}
      />,
    );

    const list = screen.getByRole('list', { name: 'Footer company links' });
    const link = screen.getByRole('link', { name: 'Team' });

    expect(list).toHaveClass('custom-footer-list');
    expect(screen.getByRole('listitem')).toHaveClass('custom-list-item');
    expect(link).toHaveClass('custom-footer-link');
  });

  it('does not render an empty list', () => {
    const { container } = render(<FooterNavItems navItems={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
