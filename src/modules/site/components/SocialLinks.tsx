import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type SocialLinkItem = Omit<
  ComponentProps<typeof Link>,
  'children' | 'href'
> & {
  href: ComponentProps<typeof Link>['href'];
  label: string;
  listItemClassName?: string;
};

type SocialLinkProps = SocialLinkItem & {
  onDarkBackgroundOnly: boolean;
};

function getLinkKey({ href, label }: SocialLinkItem) {
  return `${String(href)}-${label}`;
}

function SocialLink({
  className,
  href,
  label,
  listItemClassName,
  onDarkBackgroundOnly,
  ...props
}: SocialLinkProps) {
  return (
    <li className={listItemClassName}>
      <Link
        className={cn(
          'group xs:text-sm flex max-w-max items-center gap-x-1 rounded-md border border-transparent text-xs leading-[1.4rem] font-medium transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 xl:text-base xl:leading-[1.4rem]',
          onDarkBackgroundOnly
            ? 'text-base-200 hover:text-base-400'
            : 'text-foreground hover:text-foreground/90 dark:text-base-200 dark:hover:text-base-400',
          className,
        )}
        href={href}
        {...props}
      >
        {label}
        <IconArrowUpRight
          aria-hidden='true'
          className='transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
          focusable='false'
          size={16}
          strokeWidth={1.33}
        />
      </Link>
    </li>
  );
}

type SocialLinksProps = Omit<ComponentProps<'ul'>, 'children'> & {
  onDarkBackgroundOnly?: boolean;
  socialLinks: SocialLinkItem[];
};

function SocialLinks({
  className,
  onDarkBackgroundOnly = false,
  socialLinks,
  ...props
}: SocialLinksProps) {
  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <ul className={cn('flex flex-wrap gap-x-4', className)} {...props}>
      {socialLinks.map((socialLink) => (
        <SocialLink
          key={getLinkKey(socialLink)}
          onDarkBackgroundOnly={onDarkBackgroundOnly}
          {...socialLink}
        />
      ))}
    </ul>
  );
}

export default SocialLinks;
