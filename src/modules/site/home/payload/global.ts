import type { GlobalConfig } from 'payload';

import { homeAboutField } from './fields/about';
import { homeFeaturedProjectsField } from './fields/featuredProjects';
import { homeHeroField } from './fields/hero';

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    description: 'Controls home page content managed by Payload.',
    group: 'Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [homeHeroField],
        },
        {
          label: 'About',
          fields: [homeAboutField],
        },
        {
          label: 'Featured Projects',
          fields: [homeFeaturedProjectsField],
        },
      ],
    },
  ],
};
