import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';
import logoImage from '../../../../public/pewaseskwan-logo.png';

type BrandLinkProps = Omit<
  ComponentProps<typeof Link>,
  'aria-label' | 'children' | 'href'
> & {
  href?: string;
  label?: string;
};

function BrandLink({
  className,
  href = '/',
  label = 'Pewaseskwan home',
  ...props
}: BrandLinkProps) {
  return (
    <Link
      aria-label={label}
      className={cn(
        'flex max-w-max items-center gap-x-2 rounded-lg border border-transparent outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
      href={href}
      {...props}
    >
      <Image
        alt=''
        className='size-8 md:size-9'
        height={36}
        priority
        src={logoImage}
        width={36}
      />
      <strong className='font-bold'>Pewaseskwan</strong>
    </Link>
  );
}

export default BrandLink;
