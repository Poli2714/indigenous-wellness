import type { GlobalConfig, TextFieldValidation } from 'payload';

const defaultNavItems = [
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
];

const validateHref: TextFieldValidation = (value) => {
  const href = value?.trim();

  if (!href) {
    return 'Enter a link URL.';
  }

  if (href.startsWith('/') || href.startsWith('#')) {
    return true;
  }

  try {
    const url = new URL(href);

    if (['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) {
      return true;
    }
  } catch {
    return 'Use a relative path, anchor, or full http(s), mailto, or tel URL.';
  }

  return 'Use a relative path, anchor, or full http(s), mailto, or tel URL.';
};

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    description:
      'Controls the brand link, primary navigation and contact action in the site header.',
    group: 'Site',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      admin: {
        description:
          'Links are rendered left to right in the desktop primary navigation.',
        initCollapsed: true,
      },
      defaultValue: defaultNavItems,
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'The text to display for the navigation item.',
          },
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          admin: {
            description:
              'The URL or path the navigation item links to. Use a relative path, anchor or full http(s), mailto or tel URL.',
          },
          required: true,
          validate: validateHref,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          admin: {
            description: 'Whether the link should open in a new tab.',
          },
          defaultValue: false,
          label: 'Open in a new tab',
        },
      ],
      labels: {
        plural: 'Navigation Items',
        singular: 'Navigation Item',
      },
      maxRows: 12,
      minRows: 1,
      required: true,
    },
    {
      name: 'contactLink',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          admin: {
            description: 'Whether to show the contact link in the header.',
          },
          defaultValue: true,
          label: 'Show contact link',
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'The text to display for the contact link.',
          },
          defaultValue: 'Contact',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          admin: {
            description:
              'The URL or path the contact link points to. Use a relative path, anchor or full http(s), mailto or tel URL.',
          },
          defaultValue: '/contact',
          required: true,
          validate: validateHref,
        },
      ],
      label: 'Contact Link',
    },
  ],
};
