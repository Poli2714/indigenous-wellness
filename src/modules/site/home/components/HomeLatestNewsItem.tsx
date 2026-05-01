import Link from 'next/link';
import { type ComponentProps, useId } from 'react';

import { cn } from '@/lib/utils';

import NewsMeta, { type NewsMetaTag } from '../../components/NewsMeta';

type HeadingLevel = 3 | 4;

export type HomeLatestNewsItemNews = {
  date: string;
  dateTime?: string;
  description: string;
  href?: ComponentProps<typeof Link>['href'];
  slug: string;
  tags?: (NewsMetaTag | null | undefined)[];
  title: string;
};

export type HomeLatestNewsItemProps = Omit<
  ComponentProps<'article'>,
  'children'
> & {
  headingLevel?: HeadingLevel;
  news: HomeLatestNewsItemNews;
};

function getNewsHref(news: HomeLatestNewsItemNews) {
  return news.href ?? `/news/${news.slug.replace(/^\/+/, '')}`;
}

function HomeLatestNewsItem({
  className,
  headingLevel = 3,
  news,
  ...props
}: HomeLatestNewsItemProps) {
  const generatedHeadingID = useId();
  const headingID = props['aria-labelledby'] ?? generatedHeadingID;
  const Heading = `h${headingLevel}` as const;

  return (
    <article
      {...props}
      aria-labelledby={headingID}
      className={cn(
        'group space-y-2 py-4 first:pt-0 md:space-y-3 md:py-5',
        className,
      )}
    >
      <Heading
        className='line-clamp-2 text-base leading-6 font-medium text-pretty sm:text-lg sm:leading-7 md:text-base md:leading-6 lg:text-lg lg:leading-7'
        id={headingID}
      >
        <Link
          className='rounded-md border border-transparent transition-colors hover:text-primary focus-visible:border-ring'
          href={getNewsHref(news)}
        >
          {news.title}
        </Link>
      </Heading>
      <NewsMeta date={news.date} dateTime={news.dateTime} tags={news.tags} />
      <p className='line-clamp-2 text-sm leading-[1.2rem] text-muted-foreground sm:text-base sm:leading-[1.4rem]'>
        {news.description}
      </p>
    </article>
  );
}

export default HomeLatestNewsItem;
