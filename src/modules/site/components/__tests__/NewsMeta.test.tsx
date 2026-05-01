import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NewsMeta from '../NewsMeta';

describe('NewsMeta', () => {
  it('renders the publish date as semantic time content', () => {
    render(<NewsMeta date='May 1, 2026' dateTime='2026-05-01' />);

    const time = screen.getByText('May 1, 2026');

    expect(time.tagName).toBe('TIME');
    expect(time).toHaveAttribute('dateTime', '2026-05-01');
  });

  it('renders linked tags from slugs and keeps the default badge color without custom classes', () => {
    render(
      <NewsMeta
        date='May 1, 2026'
        tags={[{ id: 1, name: 'Research', slug: 'research' }]}
      />,
    );

    const tag = screen.getByRole('link', { name: 'Research' });

    expect(tag).toHaveAttribute('href', '/news?tag=research');
    expect(tag).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('applies optional badge color classes to tags', () => {
    render(
      <NewsMeta
        date='May 1, 2026'
        tags={[
          {
            badgeClassName:
              'bg-emerald-100 text-emerald-950 dark:bg-emerald-900/40 dark:text-emerald-100',
            name: 'Culture',
            slug: 'culture',
          },
        ]}
      />,
    );

    const tag = screen.getByRole('link', { name: 'Culture' });

    expect(tag).toHaveClass('bg-emerald-100', 'text-emerald-950');
    expect(tag).not.toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('renders a non-link badge when a tag has no href or slug', () => {
    render(
      <NewsMeta
        date='May 1, 2026'
        tagHrefBasePath={null}
        tags={[{ name: 'Announcements', slug: 'announcements' }]}
      />,
    );

    expect(
      screen.queryByRole('link', { name: 'Announcements' }),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Announcements')).toHaveClass('bg-primary');
  });

  it('filters out empty tag labels and supports wrapper props', () => {
    render(
      <NewsMeta
        aria-label='News details'
        className='custom-news-meta'
        date='May 1, 2026'
        tags={[{ name: '   ', slug: 'empty' }, null, { name: 'Wellness' }]}
      />,
    );

    const meta = screen.getByLabelText('News details');

    expect(meta).toHaveClass('custom-news-meta');
    expect(screen.queryByText('empty')).not.toBeInTheDocument();
    expect(screen.getByText('Wellness')).toBeInTheDocument();
  });
});
