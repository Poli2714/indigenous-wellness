import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { defaultFooterData, type FooterData } from '../../data/footerDefaults';
import Footer, { FooterView } from '../Footer';

const footerDataMock = vi.hoisted(() => ({
  getFooterData: vi.fn(),
}));

vi.mock('../../data/getFooterData', () => ({
  getFooterData: footerDataMock.getFooterData,
}));

const cmsFooterData: FooterData = {
  attribution: 'Custom attribution.',
  landAcknowledgement: {
    body: 'Custom acknowledgement body.',
    title: 'CUSTOM ACKNOWLEDGEMENT',
  },
  newsletter: {
    errorMessage: 'Try again later.',
    label: 'Join our updates',
    placeholder: 'name@example.com',
    successMessage: 'You are on the list.',
  },
  primaryNavigation: {
    navItems: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    title: 'PRIMARY',
  },
  projectNavigation: {
    navItems: [
      { href: '/projects/one', label: 'Project One' },
      { href: '/projects/two', label: 'Project Two' },
      { href: '/projects/three', label: 'Project Three' },
    ],
    title: 'PROJECTS',
  },
  socialLinks: [
    {
      href: 'https://example.com/linkedin',
      label: 'LinkedIn',
      newTab: true,
    },
  ],
};

describe('Footer', () => {
  beforeEach(() => {
    footerDataMock.getFooterData.mockReset();
  });

  it('renders CMS-managed footer content', async () => {
    footerDataMock.getFooterData.mockResolvedValue(cmsFooterData);

    const { container } = render(await Footer({ className: 'custom-footer' }));

    expect(footerDataMock.getFooterData).toHaveBeenCalledTimes(1);
    expect(container.querySelector('footer')).toHaveClass('custom-footer');
    expect(screen.getByText('PRIMARY')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(screen.getByText('PROJECTS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Project Three' })).toHaveAttribute(
      'href',
      '/projects/three',
    );
    expect(screen.getByText('CUSTOM ACKNOWLEDGEMENT')).toBeInTheDocument();
    expect(
      screen.getByText('Custom acknowledgement body.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Custom attribution.')).toBeInTheDocument();
    expect(screen.getByLabelText('Join our updates')).toHaveAttribute(
      'placeholder',
      'name@example.com',
    );
    expect(
      screen.getByRole('button', { name: 'Subscribe' }),
    ).toBeInTheDocument();

    const socialLink = screen.getByRole('link', { name: 'LinkedIn' });

    expect(socialLink).toHaveAttribute('href', 'https://example.com/linkedin');
    expect(socialLink).toHaveAttribute('target', '_blank');
    expect(socialLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders default footer data through the view', () => {
    render(<FooterView />);

    expect(
      screen.getByText(defaultFooterData.primaryNavigation.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultFooterData.landAcknowledgement.title),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultFooterData.attribution)).toBeInTheDocument();
    expect(
      screen.getByLabelText(defaultFooterData.newsletter.label),
    ).toHaveAttribute('placeholder', defaultFooterData.newsletter.placeholder);
  });
});
