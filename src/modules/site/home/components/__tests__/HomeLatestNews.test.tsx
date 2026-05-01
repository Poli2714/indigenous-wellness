import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { HomeLatestNewsData } from '../../data/homeLatestNewsDefaults';
import HomeLatestNews, { HomeLatestNewsView } from '../HomeLatestNews';

const latestNewsDataMock = vi.hoisted(() => ({
  getHomeLatestNewsData: vi.fn(),
}));

vi.mock('../../data/getHomeLatestNewsData', () => ({
  getHomeLatestNewsData: latestNewsDataMock.getHomeLatestNewsData,
}));

const latestNewsData: HomeLatestNewsData = {
  action: {
    href: '/news',
    label: 'View all news',
  },
  heading: 'Latest News',
  news: [
    {
      date: 'May 1, 2026',
      dateTime: '2026-05-01T00:00:00.000Z',
      description: 'A first community-led wellness update.',
      slug: 'first-news-item',
      tags: [{ name: 'Research', slug: 'research' }],
      title: 'First news item',
    },
    {
      date: 'April 24, 2026',
      dateTime: '2026-04-24T00:00:00.000Z',
      description: 'A second community-led wellness update.',
      slug: 'second-news-item',
      title: 'Second news item',
    },
    {
      date: 'April 17, 2026',
      dateTime: '2026-04-17T00:00:00.000Z',
      description: 'A third community-led wellness update.',
      slug: 'third-news-item',
      title: 'Third news item',
    },
  ],
};

describe('HomeLatestNews', () => {
  beforeEach(() => {
    latestNewsDataMock.getHomeLatestNewsData.mockReset();
  });

  it('renders latest news from the Payload data loader', async () => {
    latestNewsDataMock.getHomeLatestNewsData.mockResolvedValue(latestNewsData);

    const { container } = render(
      await HomeLatestNews({ className: 'custom-latest-news' }),
    );

    expect(latestNewsDataMock.getHomeLatestNewsData).toHaveBeenCalledTimes(1);
    expect(container.querySelector('section')).toHaveClass(
      'custom-latest-news',
    );
    expect(
      screen.getByRole('heading', { level: 2, name: 'Latest News' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View all news' })).toHaveAttribute(
      'href',
      '/news',
    );
    expect(
      screen.getByRole('link', { name: 'First news item' }),
    ).toHaveAttribute('href', '/news/first-news-item');
    expect(screen.getByRole('link', { name: 'Research' })).toHaveAttribute(
      'href',
      '/news?tag=research',
    );
    expect(
      screen.getByText('A third community-led wellness update.'),
    ).toBeInTheDocument();
  });

  it('renders nothing when there are no latest news items', () => {
    const { container } = render(
      <HomeLatestNewsView data={{ ...latestNewsData, news: [] }} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('limits the rendered latest news items to three', () => {
    render(
      <HomeLatestNewsView
        data={{
          ...latestNewsData,
          news: [
            ...latestNewsData.news,
            {
              date: 'April 10, 2026',
              description: 'A fourth community-led wellness update.',
              slug: 'fourth-news-item',
              title: 'Fourth news item',
            },
          ],
        }}
      />,
    );

    expect(
      screen.getByRole('link', { name: 'Third news item' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Fourth news item' }),
    ).not.toBeInTheDocument();
  });

  it('supports custom section props and accessible labelling', () => {
    const { container } = render(
      <HomeLatestNewsView
        aria-labelledby='custom-latest-news-heading'
        data={latestNewsData}
        data-testid='latest-news-section'
      />,
    );

    const section = container.querySelector('section');

    expect(section).toHaveAttribute(
      'aria-labelledby',
      'custom-latest-news-heading',
    );
    expect(section).toHaveAttribute('data-testid', 'latest-news-section');
    expect(
      screen.getByRole('heading', { name: 'Latest News' }),
    ).toHaveAttribute('id', 'custom-latest-news-heading');
  });
});
