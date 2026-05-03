import type { GlobalConfig } from 'payload';

import { pageHeroField } from '@/modules/payload/fields/pageHero';
import {
  validateText,
  validateTextarea,
} from '@/modules/payload/validations/text';

const completedProjectsField: GlobalConfig['fields'][number] = {
  name: 'completedProjects',
  type: 'group',
  admin: {
    description:
      'Controls the copy and optional action for the completed projects section. Cards are pulled from completed Projects collection entries.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'The heading displayed above completed project cards.',
      },
      validate: validateText({
        label: 'Completed projects heading',
        max: 80,
        min: 2,
      }),
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description:
          'Introductory copy displayed above completed project cards.',
        rows: 4,
      },
      validate: validateTextarea({
        label: 'Completed projects description',
        max: 360,
        min: 20,
      }),
    },
    {
      name: 'actionLabel',
      type: 'text',
      admin: {
        description:
          'Optional text for the archive link. The destination is fixed to /projects/completed.',
      },
      label: 'Action Label',
      validate: validateText({
        label: 'Completed projects action label',
        max: 40,
        min: 2,
      }),
    },
  ],
  label: 'Completed Projects',
};

export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
  label: 'Projects Page',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    description: 'Controls projects page content managed by Payload.',
    group: 'Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [pageHeroField],
        },
        {
          label: 'Completed Projects',
          fields: [completedProjectsField],
        },
      ],
    },
  ],
};
