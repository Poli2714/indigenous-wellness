import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NavItems from '../NavItems';

const navItems = [
  { href: '/about', label: 'About' },
  { current: true, href: '/programs', label: 'Programs' },
  { href: '/resources', label: 'Resources' },
];

describe('NavItems', () => {
  it('renders a labelled navigation landmark with its items', () => {
    render(<NavItems navItems={navItems} />);

    const navigation = screen.getByRole('navigation', {
      name: 'Site navigation',
    });

    expect(navigation).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
  });

  it('passes current state through to nav links', () => {
    render(<NavItems navItems={navItems} />);

    expect(screen.getByRole('link', { name: 'Programs' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('supports custom navigation and list props', () => {
    render(
      <NavItems
        aria-label='Primary'
        className='custom-nav'
        listClassName='custom-list'
        navItems={navItems}
      />,
    );

    const navigation = screen.getByRole('navigation', { name: 'Primary' });
    const list = screen.getByRole('list');

    expect(navigation).toHaveClass('custom-nav');
    expect(list).toHaveClass('custom-list');
  });

  it('does not render an empty navigation landmark', () => {
    const { container } = render(<NavItems navItems={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
