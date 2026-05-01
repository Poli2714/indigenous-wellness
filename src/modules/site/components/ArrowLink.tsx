import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type ArrowLinkProps = ComponentProps<typeof Link> & {
  iconClassName?: string;
};

function ArrowLink({
  children,
  className,
  iconClassName,
  rel,
  target,
  ...props
}: ArrowLinkProps) {
  const linkRel = target === '_blank' ? (rel ?? 'noreferrer noopener') : rel;

  return (
    <Link
      className={cn(
        'group flex max-w-max items-end gap-x-0.5 rounded-md border border-transparent text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
      rel={linkRel}
      target={target}
      {...props}
    >
      {children}
      <IconArrowUpRight
        aria-hidden='true'
        className={cn(
          'size-4.5 shrink-0 text-current transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
          iconClassName,
        )}
        focusable='false'
        strokeWidth={1.67}
      />
    </Link>
  );
}

export default ArrowLink;
