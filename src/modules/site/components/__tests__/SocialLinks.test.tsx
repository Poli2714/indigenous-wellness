import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SocialLinks from '../SocialLinks';

const socialLinks = [
  { href: 'https://www.facebook.com/pewaseskwan', label: 'Facebook' },
  { href: 'https://www.instagram.com/pewaseskwan', label: 'Instagram' },
  { href: 'https://www.youtube.com/pewaseskwan', label: 'YouTube' },
];

describe('SocialLinks', () => {
  it('renders social links as a list', () => {
    render(<SocialLinks socialLinks={socialLinks} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
      'href',
      'https://www.facebook.com/pewaseskwan',
    );
  });

  it('renders decorative external-link icons inside each link', () => {
    render(<SocialLinks socialLinks={socialLinks} />);

    for (const link of screen.getAllByRole('link')) {
      const icon = link.querySelector('svg');

      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveAttribute('focusable', 'false');
    }
  });

  it('supports custom list props and forwarded link props', () => {
    render(
      <SocialLinks
        aria-label='Social media links'
        className='custom-social-list'
        socialLinks={[
          {
            className: 'custom-social-link',
            href: 'https://www.linkedin.com/company/pewaseskwan',
            label: 'LinkedIn',
            listItemClassName: 'custom-social-item',
            rel: 'noreferrer',
            target: '_blank',
          },
        ]}
      />,
    );

    const list = screen.getByRole('list', { name: 'Social media links' });
    const link = screen.getByRole('link', { name: 'LinkedIn' });

    expect(list).toHaveClass('custom-social-list');
    expect(screen.getByRole('listitem')).toHaveClass('custom-social-item');
    expect(link).toHaveClass('custom-social-link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('can render links for dark backgrounds', () => {
    render(<SocialLinks onDarkBackgroundOnly socialLinks={socialLinks} />);

    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveClass(
      'text-base-200',
    );
  });

  it('does not render an empty list', () => {
    const { container } = render(<SocialLinks socialLinks={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
