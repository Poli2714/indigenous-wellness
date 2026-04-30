export type HomeHeroLink = {
  href: string;
  label: string;
  newTab?: boolean | null;
};

export type HomeHeroImage = {
  alt: string;
  height?: number | null;
  url: string;
  width?: number | null;
};

export type HomeHeroData = {
  description: string;
  images: HomeHeroImage[];
  primaryAction: HomeHeroLink;
  secondaryAction: HomeHeroLink & {
    enabled: boolean;
  };
  subtitle: string;
  title: string;
};

export const defaultHomeHeroData: HomeHeroData = {
  description:
    'Pewaseskwan supports community-led Indigenous health and wellness research through respectful relationships, practical evidence, and shared action.',
  images: [],
  primaryAction: {
    href: '/projects',
    label: 'Projects',
  },
  secondaryAction: {
    enabled: true,
    href: '/contact',
    label: 'Contact',
  },
  subtitle: '(the Indigenous Wellness Research Group)',
  title: 'Pewaseskwan',
};
