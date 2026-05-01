import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import ArrowLink from '../../components/ArrowLink';
import Section from '../../components/Section';
import SectionHeading from '../../components/SectionHeading';
import {
  defaultHomeLatestNewsData,
  type HomeLatestNewsData,
} from '../data/homeLatestNewsDefaults';
import { getHomeLatestNewsData } from '../data/getHomeLatestNewsData';
import HomeLatestNewsItem from './HomeLatestNewsItem';

type HomeLatestNewsProps = Omit<ComponentProps<typeof Section>, 'children'> & {
  data?: HomeLatestNewsData;
};

export function HomeLatestNewsView({
  className,
  data = defaultHomeLatestNewsData,
  ...props
}: HomeLatestNewsProps) {
  const latestNews = data.news.slice(0, 3);
  const headingID = props['aria-labelledby'] ?? 'latest-news-heading';

  if (latestNews.length === 0) {
    return null;
  }

  const firstNewsItem = latestNews[0];
  const remainingNewsItems = latestNews.slice(1);

  return (
    <Section
      aria-labelledby={headingID}
      className={cn('grid gap-x-12 md:grid-cols-2', className)}
      {...props}
    >
      <div className='flex max-w-140 flex-col gap-y-[clamp(2rem,6.25dvw,3rem)] md:justify-between'>
        <div className='space-y-4 md:space-y-8'>
          <SectionHeading id={headingID}>{data.heading}</SectionHeading>
          <ArrowLink href={data.action.href}>{data.action.label}</ArrowLink>
        </div>
        {firstNewsItem ? <HomeLatestNewsItem news={firstNewsItem} /> : null}
      </div>
      {remainingNewsItems.length > 0 ? (
        <div className='flex flex-col gap-y-[clamp(2rem,6.25dvw,3rem)] md:gap-y-24'>
          {remainingNewsItems.map((news) => (
            <HomeLatestNewsItem
              className='max-w-140 md:self-end'
              key={`${news.slug}-${news.dateTime ?? news.date}`}
              news={news}
            />
          ))}
        </div>
      ) : null}
    </Section>
  );
}

async function HomeLatestNews(props: HomeLatestNewsProps = {}) {
  const data = props.data ?? (await getHomeLatestNewsData());

  return <HomeLatestNewsView {...props} data={data} />;
}

export default HomeLatestNews;
