import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type NavItemProps = Omit<
  ComponentProps<typeof Link>,
  'aria-current' | 'children' | 'href'
> & {
  current?: boolean;
  href: ComponentProps<typeof Link>['href'];
  label: string;
};

function NavItem({ className, current, href, label, ...props }: NavItemProps) {
  return (
    <li className='flex h-8 items-center px-2'>
      <Link
        aria-current={current ? 'page' : undefined}
        className={cn(
          'text-sm font-medium text-muted-foreground decoration-primary decoration-2 underline-offset-8 hover:text-foreground hover:underline aria-[current=page]:text-foreground aria-[current=page]:underline',
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

export default NavItem;
