import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type FooterNavItemProps = Omit<
  ComponentProps<typeof Link>,
  'children' | 'href'
> & {
  href: ComponentProps<typeof Link>['href'];
  label: string;
  listItemClassName?: string;
};

function FooterNavItem({
  className,
  href,
  label,
  listItemClassName,
  ...props
}: FooterNavItemProps) {
  return (
    <li className={listItemClassName}>
      <Link
        className={cn(
          'text-base-200 hover:text-base-400 flex max-w-max rounded-md border border-transparent text-base leading-[1.4rem] font-medium transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 lg:text-sm xl:text-base xl:leading-[1.4rem]',
          className,
        )}
        href={href}
        {...props}
      >
        {label}
      </Link>
    </li>
  );
}

export default FooterNavItem;
