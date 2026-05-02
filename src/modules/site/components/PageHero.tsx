import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import PageHeading from './PageHeading';
import Paragraph from './Paragraph';

export type PageHeroData = {
  description?: string | null;
  heading?: string | null;
};

export type PageHeroProps = Omit<ComponentProps<'header'>, 'children'> & {
  data?: PageHeroData | null;
};

function getFilledString(value: string | null | undefined) {
  const trimmedValue = value?.trim();

  return trimmedValue ? trimmedValue : null;
}

function PageHero({ className, data, ...props }: PageHeroProps) {
  const heading = getFilledString(data?.heading);
  const description = getFilledString(data?.description);

  if (!heading && !description) {
    return null;
  }

  return (
    <header
      className={cn(
        'flex w-full flex-col gap-y-6 self-start px-4 pt-[clamp(6rem,16dvw,10rem)] pb-[clamp(3rem,10dvw,6rem)] sm:px-6 md:px-8 lg:px-12',
        className,
      )}
      {...props}
    >
      {heading ? <PageHeading>{heading}</PageHeading> : null}
      {description ? (
        <Paragraph className='max-w-[35em] md:text-lg md:leading-normal'>
          {description}
        </Paragraph>
      ) : null}
    </header>
  );
}

export default PageHero;
