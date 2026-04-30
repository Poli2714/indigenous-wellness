import { IconLivePhoto } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { type ComponentProps, useId } from 'react';

import { cn } from '@/lib/utils';

export type ProjectCardImage = {
  alt: string;
  height?: number | null;
  url?: string | null;
  width?: number | null;
};

export type ProjectCardProject = {
  description: string;
  image?: ProjectCardImage | null;
  newTab?: boolean | null;
  title: string;
  url: string;
};

export type ProjectCardProps = Omit<
  ComponentProps<typeof Link>,
  'children' | 'href' | 'rel' | 'target'
> & {
  className?: string;
  imagePriority?: boolean;
  imageClassName?: string;
  imageSizes?: string;
  project: ProjectCardProject;
};

function ProjectCard({
  className,
  imageClassName,
  imagePriority = false,
  imageSizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  project,
  ...props
}: ProjectCardProps) {
  const generatedHeadingID = useId();
  const headingID = props['aria-labelledby'] ?? generatedHeadingID;
  const imageUrl = project.image?.url;

  return (
    <Link
      {...props}
      aria-labelledby={headingID}
      className={cn(
        'group relative isolate block overflow-hidden rounded-sm bg-card text-card-foreground transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
      href={project.url}
      rel={project.newTab ? 'noreferrer noopener' : undefined}
      target={project.newTab ? '_blank' : undefined}
    >
      <div
        className={cn(
          'relative size-full overflow-hidden rounded-sm bg-muted',
          imageClassName,
        )}
      >
        {imageUrl ? (
          <Image
            alt={project.image?.alt ?? ''}
            className='object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
            fill
            priority={imagePriority}
            sizes={imageSizes}
            src={imageUrl}
          />
        ) : (
          <div
            aria-hidden='true'
            className='absolute inset-0 flex items-center justify-center'
          >
            <IconLivePhoto
              className='size-8 animate-spin text-base-400 animation-duration-5000 dark:text-base-500'
              focusable='false'
              strokeWidth={1}
            />
          </div>
        )}
        <div
          aria-hidden='true'
          className='absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-background via-background/85 to-transparent'
        />
      </div>
      <div className='absolute inset-x-0 bottom-0 z-10 space-y-3 p-5 sm:space-y-4 sm:p-6 md:space-y-3 md:p-5 lg:space-y-4 lg:p-6'>
        <h3
          className='text-lg leading-6 font-semibold tracking-tight text-balance sm:text-xl sm:leading-7 md:text-base md:leading-6 lg:text-lg xl:text-xl'
          id={headingID}
        >
          {project.title}
        </h3>
        <p className='text-sm leading-5 text-muted-foreground sm:text-base sm:leading-[1.4rem] md:text-xs md:leading-4 lg:text-sm lg:leading-5 xl:text-base xl:leading-[1.4rem]'>
          {project.description}
        </p>
      </div>
    </Link>
  );
}

export default ProjectCard;
