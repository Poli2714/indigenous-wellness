import configPromise from '@payload-config';
import { getPayload } from 'payload';

import type { Config } from '@/payload-types';

import {
  defaultHeaderData,
  type HeaderData,
  type HeaderLink,
} from './headerDefaults';

type HeaderGlobal = Config['globals']['header'];

function getFilledString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

function normalizeLink(
  link: Partial<HeaderLink> | null | undefined,
  fallback: HeaderLink,
): HeaderLink {
  const href = getFilledString(link?.href);
  const label = getFilledString(link?.label);

  return {
    href: href ?? fallback.href,
    label: label ?? fallback.label,
    newTab: link?.newTab ?? fallback.newTab,
  };
}

export function normalizeHeaderData(header: HeaderGlobal | null): HeaderData {
  const navItems = (header?.navItems ?? []).reduce<HeaderLink[]>(
    (items, item) => {
      const href = getFilledString(item?.href);
      const label = getFilledString(item?.label);

      if (href && label) {
        items.push({
          href,
          label,
          newTab: item.newTab,
        });
      }

      return items;
    },
    [],
  );

  return {
    brand: {
      href:
        getFilledString(header?.brand?.href) ?? defaultHeaderData.brand.href,
      label:
        getFilledString(header?.brand?.label) ?? defaultHeaderData.brand.label,
    },
    contactLink: {
      ...normalizeLink(header?.contactLink, defaultHeaderData.contactLink),
      enabled:
        header?.contactLink?.enabled ?? defaultHeaderData.contactLink.enabled,
    },
    navItems: navItems.length > 0 ? navItems : defaultHeaderData.navItems,
  };
}

export async function getHeaderData(): Promise<HeaderData> {
  try {
    const payload = await getPayload({
      config: configPromise,
    });

    const header = await payload.findGlobal({
      depth: 0,
      slug: 'header',
    });

    return normalizeHeaderData(header);
  } catch {
    return defaultHeaderData;
  }
}
