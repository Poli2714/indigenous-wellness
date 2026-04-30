import type { GlobalAfterReadHook, GlobalConfig } from 'payload';

import { defaultHomeHeroData } from '../data/homeHeroDefaults';
import { homeHeroField } from './fields/hero';

const populateHomeDefaultsAfterRead: GlobalAfterReadHook = ({ doc }) => ({
  ...doc,
  hero: doc.hero ?? defaultHomeHeroData,
});

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
  hooks: {
    afterRead: [populateHomeDefaultsAfterRead],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [homeHeroField],
        },
      ],
    },
  ],
};
