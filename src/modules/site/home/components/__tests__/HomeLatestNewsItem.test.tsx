import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomeLatestNewsItem, {
  type HomeLatestNewsItemNews,
} from '../HomeLatestNewsItem';

const news: HomeLatestNewsItemNews = {
  date: 'May 1, 2026',
  dateTime: '2026-05-01',
  description:
    'A community-led update about Indigenous wellness research and practice.',
  slug: 'community-wellness-update',
  tags: [
    {
      badgeClassName: 'bg-emerald-100 text-emerald-950',
      id: 1,
      name: 'Research',
      slug: 'research',
    },
  ],
  title: 'Community wellness update',
};

describe('HomeLatestNewsItem', () => {
  it('renders a linked news item with metadata and description', () => {
    render(<HomeLatestNewsItem news={news} />);

    const link = screen.getByRole('link', {
      name: 'Community wellness update',
    });
    const date = screen.getByText('May 1, 2026');
    const tag = screen.getByRole('link', { name: 'Research' });

    expect(link).toHaveAttribute('href', '/news/community-wellness-update');
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Community wellness update',
      }),
    ).toBeInTheDocument();
    expect(date.tagName).toBe('TIME');
    expect(date).toHaveAttribute('dateTime', '2026-05-01');
    expect(tag).toHaveAttribute('href', '/news?tag=research');
    expect(tag).toHaveClass('bg-emerald-100', 'text-emerald-950');
    expect(screen.getByText(news.description)).toBeInTheDocument();
  });

  it('uses an explicit href when one is provided', () => {
    render(
      <HomeLatestNewsItem
        news={{
          ...news,
          href: '/updates/community-wellness-update',
        }}
      />,
    );

    expect(
      screen.getByRole('link', { name: 'Community wellness update' }),
    ).toHaveAttribute('href', '/updates/community-wellness-update');
  });

  it('supports custom article props and accessible labelling', () => {
    render(
      <HomeLatestNewsItem
        aria-labelledby='custom-news-heading'
        className='custom-news-item'
        data-testid='latest-news-item'
        headingLevel={4}
        news={news}
      />,
    );

    const item = screen.getByTestId('latest-news-item');

    expect(item.tagName).toBe('ARTICLE');
    expect(item).toHaveClass('custom-news-item');
    expect(item).toHaveAttribute('aria-labelledby', 'custom-news-heading');
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Community wellness update',
      }),
    ).toHaveAttribute('id', 'custom-news-heading');
  });

  it('normalizes slugs with accidental leading slashes', () => {
    render(
      <HomeLatestNewsItem
        news={{
          ...news,
          slug: '/community-wellness-update',
        }}
      />,
    );

    expect(
      screen.getByRole('link', { name: 'Community wellness update' }),
    ).toHaveAttribute('href', '/news/community-wellness-update');
  });
});
