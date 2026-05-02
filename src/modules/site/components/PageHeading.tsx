import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type PageHeadingProps = ComponentProps<'h1'>;

function PageHeading({ children, className, ...props }: PageHeadingProps) {
  return (
    <h1
      className={cn(
        'max-w-160 text-[clamp(2rem,4.25dvw,2.5rem)] leading-[clamp(2rem,4.25dvw,2.5rem)] font-semibold tracking-tight text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export default PageHeading;
