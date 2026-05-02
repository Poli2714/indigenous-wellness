import { type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import CurrentProjectItem, { type CurrentProject } from './CurrentProjectItem';
import Paragraph from '@/modules/site/components/Paragraph';

export type CurrentProjectsListProps = Omit<
  ComponentProps<'ul'>,
  'children'
> & {
  logoSizes?: string;
  priorityLogoCount?: number;
  projects: readonly CurrentProject[];
  startPosition?: number;
};

function getProjectKey(project: CurrentProject, index: number) {
  return `${project.title}-${project.url}-${index}`;
}

function CurrentProjectsList({
  className,
  logoSizes,
  priorityLogoCount = 1,
  projects,
  startPosition = 1,
  ...props
}: CurrentProjectsListProps) {
  if (projects.length === 0) {
    return (
      <Paragraph className='w-full text-center'>
        We are currently updating our projects. Please check back soon.
      </Paragraph>
    );
  }

  return (
    <ul {...props} className={cn('flex w-full flex-col', className)}>
      {projects.map((project, index) => (
        <CurrentProjectItem
          imagePriority={index < priorityLogoCount}
          key={getProjectKey(project, index)}
          logoSizes={logoSizes}
          position={startPosition + index}
          project={project}
        />
      ))}
    </ul>
  );
}

export default CurrentProjectsList;
