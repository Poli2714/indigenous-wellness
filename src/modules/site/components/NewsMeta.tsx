import Link from 'next/link';
import type { ComponentProps } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type NewsMetaTag = {
  badgeClassName?: string | null;
  href?: ComponentProps<typeof Link>['href'] | null;
  id?: number | string | null;
  name: string;
  slug?: string | null;
};

export type NewsMetaProps = Omit<ComponentProps<'div'>, 'children'> & {
  date: string;
  dateTime?: string;
  tagHrefBasePath?: string | null;
  tags?: (NewsMetaTag | null | undefined)[];
};

function getTagHref(
  tag: NewsMetaTag,
  tagHrefBasePath: NewsMetaProps['tagHrefBasePath'],
) {
  if (tag.href) {
    return tag.href;
  }

  const slug = tag.slug?.trim();

  if (!slug || !tagHrefBasePath) {
    return null;
  }

  return `${tagHrefBasePath}?tag=${encodeURIComponent(slug)}`;
}

function getTagKey(tag: NewsMetaTag, index: number) {
  return tag.id ?? tag.slug ?? `${tag.name}-${index}`;
}

function NewsMeta({
  className,
  date,
  dateTime,
  tagHrefBasePath = '/news',
  tags = [],
  ...props
}: NewsMetaProps) {
  const visibleTags = tags.filter((tag): tag is NewsMetaTag =>
    Boolean(tag?.name.trim()),
  );

  return (
    <div
      className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', className)}
      {...props}
    >
      <time
        className='text-xs leading-5 text-muted-foreground'
        dateTime={dateTime}
      >
        {date}
      </time>
      {visibleTags.map((tag, index) => {
        const tagName = tag.name.trim();
        const href = getTagHref(tag, tagHrefBasePath);
        const variant = tag.badgeClassName ? null : 'default';

        if (!href) {
          return (
            <Badge
              className={tag.badgeClassName ?? undefined}
              key={getTagKey(tag, index)}
              variant={variant}
            >
              {tagName}
            </Badge>
          );
        }

        return (
          <Badge
            className={tag.badgeClassName ?? undefined}
            key={getTagKey(tag, index)}
            render={<Link href={href}>{tagName}</Link>}
            variant={variant}
          />
        );
      })}
    </div>
  );
}

export default NewsMeta;
