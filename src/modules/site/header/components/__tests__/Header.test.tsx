import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { defaultHeaderData } from '../../data/headerDefaults';
import Header, { HeaderView } from '../Header';

const headerDataMock = vi.hoisted(() => ({
  getHeaderData: vi.fn(),
}));

const themeMock = vi.hoisted(() => ({
  resolvedTheme: 'light' as 'dark' | 'light' | undefined,
  setTheme: vi.fn(),
}));

vi.mock('../../data/getHeaderData', () => ({
  getHeaderData: headerDataMock.getHeaderData,
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: themeMock.resolvedTheme,
    setTheme: themeMock.setTheme,
  }),
}));

describe('Header', () => {
  beforeEach(() => {
    headerDataMock.getHeaderData.mockReset();
    themeMock.resolvedTheme = 'light';
    themeMock.setTheme.mockClear();
  });

  it('renders CMS-managed brand, navigation, and contact links', async () => {
    headerDataMock.getHeaderData.mockResolvedValue({
      brand: {
        href: '/welcome',
        label: 'Pewaseskwan welcome',
      },
      contactLink: {
        enabled: true,
        href: 'https://example.com/contact',
        label: 'Connect',
        newTab: true,
      },
      navItems: [
        {
          href: '/programs',
          label: 'Programs',
        },
        {
          href: 'https://example.com/resources',
          label: 'Resources',
          newTab: true,
        },
      ],
    });

    const { container } = render(await Header({ className: 'custom-header' }));

    expect(headerDataMock.getHeaderData).toHaveBeenCalledTimes(1);
    expect(container.querySelector('header')).toHaveClass('custom-header');
    expect(
      screen.getByRole('link', { name: 'Pewaseskwan welcome' }),
    ).toHaveAttribute('href', '/welcome');
    expect(screen.getByRole('navigation')).toHaveAccessibleName(
      'Site navigation',
    );
    expect(screen.getByRole('link', { name: 'Programs' })).toHaveAttribute(
      'href',
      '/programs',
    );

    const externalNavLink = screen.getByRole('link', { name: 'Resources' });

    expect(externalNavLink).toHaveAttribute(
      'href',
      'https://example.com/resources',
    );
    expect(externalNavLink).toHaveAttribute('target', '_blank');
    expect(externalNavLink).toHaveAttribute('rel', 'noreferrer');

    const contactLink = screen.getByRole('link', { name: 'Connect' });

    expect(contactLink).toHaveAttribute('href', 'https://example.com/contact');
    expect(contactLink).toHaveAttribute('target', '_blank');
    expect(contactLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('can hide the contact link while keeping the rest of the header', () => {
    render(
      <HeaderView
        data={{
          ...defaultHeaderData,
          contactLink: {
            ...defaultHeaderData.contactLink,
            enabled: false,
          },
        }}
      />,
    );

    expect(
      screen.queryByRole('link', { name: 'Contact' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Pewaseskwan home' }),
    ).toHaveAttribute('href', '/');
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
