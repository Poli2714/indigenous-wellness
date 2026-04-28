import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ContactLinkProps = Omit<
  ComponentProps<typeof Link>,
  'children' | 'href'
> & {
  children?: ReactNode;
  href?: ComponentProps<typeof Link>['href'];
};

function ContactLink({
  children = 'Contact',
  className,
  href = '/contact',
  ...props
}: ContactLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant: 'ghost' }), className)}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}

export default ContactLink;
