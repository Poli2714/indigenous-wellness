import configPromise from '@payload-config';
import { getPayload } from 'payload';

import type { Config } from '@/payload-types';

import {
  defaultFooterData,
  type FooterData,
  type FooterLink,
} from './footerDefaults';

type FooterGlobal = Config['globals']['footer'];

function getFilledString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function normalizeLink(
  link: Partial<FooterLink> | null | undefined,
): FooterLink | null {
  const href = getFilledString(link?.href);
  const label = getFilledString(link?.label);

  if (!href || !label) {
    return null;
  }

  return {
    href,
    label,
    newTab: link?.newTab,
  };
}

function normalizeLinks(
  links: Partial<FooterLink>[] | null | undefined,
  fallback: FooterLink[],
): FooterLink[] {
  const normalizedLinks =
    links?.reduce<FooterLink[]>((items, item) => {
      const link = normalizeLink(item);

      if (link) {
        items.push(link);
      }

      return items;
    }, []) ?? [];

  return normalizedLinks.length > 0 ? normalizedLinks : fallback;
}

export function normalizeFooterData(footer: FooterGlobal | null): FooterData {
  return {
    attribution:
      getFilledString(footer?.attribution) ?? defaultFooterData.attribution,
    landAcknowledgement: {
      body:
        getFilledString(footer?.landAcknowledgement?.body) ??
        defaultFooterData.landAcknowledgement.body,
      title:
        getFilledString(footer?.landAcknowledgement?.title) ??
        defaultFooterData.landAcknowledgement.title,
    },
    newsletter: {
      errorMessage:
        getFilledString(footer?.newsletter?.errorMessage) ??
        defaultFooterData.newsletter.errorMessage,
      label:
        getFilledString(footer?.newsletter?.label) ??
        defaultFooterData.newsletter.label,
      placeholder:
        getFilledString(footer?.newsletter?.placeholder) ??
        defaultFooterData.newsletter.placeholder,
      successMessage:
        getFilledString(footer?.newsletter?.successMessage) ??
        defaultFooterData.newsletter.successMessage,
    },
    primaryNavigation: {
      navItems: normalizeLinks(
        footer?.primaryNavigationItems,
        defaultFooterData.primaryNavigation.navItems,
      ),
      title:
        getFilledString(footer?.primaryNavigationTitle) ??
        defaultFooterData.primaryNavigation.title,
    },
    projectNavigation: {
      navItems: normalizeLinks(
        footer?.projectNavigationItems,
        defaultFooterData.projectNavigation.navItems,
      ),
      title:
        getFilledString(footer?.projectNavigationTitle) ??
        defaultFooterData.projectNavigation.title,
    },
    socialLinks: normalizeLinks(
      footer?.socialLinks,
      defaultFooterData.socialLinks,
    ),
  };
}

export async function getFooterData(): Promise<FooterData> {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const footer = await payload.findGlobal({
      depth: 0,
      slug: 'footer',
    });

    return normalizeFooterData(footer);
  } catch {
    return defaultFooterData;
  }
}
