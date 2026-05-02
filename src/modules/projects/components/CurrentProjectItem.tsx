import { IconCircleArrowUpRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { type ComponentProps, useId } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Paragraph from '@/modules/site/components/Paragraph';

import fallbackLogoImage from '../../../../public/pewaseskwan-logo.png';

export type CurrentProjectItemLogo = {
  alt?: string | null;
  height?: number | null;
  url?: string | null;
  width?: number | null;
};

export type CurrentProject = {
  description: string;
  logo?: CurrentProjectItemLogo | null;
  title: string;
  url: string;
};

export type CurrentProjectItemProps = Omit<ComponentProps<'li'>, 'children'> & {
  imagePriority?: boolean;
  logoSizes?: string;
  position: number | string;
  project: CurrentProject;
};

const fallbackLogo = {
  alt: 'Pewaseskwan logo',
  height: 512,
  image: fallbackLogoImage,
  width: 512,
};

function formatPosition(position: number | string) {
  if (typeof position === 'number') {
    return position.toString().padStart(2, '0');
  }

  return position.trim().replace(/\.$/, '');
}

function CurrentProjectItem({
  className,
  imagePriority = false,
  logoSizes = '(min-width: 1280px) 9.375rem, (min-width: 1024px) 7.5rem, (min-width: 768px) 6.25rem, (min-width: 640px) 5rem, 3.125rem',
  position,
  project,
  ...props
}: CurrentProjectItemProps) {
  const generatedHeadingID = useId();
  const headingID = props['aria-labelledby'] ?? generatedHeadingID;
  const logo = project.logo?.url ? project.logo : null;
  const logoAlt = logo
    ? (logo.alt ?? `${project.title} logo`)
    : fallbackLogo.alt;

  return (
    <li
      {...props}
      aria-labelledby={headingID}
      className={cn(
        'group grid items-center gap-x-9 gap-y-6 border-b p-2 py-4 transition-[background-color_transform] duration-300 focus-within:bg-muted/50 hover:translate-x-0.5 hover:bg-muted/50 xs:p-4 sm:grid-cols-[max-content_1fr_max-content] md:gap-x-12 lg:gap-x-16',
        className,
      )}
    >
      <span
        aria-hidden='true'
        className='text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground md:text-base md:leading-[1.4rem] lg:mr-8 xl:mr-16'
      >
        {formatPosition(position)}.
      </span>
      <div className='flex flex-col gap-y-1.5 sm:flex-row sm:items-center sm:gap-x-9 sm:gap-y-0 md:gap-x-12 lg:gap-x-16'>
        <Link
          aria-label={project.title}
          className='w-max rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
          href={project.url}
        >
          <Image
            alt={logoAlt}
            className='size-12.5 object-contain sm:size-20 md:size-25 lg:size-30 xl:size-37.5'
            height={logo?.height ?? fallbackLogo.height}
            priority={imagePriority}
            sizes={logoSizes}
            src={logo?.url ?? fallbackLogo.image}
            width={logo?.width ?? fallbackLogo.width}
          />
        </Link>
        <div className='flex flex-1 flex-col gap-y-1 sm:gap-y-1.5 lg:gap-y-2 xl:gap-y-3'>
          <Link
            className={cn(
              buttonVariants({ variant: 'link' }),
              'h-auto self-start p-0 text-left text-foreground hover:text-primary',
            )}
            href={project.url}
          >
            <h2
              className='text-base leading-[1.4rem] font-medium tracking-tight text-balance sm:text-lg sm:leading-5 lg:text-xl lg:leading-6'
              id={headingID}
            >
              {project.title}
            </h2>
          </Link>
          <Paragraph className='max-w-140 text-sm md:text-base md:leading-[1.4rem]'>
            {project.description}
          </Paragraph>
        </div>
      </div>
      <Link
        aria-label={`View ${project.title}`}
        className='hidden rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:block'
        href={project.url}
      >
        <IconCircleArrowUpRight
          className='size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 hover:text-foreground md:size-6'
          focusable='false'
          aria-hidden='true'
          strokeWidth={1.33}
        />
      </Link>
    </li>
  );
}

export default CurrentProjectItem;
