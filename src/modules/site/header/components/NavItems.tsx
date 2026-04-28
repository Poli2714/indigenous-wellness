import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import NavItem, { type NavItemProps } from './NavItem';

type NavItemsProps = Omit<ComponentProps<'nav'>, 'children'> & {
  listClassName?: string;
  navItems: NavItemProps[];
};

function NavItems({
  'aria-label': ariaLabel = 'Site navigation',
  className,
  listClassName,
  navItems,
  ...props
}: NavItemsProps) {
  if (navItems.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label={ariaLabel}
      className={cn('hidden md:block', className)}
      {...props}
    >
      <ul
        className={cn(
          'flex items-center justify-center gap-x-4',
          listClassName,
        )}
      >
        {navItems.map((navItem) => (
          <NavItem
            key={`${String(navItem.href)}-${navItem.label}`}
            {...navItem}
          />
        ))}
      </ul>
    </nav>
  );
}

export default NavItems;
