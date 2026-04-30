import configPromise from '@payload-config';
import { getPayload } from 'payload';

import type { Config, Media } from '@/payload-types';

import {
  defaultAboutSectionData,
  type AboutSectionData,
  type AboutSectionImage,
  type AboutSectionLink,
  type AboutSectionRichText,
  type AboutSectionRichTextNode,
} from './aboutSectionDefaults';

type HomeGlobal = Config['globals']['home'];
type PartialAboutSectionLink = Partial<{
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

function richTextNodeHasText(node: AboutSectionRichTextNode): boolean {
  if (getFilledString(node.text)) {
    return true;
  }

  return node.children?.some(richTextNodeHasText) ?? false;
}

function richTextHasText(value: unknown): value is AboutSectionRichText {
  if (!value || typeof value !== 'object' || !('root' in value)) {
    return false;
  }

  const root = value.root as { children?: AboutSectionRichTextNode[] };

  return root.children?.some(richTextNodeHasText) ?? false;
}

function normalizeLink(
  link: PartialAboutSectionLink | null | undefined,
  fallback: AboutSectionLink,
): AboutSectionLink {
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
): AboutSectionImage | null {
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

export function normalizeAboutSectionData(
  home: HomeGlobal | null,
): AboutSectionData {
  const about = home?.about;

  return {
    action: normalizeLink(about?.action, defaultAboutSectionData.action),
    body: richTextHasText(about?.body)
      ? about.body
      : defaultAboutSectionData.body,
    heading: getFilledString(about?.heading) ?? defaultAboutSectionData.heading,
    image: normalizeMediaImage(about?.image, about?.imageAlt),
  };
}

export async function getAboutSectionData(): Promise<AboutSectionData> {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const home = await payload.findGlobal({
      depth: 1,
      slug: 'home',
    });

    return normalizeAboutSectionData(home);
  } catch {
    return defaultAboutSectionData;
  }
}
