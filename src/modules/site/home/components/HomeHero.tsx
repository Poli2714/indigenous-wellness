import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import ContactLink from '../../components/ContactLink';
import {
  defaultHomeHeroData,
  type HomeHeroData,
  type HomeHeroImage,
  type HomeHeroLink,
} from '../data/homeHeroDefaults';
import { getHomeHeroData } from '../data/getHomeHeroData';
import MockImage from './MockImage';

type HomeHeroProps = Omit<ComponentProps<'section'>, 'children'>;

type HomeHeroViewProps = HomeHeroProps & {
  data?: HomeHeroData;
};

type HeroImageTileProps = {
  className?: string;
  image?: HomeHeroImage;
  priority?: boolean;
  sizes: string;
};

const imageTileClasses = [
  'aspect-video',
  'aspect-4/3',
  'aspect-4/5 size-full',
  'aspect-4/3',
  'aspect-video',
];

function getNewTabProps({ newTab }: HomeHeroLink) {
  return newTab
    ? {
        rel: 'noreferrer',
        target: '_blank',
      }
    : {};
}

function HeroImageTile({
  className,
  image,
  priority = false,
  sizes,
}: HeroImageTileProps) {
  if (!image) {
    return <MockImage className={className} />;
  }

  return (
    <div className={cn('relative rounded-sm bg-muted', className)}>
      <Image
        alt={image.alt}
        className='object-cover'
        fill
        priority={priority}
        sizes={sizes}
        src={image.url}
      />
    </div>
  );
}

export function HomeHeroView({
  className,
  data = defaultHomeHeroData,
  ...props
}: HomeHeroViewProps) {
  const images = imageTileClasses.map((imageClassName, index) => ({
    className: imageClassName,
    image: data.images[index],
  }));

  return (
    <section
      className={cn(
        'flex w-full flex-col items-center gap-y-[clamp(2rem,6.75dvw,4rem)] px-4 pt-[clamp(6rem,20dvw,12rem)] pb-[clamp(3rem,10dvw,6rem)] sm:px-6 md:px-8 lg:px-12',
        className,
      )}
      {...props}
    >
      <div className='flex flex-col items-center gap-y-8'>
        <div className='space-y-2 text-center md:space-y-4'>
          <h1 className='text-[clamp(2rem,6dvw,3.5rem)] leading-[clamp(2rem,6dvw,3.5rem)] font-bold tracking-tight text-balance'>
            {data.title}
          </h1>
          <p className='text-[clamp(1.25rem,3.25dvw,2rem)] leading-6 tracking-tight sm:leading-[clamp(1.25rem,3.25dvw,2rem)]'>
            {data.subtitle}
          </p>
        </div>
        <p className='max-w-175 text-center text-muted-foreground md:text-lg lg:text-xl'>
          {data.description}
        </p>
        <div className='flex items-center gap-x-3'>
          <Link
            className={buttonVariants({ variant: 'default' })}
            href={data.primaryAction.href}
            {...getNewTabProps(data.primaryAction)}
          >
            {data.primaryAction.label}
          </Link>
          {data.secondaryAction.enabled ? (
            <ContactLink
              href={data.secondaryAction.href}
              {...getNewTabProps(data.secondaryAction)}
            >
              {data.secondaryAction.label}
            </ContactLink>
          ) : null}
        </div>
      </div>
      <div className='grid w-full max-w-140 gap-4 md:max-w-none md:grid-cols-10'>
        <div className='flex flex-col justify-center gap-y-4 md:col-span-3'>
          <HeroImageTile
            className={images[0].className}
            image={images[0].image}
            priority
            sizes='(min-width: 768px) 30vw, 100vw'
          />
          <HeroImageTile
            className={images[1].className}
            image={images[1].image}
            sizes='(min-width: 768px) 30vw, 100vw'
          />
        </div>
        <div className='col-span-4 hidden items-center md:flex'>
          <HeroImageTile
            className={images[2].className}
            image={images[2].image}
            priority
            sizes='40vw'
          />
        </div>
        <div className='col-span-3 hidden flex-col justify-center gap-y-4 md:flex'>
          <HeroImageTile
            className={images[3].className}
            image={images[3].image}
            sizes='30vw'
          />
          <HeroImageTile
            className={images[4].className}
            image={images[4].image}
            sizes='30vw'
          />
        </div>
      </div>
    </section>
  );
}

async function HomeHero(props: HomeHeroProps = {}) {
  const data = await getHomeHeroData();

  return <HomeHeroView data={data} {...props} />;
}

export default HomeHero;
