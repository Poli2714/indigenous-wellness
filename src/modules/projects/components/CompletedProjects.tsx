import { type ComponentProps } from 'react';

import ArrowLink from '@/modules/site/components/ArrowLink';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Paragraph from '@/modules/site/components/Paragraph';
import Section from '@/modules/site/components/Section';
import SectionHeading from '@/modules/site/components/SectionHeading';

import CompletedProjectCard, {
  type CompletedProject,
} from './CompletedProjectCard';

export type CompletedProjectsAction = {
  href: string;
  label: string;
};

export type CompletedProjectsData = {
  action?: CompletedProjectsAction | null;
  description?: string | null;
  heading?: string | null;
  projects: readonly CompletedProject[];
};

export type CompletedProjectsProps = Omit<
  ComponentProps<typeof Section>,
  'children'
> & {
  cardLogoSizes?: string;
  data: CompletedProjectsData;
  priorityLogoCount?: number;
};

function getProjectKey(project: CompletedProject, index: number) {
  return `${project.title}-${project.url}-${index}`;
}

function getFilledString(value: string | null | undefined) {
  const trimmedValue = value?.trim();

  return trimmedValue ? trimmedValue : null;
}

function CompletedProjects({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  cardLogoSizes,
  className,
  data,
  priorityLogoCount = 1,
  ...props
}: CompletedProjectsProps) {
  if (data.projects.length === 0) {
    return null;
  }

  const heading = getFilledString(data.heading);
  const description = getFilledString(data.description);
  const headingID = ariaLabelledBy ?? 'completed-projects-heading';
  const hasHeading = Boolean(heading);
  const sectionLabelProps = hasHeading
    ? { 'aria-labelledby': headingID }
    : { 'aria-label': ariaLabel ?? 'Completed projects' };

  return (
    <Section
      {...props}
      {...sectionLabelProps}
      className={cn('overflow-hidden', className)}
    >
      {heading || description || data.action ? (
        <div className='max-w-140 space-y-8'>
          {heading ? (
            <SectionHeading id={headingID}>{heading}</SectionHeading>
          ) : null}
          {description ? <Paragraph>{description}</Paragraph> : null}
          {data.action ? (
            <ArrowLink href={data.action.href}>{data.action.label}</ArrowLink>
          ) : null}
        </div>
      ) : null}
      <Carousel
        aria-label='Completed projects carousel'
        className='static flex flex-col-reverse gap-x-32 gap-y-4 md:flex-row lg:gap-x-16 xl:gap-x-32'
        opts={{ align: 'start' }}
      >
        <CarouselContent className='mr-10'>
          {data.projects.map((project, index) => (
            <CarouselItem
              key={getProjectKey(project, index)}
              className='lg:basis-1/2'
            >
              <CompletedProjectCard
                imagePriority={index < priorityLogoCount}
                logoSizes={cardLogoSizes}
                project={project}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {data.projects.length > 1 ? (
          <div className='flex gap-x-2 self-end sm:gap-x-4'>
            <CarouselPrevious className='static size-6 translate-x-0 translate-y-0 border-muted-foreground text-muted-foreground hover:border-foreground hover:bg-foreground hover:text-background disabled:bg-background disabled:text-muted-foreground sm:size-8 dark:bg-background dark:hover:bg-base-900 dark:hover:text-muted-foreground dark:disabled:bg-background' />
            <CarouselNext className='static size-6 translate-x-0 translate-y-0 border-muted-foreground text-muted-foreground hover:border-foreground hover:bg-foreground hover:text-background disabled:bg-background disabled:text-muted-foreground sm:size-8 dark:bg-background dark:hover:bg-base-900 dark:hover:text-muted-foreground dark:disabled:bg-background' />
          </div>
        ) : null}
      </Carousel>
    </Section>
  );
}

export default CompletedProjects;
