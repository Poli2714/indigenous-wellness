import configPromise from '@payload-config';
import { getPayload } from 'payload';

import type { Config, Media, Project } from '@/payload-types';
import { slugify } from '@/modules/payload/utils/slugify';
import type { PageHeroData } from '@/modules/site/components/PageHero';

import type {
  CompletedProject,
  CompletedProjectCardLogo,
} from '../components/CompletedProjectCard';
import type {
  CompletedProjectsAction,
  CompletedProjectsData,
} from '../components/CompletedProjects';
import type {
  CurrentProject,
  CurrentProjectItemLogo,
} from '../components/CurrentProjectItem';
import {
  defaultProjectsPageData,
  type ProjectsPageData,
} from './projectsPageDefaults';

type ProjectsPageGlobal = Config['globals']['projects-page'];
const completedProjectsArchiveHref = '/projects/completed';
const completedProjectsCarouselLimit = 4;

function getFilledString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function normalizeMediaLogo(
  logo: number | Media | null | undefined,
  altOverride: unknown,
): (CurrentProjectItemLogo & CompletedProjectCardLogo) | null {
  if (!logo || typeof logo === 'number') {
    return null;
  }

  const url = getFilledString(logo.url);

  if (!url) {
    return null;
  }

  return {
    alt: getFilledString(altOverride) ?? logo.alt,
    height: logo.height,
    url,
    width: logo.width,
  };
}

function normalizeProject(project: Project): CurrentProject | null {
  const title = getFilledString(project.title);
  const description = getFilledString(project.shortDescription);
  const slug = getFilledString(project.slug) ?? (title ? slugify(title) : null);

  if (!title || !description || !slug) {
    return null;
  }

  return {
    description,
    logo: normalizeMediaLogo(project.logo, project.logoAlt),
    title,
    url: `/projects/${slug.replace(/^\/+/, '')}`,
  };
}

function normalizeCompletedProject(project: Project): CompletedProject | null {
  const normalizedProject = normalizeProject(project);

  if (!normalizedProject) {
    return null;
  }

  return {
    ...normalizedProject,
    completionYear: project.completionYear,
  };
}

function normalizeCompletedProjectsAction({
  completedProjectsCount,
  label,
}: {
  completedProjectsCount: number;
  label: unknown;
}): CompletedProjectsAction | null {
  const actionLabel = getFilledString(label);

  if (
    completedProjectsCount <= completedProjectsCarouselLimit ||
    !actionLabel
  ) {
    return null;
  }

  return {
    href: completedProjectsArchiveHref,
    label: actionLabel,
  };
}

export function normalizePageHeroData(
  projectsPage: ProjectsPageGlobal | null,
): PageHeroData | null {
  const hero = projectsPage?.hero;
  const heading = getFilledString(hero?.heading);
  const description = getFilledString(hero?.description);

  if (!heading && !description) {
    return null;
  }

  return {
    description,
    heading,
  };
}

export function normalizeProjectsPageData({
  projects,
  projectsPage,
}: {
  projects: Project[];
  projectsPage: ProjectsPageGlobal | null;
}): ProjectsPageData {
  const completedProjects = projectsPage?.completedProjects;
  const normalizedCompletedProjects = projects.reduce<CompletedProject[]>(
    (items, project) => {
      if (project.status !== 'completed') {
        return items;
      }

      const normalizedProject = normalizeCompletedProject(project);

      if (normalizedProject) {
        items.push(normalizedProject);
      }

      return items;
    },
    [],
  );

  return {
    completedProjects: {
      action: normalizeCompletedProjectsAction({
        completedProjectsCount: normalizedCompletedProjects.length,
        label: completedProjects?.actionLabel,
      }),
      description: getFilledString(completedProjects?.description),
      heading: getFilledString(completedProjects?.heading),
      projects: normalizedCompletedProjects.slice(
        0,
        completedProjectsCarouselLimit,
      ),
    },
    hero: normalizePageHeroData(projectsPage),
    currentProjects: projects.reduce<CurrentProject[]>((items, project) => {
      if (project.status === 'completed') {
        return items;
      }

      const normalizedProject = normalizeProject(project);

      if (normalizedProject) {
        items.push(normalizedProject);
      }

      return items;
    }, []),
  };
}

export async function getProjectsPageData(): Promise<ProjectsPageData> {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const [projectsPage, projectsResult] = await Promise.all([
      payload.findGlobal({
        depth: 1,
        slug: 'projects-page',
      }),
      payload.find({
        collection: 'projects',
        depth: 1,
        limit: 100,
        sort: 'title',
      }),
    ]);

    return normalizeProjectsPageData({
      projects: projectsResult.docs,
      projectsPage,
    });
  } catch {
    return defaultProjectsPageData;
  }
}
