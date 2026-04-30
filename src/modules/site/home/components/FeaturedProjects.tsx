import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import ArrowLink from '../../components/ArrowLink';
import Paragraph from '../../components/Paragraph';
import Section from '../../components/Section';
import SectionHeading from '../../components/SectionHeading';
import {
  defaultFeaturedProjectsData,
  type FeaturedProjectsData,
} from '../data/featuredProjectsDefaults';
import { getFeaturedProjectsData } from '../data/getFeaturedProjectsData';
import ProjectCard from './ProjectCard';

type FeaturedProjectsProps = Omit<
  ComponentProps<typeof Section>,
  'children'
> & {
  data?: FeaturedProjectsData;
};

const cardClassNames = [
  'aspect-4/3 md:col-span-2',
  'aspect-3/4',
  'aspect-3/4',
  'aspect-video',
  'aspect-6/5',
];

function getNewTabProps({ newTab }: FeaturedProjectsData['action']) {
  return newTab
    ? {
        target: '_blank',
      }
    : {};
}

export function FeaturedProjectsView({
  className,
  data = defaultFeaturedProjectsData,
  ...props
}: FeaturedProjectsProps) {
  const projects = data.projects.slice(0, 5);
  const headingID = props['aria-labelledby'] ?? 'featured-projects-heading';

  if (projects.length === 0) {
    return null;
  }

  const firstColumnProjects = projects.slice(0, 3);
  const secondColumnProjects = projects.slice(3);

  return (
    <Section aria-labelledby={headingID} className={className} {...props}>
      <div className='max-w-140 space-y-8'>
        <SectionHeading id={headingID}>{data.heading}</SectionHeading>
        <Paragraph>{data.description}</Paragraph>
        <ArrowLink href={data.action.href} {...getNewTabProps(data.action)}>
          {data.action.label}
        </ArrowLink>
      </div>
      <div
        className={cn(
          'grid gap-4 md:gap-2 lg:gap-4',
          secondColumnProjects.length > 0 && 'md:grid-cols-2',
        )}
      >
        <div className='grid gap-4 md:grid-cols-2 md:gap-2 lg:gap-4'>
          {firstColumnProjects.map((project, index) => (
            <ProjectCard
              className={cardClassNames[index]}
              imagePriority={index === 0}
              key={`${project.title}-${project.url}`}
              project={project}
            />
          ))}
        </div>
        {secondColumnProjects.length > 0 ? (
          <div className='grid gap-4 md:gap-2 lg:gap-4'>
            {secondColumnProjects.map((project, index) => {
              const projectIndex = index + firstColumnProjects.length;

              return (
                <ProjectCard
                  className={cardClassNames[projectIndex]}
                  key={`${project.title}-${project.url}`}
                  project={project}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

async function FeaturedProjects(props: FeaturedProjectsProps = {}) {
  const data = props.data ?? (await getFeaturedProjectsData());

  return <FeaturedProjectsView {...props} data={data} />;
}

export default FeaturedProjects;
