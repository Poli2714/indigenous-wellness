import { describe, expect, it } from 'vitest';

import type { Config, NewsTag } from '@/payload-types';

import { normalizeNewsItem } from '../getHomeLatestNewsData';

type News = Config['collections']['news'];

const tag: NewsTag = {
  badgeColor: 'evergreen',
  createdAt: '2026-01-01T00:00:00.000Z',
  id: 1,
  name: 'Research',
  slug: 'research',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

function createNews(overrides: Partial<News> = {}): News {
  return {
    createdAt: '2026-01-01T00:00:00.000Z',
    description: 'A short summary for the latest news section.',
    id: 1,
    publishedAt: '2026-05-01T00:00:00.000Z',
    slug: 'community-wellness-update',
    tags: [tag],
    title: 'Community Wellness Update',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('normalizeNewsItem', () => {
  it('normalizes Payload news records into home latest news item props', () => {
    expect(normalizeNewsItem(createNews())).toEqual({
      date: 'May 1, 2026',
      dateTime: '2026-05-01T00:00:00.000Z',
      description: 'A short summary for the latest news section.',
      slug: 'community-wellness-update',
      tags: [
        {
          badgeClassName:
            'bg-emerald-200 text-emerald-950 hover:bg-emerald-200/80 dark:bg-emerald-900 dark:text-emerald-100 dark:hover:bg-emerald-900/80',
          id: 1,
          name: 'Research',
          slug: 'research',
        },
      ],
      title: 'Community Wellness Update',
    });
  });

  it('ignores unpopulated tags and incomplete news records', () => {
    expect(
      normalizeNewsItem(
        createNews({
          tags: [1, tag],
        }),
      )?.tags,
    ).toEqual([
      {
        badgeClassName:
          'bg-emerald-200 text-emerald-950 hover:bg-emerald-200/80 dark:bg-emerald-900 dark:text-emerald-100 dark:hover:bg-emerald-900/80',
        id: 1,
        name: 'Research',
        slug: 'research',
      },
    ]);

    expect(normalizeNewsItem(createNews({ title: ' ' }))).toBeNull();
    expect(normalizeNewsItem(createNews({ publishedAt: ' ' }))).toBeNull();
    expect(
      normalizeNewsItem(createNews({ publishedAt: 'not-a-date' })),
    ).toBeNull();
  });
});
