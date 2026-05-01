import type { HomeLatestNewsItemNews } from '../components/HomeLatestNewsItem';

export type HomeLatestNewsLink = {
  href: string;
  label: string;
};

export type HomeLatestNewsData = {
  action: HomeLatestNewsLink;
  heading: string;
  news: HomeLatestNewsItemNews[];
};

export const defaultHomeLatestNewsData: HomeLatestNewsData = {
  action: {
    href: '/news',
    label: 'View all news',
  },
  heading: 'Latest News',
  news: [],
};
