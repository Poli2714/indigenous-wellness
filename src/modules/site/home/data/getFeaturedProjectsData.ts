import configPromise from '@payload-config';
import { getPayload } from 'payload';

import type { Config, Media, Project } from '@/payload-types';
import { slugify } from '@/modules/payload/utils/slugify';

import type {
  ProjectCardImage,
  ProjectCardProject,
} from '../components/ProjectCard';
import {
  defaultFeaturedProjectsData,
  type FeaturedProjectsData,
  type FeaturedProjectsLink,
} from './featuredProjectsDefaults';

type HomeGlobal = Config['globals']['home'];
type PartialFeaturedProjectsLink = Partial<{
  href: string | null;
  label: string | null;
  newTab: boolean | null;
}>;
type FeaturedProjectRow = NonNullable<
  NonNullable<HomeGlobal['featuredProjects']>['projects']
>[number];

function getFilledString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function normalizeLink(
  link: PartialFeaturedProjectsLink | null | undefined,
  fallback: FeaturedProjectsLink,
): FeaturedProjectsLink {
  const href = getFilledString(link?.href);
  const label = getFilledString(link?.label);

  return {
    href: href ?? fallback.href,
    label: label ?? fallback.label,
    newTab: link?.newTab ?? fallback.newTab,
  };
}

function normalizeMediaImage(
  image: number | Media | null | undefined,
  altOverride: unknown,
): ProjectCardImage | null {
  if (!image || typeof image === 'number') {
    return null;
  }

  const url = getFilledString(image.url);

  if (!url) {
    return null;
  }

  return {
    alt: getFilledString(altOverride) ?? image.alt,
    height: image.height,
    url,
    width: image.width,
  };
}

function normalizeProject(project: Project): ProjectCardProject | null {
  const title = getFilledString(project.title);
  const description = getFilledString(project.shortDescription);
  const slug = getFilledString(project.slug) ?? (title ? slugify(title) : null);

  if (!title || !description || !slug) {
    return null;
  }

  return {
    description,
    image: normalizeMediaImage(project.image, project.imageAlt),
    title,
    url: `/projects/${slug.replace(/^\/+/, '')}`,
  };
}

export function normalizeFeaturedProjectsData(
  home: HomeGlobal | null,
): FeaturedProjectsData {
  const featuredProjects = home?.featuredProjects;
  const projectRows = featuredProjects?.projects ?? [];

  return {
    action: normalizeLink(
      featuredProjects?.action,
      defaultFeaturedProjectsData.action,
    ),
    description:
      getFilledString(featuredProjects?.description) ??
      defaultFeaturedProjectsData.description,
    heading:
      getFilledString(featuredProjects?.heading) ??
      defaultFeaturedProjectsData.heading,
    projects: projectRows.reduce<ProjectCardProject[]>((items, row) => {
      const project =
        row && typeof row.project === 'object' ? row.project : null;
      const normalizedProject = project ? normalizeProject(project) : null;

      if (normalizedProject) {
        items.push(normalizedProject);
      }

      return items;
    }, []),
  };
}

export async function getFeaturedProjectsData(): Promise<FeaturedProjectsData> {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const home = await payload.findGlobal({
      depth: 2,
      slug: 'home',
    });

    return normalizeFeaturedProjectsData(home);
  } catch {
    return defaultFeaturedProjectsData;
  }
}
