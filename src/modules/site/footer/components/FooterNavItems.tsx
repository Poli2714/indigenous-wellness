import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import FooterNavItem, { type FooterNavItemProps } from './FooterNavItem';

type FooterNavItemsProps = Omit<ComponentProps<'ul'>, 'children'> & {
  navItems: FooterNavItemProps[];
};

function FooterNavItems({
  className,
  navItems,
  ...props
}: FooterNavItemsProps) {
  if (navItems.length === 0) {
    return null;
  }

  return (
    <ul
      className={cn('flex max-w-max flex-col gap-y-3 xl:gap-y-4', className)}
      {...props}
    >
      {navItems.map((navItem) => (
        <FooterNavItem
          key={`${String(navItem.href)}-${navItem.label}`}
          {...navItem}
        />
      ))}
    </ul>
  );
}

export default FooterNavItems;
