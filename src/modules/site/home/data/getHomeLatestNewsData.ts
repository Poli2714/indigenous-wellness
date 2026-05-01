import configPromise from '@payload-config';
import { getPayload } from 'payload';

import type { Config, NewsTag } from '@/payload-types';
import { getNewsTagBadgeClassName } from '@/modules/news/payload/collections/newsTags';

import type { NewsMetaTag } from '../../components/NewsMeta';
import type { HomeLatestNewsItemNews } from '../components/HomeLatestNewsItem';
import {
  defaultHomeLatestNewsData,
  type HomeLatestNewsData,
} from './homeLatestNewsDefaults';

type News = Config['collections']['news'];

function getFilledString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function formatNewsDate(dateTime: string) {
  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(date);
}

function normalizeTag(tag: NewsTag): NewsMetaTag | null {
  const name = getFilledString(tag.name);
  const slug = getFilledString(tag.slug);

  if (!name || !slug) {
    return null;
  }

  return {
    badgeClassName: getNewsTagBadgeClassName(tag.badgeColor),
    id: tag.id,
    name,
    slug,
  };
}

export function normalizeNewsItem(news: News): HomeLatestNewsItemNews | null {
  const title = getFilledString(news.title);
  const description = getFilledString(news.description);
  const slug = getFilledString(news.slug);
  const dateTime = getFilledString(news.publishedAt);

  if (!title || !description || !slug || !dateTime) {
    return null;
  }

  const date = formatNewsDate(dateTime);

  if (!date) {
    return null;
  }

  return {
    date,
    dateTime,
    description,
    slug,
    tags: (news.tags ?? []).reduce<NewsMetaTag[]>((items, tag) => {
      const normalizedTag =
        tag && typeof tag === 'object' ? normalizeTag(tag) : null;

      if (normalizedTag) {
        items.push(normalizedTag);
      }

      return items;
    }, []),
    title,
  };
}

export async function getHomeLatestNewsData(): Promise<HomeLatestNewsData> {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const latestNews = await payload.find({
      collection: 'news',
      depth: 1,
      limit: 3,
      sort: '-publishedAt',
      where: {
        publishedAt: {
          less_than_equal: new Date().toISOString(),
        },
      },
    });

    return {
      ...defaultHomeLatestNewsData,
      news: latestNews.docs.reduce<HomeLatestNewsItemNews[]>((items, item) => {
        const normalizedItem = normalizeNewsItem(item);

        if (normalizedItem) {
          items.push(normalizedItem);
        }

        return items;
      }, []),
    };
  } catch {
    return defaultHomeLatestNewsData;
  }
}
