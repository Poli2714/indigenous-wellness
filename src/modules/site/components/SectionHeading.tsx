import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type SectionHeadingProps = ComponentProps<'h2'>;

function SectionHeading({
  children,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        'max-w-150 text-[clamp(1.5rem,3.4dvw,2rem)] leading-[clamp(1.5rem,3.4dvw,2rem)] font-semibold tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export default SectionHeading;
