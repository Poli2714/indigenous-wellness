export type HeaderLink = {
  href: string;
  label: string;
  newTab?: boolean | null;
};

export type HeaderData = {
  brand: {
    href: string;
    label: string;
  };
  contactLink: HeaderLink & {
    enabled: boolean;
  };
  navItems: HeaderLink[];
};

export const defaultHeaderData: HeaderData = {
  brand: {
    href: '/',
    label: 'Pewaseskwan home',
  },
  contactLink: {
    enabled: true,
    href: '/contact',
    label: 'Contact',
  },
  navItems: [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/about',
      label: 'About',
    },
    {
      href: '/projects',
      label: 'Projects',
    },
    {
      href: '/news',
      label: 'News',
    },
    {
      href: '/publications',
      label: 'Publications',
    },
    {
      href: '/gallery',
      label: 'Gallery',
    },
    {
      href: '/team',
      label: 'Team',
    },
    {
      href: '/career',
      label: 'Career',
    },
  ],
};
