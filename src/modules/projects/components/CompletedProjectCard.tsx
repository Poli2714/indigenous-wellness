import Image from 'next/image';
import Link from 'next/link';
import { type ComponentProps, useId } from 'react';

import { cn } from '@/lib/utils';
import ArrowLink from '@/modules/site/components/ArrowLink';
import Paragraph from '@/modules/site/components/Paragraph';

import fallbackLogoImage from '../../../../public/pewaseskwan-logo.png';

export type CompletedProjectCardLogo = {
  alt?: string | null;
  height?: number | null;
  url?: string | null;
  width?: number | null;
};

export type CompletedProject = {
  completionYear?: number | string | null;
  description: string;
  logo?: CompletedProjectCardLogo | null;
  title: string;
  url: string;
};

export type CompletedProjectCardProps = Omit<
  ComponentProps<'article'>,
  'children'
> & {
  imagePriority?: boolean;
  logoSizes?: string;
  project: CompletedProject;
};

const fallbackLogo = {
  alt: 'Pewaseskwan logo',
  height: 512,
  image: fallbackLogoImage,
  width: 512,
};

function CompletedProjectCard({
  className,
  imagePriority = false,
  logoSizes = '(min-width: 640px) 4.6875rem, 3.125rem',
  project,
  ...props
}: CompletedProjectCardProps) {
  const generatedHeadingID = useId();
  const headingID = props['aria-labelledby'] ?? generatedHeadingID;
  const logo = project.logo?.url ? project.logo : null;
  const logoAlt = logo
    ? (logo.alt ?? `${project.title} logo`)
    : fallbackLogo.alt;

  return (
    <article
      {...props}
      aria-labelledby={headingID}
      className={cn(
        'flex-1 space-y-6 rounded-sm border border-border p-6 transition-colors duration-300 focus-within:border-input hover:border-input sm:p-8 xl:space-y-8',
        className,
      )}
    >
      <div className='flex flex-col items-start gap-x-4 gap-y-4 xs:flex-row xs:items-center sm:gap-x-6'>
        <Link
          aria-label={project.title}
          className='shrink-0 rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
          href={project.url}
        >
          <Image
            alt={logoAlt}
            className='size-12.5 object-contain sm:size-18.75'
            height={logo?.height ?? fallbackLogo.height}
            priority={imagePriority}
            sizes={logoSizes}
            src={logo?.url ?? fallbackLogo.image}
            width={logo?.width ?? fallbackLogo.width}
          />
        </Link>
        <div className='flex flex-col gap-y-1.5 sm:gap-y-2'>
          <Link
            className='rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
            href={project.url}
          >
            <h3
              className='line-clamp-2 text-lg leading-5 font-medium tracking-tight text-balance transition-colors duration-200 hover:text-primary sm:text-xl sm:leading-6'
              id={headingID}
            >
              {project.title}
            </h3>
          </Link>
          {project.completionYear ? (
            <span className='text-sm text-muted-foreground'>
              {`Completed in ${String(project.completionYear)}`}
            </span>
          ) : null}
        </div>
      </div>
      <Paragraph className='line-clamp-3 text-sm sm:text-base sm:leading-[1.4rem]'>
        {project.description}
      </Paragraph>
      <ArrowLink href={project.url}>Read more</ArrowLink>
    </article>
  );
}

export default CompletedProjectCard;
