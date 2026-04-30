import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ArrowLink from '../ArrowLink';

describe('ArrowLink', () => {
  it('renders children inside a link with default styles', () => {
    render(<ArrowLink href='/our-work'>Our work</ArrowLink>);

    const link = screen.getByRole('link', { name: 'Our work' });

    expect(link).toHaveAttribute('href', '/our-work');
    expect(link).toHaveClass('group', 'max-w-max', 'font-medium');
  });

  it('renders a decorative arrow icon', () => {
    render(<ArrowLink href='/about'>About</ArrowLink>);

    const icon = screen
      .getByRole('link', { name: 'About' })
      .querySelector('svg');

    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('focusable', 'false');
  });

  it('supports custom classes and native link props', () => {
    render(
      <ArrowLink
        aria-current='page'
        className='custom-arrow-link max-w-none'
        data-testid='arrow-link'
        href='/resources'
        iconClassName='custom-arrow-icon size-5'
        prefetch={false}
      >
        Resources
      </ArrowLink>,
    );

    const link = screen.getByRole('link', { name: 'Resources' });
    const icon = link.querySelector('svg');

    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveAttribute('data-testid', 'arrow-link');
    expect(link).toHaveClass('custom-arrow-link', 'max-w-none');
    expect(link).not.toHaveClass('max-w-max');
    expect(icon).toHaveClass('custom-arrow-icon', 'size-5');
    expect(icon).not.toHaveClass('size-4.5');
  });

  it('adds safe rel defaults for links opened in a new tab', () => {
    render(
      <ArrowLink href='https://example.com' target='_blank'>
        External resource
      </ArrowLink>,
    );

    const link = screen.getByRole('link', { name: 'External resource' });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('respects explicit rel values', () => {
    render(
      <ArrowLink href='https://example.com' rel='external' target='_blank'>
        External resource
      </ArrowLink>,
    );

    expect(
      screen.getByRole('link', { name: 'External resource' }),
    ).toHaveAttribute('rel', 'external');
  });
});
