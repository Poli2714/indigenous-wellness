import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type SectionProps = ComponentProps<'section'>;

function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        'flex w-full flex-col gap-y-[clamp(2rem,6.75dvw,4rem)] px-4 pt-[clamp(3rem,10dvw,6rem)] pb-[clamp(3rem,10dvw,6rem)] sm:px-6 md:px-8 lg:px-12',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export default Section;
