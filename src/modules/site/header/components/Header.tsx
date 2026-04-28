import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import AppSearchButton from './AppSearchButton';
import BrandLink from '../../components/BrandLink';
import ContactLink from '../../components/ContactLink';
import MenuButton from './MenuButton';
import NavItems from './NavItems';
import ThemeToggleButton from '../../components/ThemeToggleButton';
import {
  defaultHeaderData,
  type HeaderData,
  type HeaderLink,
} from '../data/headerDefaults';
import { getHeaderData } from '../data/getHeaderData';
import type { NavItemProps } from './NavItem';

type HeaderProps = Omit<ComponentProps<'header'>, 'children'>;

type HeaderViewProps = HeaderProps & {
  data?: HeaderData;
};

function getNewTabProps({ newTab }: HeaderLink) {
  return newTab
    ? {
        rel: 'noreferrer',
        target: '_blank',
      }
    : {};
}

function toNavItemProps(navItem: HeaderLink): NavItemProps {
  return {
    ...getNewTabProps(navItem),
    href: navItem.href,
    label: navItem.label,
  };
}

export function HeaderView({
  className,
  data = defaultHeaderData,
  ...props
}: HeaderViewProps) {
  const navItems = data.navItems.map(toNavItemProps);

  return (
    <header
      className={cn(
        'flex w-full max-w-384 flex-col gap-y-4 px-4 pt-6 sm:px-6 md:px-8 lg:px-12',
        className,
      )}
      {...props}
    >
      <div className='flex justify-between lg:relative lg:justify-center'>
        <div className='flex items-center gap-x-2'>
          <MenuButton className='md:hidden' />
          <BrandLink
            className='[&>strong]:hidden [&>strong]:md:block'
            href={data.brand.href}
            label={data.brand.label}
          />
        </div>
        <div className='flex items-center gap-x-4 lg:absolute lg:top-0 lg:right-0 xl:gap-x-6'>
          <AppSearchButton />
          <div className='flex items-center gap-x-4'>
            {data.contactLink.enabled ? (
              <ContactLink
                className='hidden sm:flex'
                href={data.contactLink.href}
                {...getNewTabProps(data.contactLink)}
              >
                {data.contactLink.label}
              </ContactLink>
            ) : null}
            <ThemeToggleButton />
          </div>
        </div>
      </div>
      <NavItems navItems={navItems} />
    </header>
  );
}

async function Header(props: HeaderProps = {}) {
  const data = await getHeaderData();

  return <HeaderView data={data} {...props} />;
}

export default Header;
