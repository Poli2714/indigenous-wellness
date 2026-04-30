import configPromise from '@payload-config';
import { getPayload } from 'payload';

import type { Config, Media } from '@/payload-types';

import {
  defaultHomeHeroData,
  type HomeHeroData,
  type HomeHeroImage,
  type HomeHeroLink,
} from './homeHeroDefaults';

type HomeGlobal = Config['globals']['home'];
type PartialHomeHeroLink = Partial<{
  href: string | null;
  label: string | null;
  newTab: boolean | null;
}>;

function getFilledString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function normalizeLink(
  link: PartialHomeHeroLink | null | undefined,
  fallback: HomeHeroLink,
): HomeHeroLink {
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
): HomeHeroImage | null {
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

export function normalizeHomeHeroData(home: HomeGlobal | null): HomeHeroData {
  const hero = home?.hero;
  const images =
    hero?.images?.reduce<HomeHeroImage[]>((items, item) => {
      const image = normalizeMediaImage(item?.image, item?.alt);

      if (image) {
        items.push(image);
      }

      return items;
    }, []) ?? [];

  return {
    description:
      getFilledString(hero?.description) ?? defaultHomeHeroData.description,
    images,
    primaryAction: normalizeLink(
      hero?.primaryAction,
      defaultHomeHeroData.primaryAction,
    ),
    secondaryAction: {
      ...normalizeLink(
        hero?.secondaryAction,
        defaultHomeHeroData.secondaryAction,
      ),
      enabled:
        hero?.secondaryAction?.enabled ??
        defaultHomeHeroData.secondaryAction.enabled,
    },
    subtitle: getFilledString(hero?.subtitle) ?? defaultHomeHeroData.subtitle,
    title: getFilledString(hero?.title) ?? defaultHomeHeroData.title,
  };
}

export async function getHomeHeroData(): Promise<HomeHeroData> {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const home = await payload.findGlobal({
      depth: 1,
      slug: 'home',
    });

    return normalizeHomeHeroData(home);
  } catch {
    return defaultHomeHeroData;
  }
}
