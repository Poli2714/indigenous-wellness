import type { Field } from 'payload';

import { validateHref } from '@/modules/payload/validations/href';
import {
  validateText,
  validateTextarea,
} from '@/modules/payload/validations/text';

export const homeFeaturedProjectsField: Field = {
  name: 'featuredProjects',
  type: 'group',
  admin: {
    description:
      'Controls the copy and link for the home page featured projects section. Featured project cards are pulled from the Projects collection.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'The headline for the featured projects section.',
      },
      validate: validateText({
        label: 'Featured projects heading',
        max: 80,
        min: 2,
      }),
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Introductory copy displayed above the project cards.',
        rows: 4,
      },
      validate: validateTextarea({
        label: 'Featured projects description',
        max: 320,
        min: 20,
      }),
    },
    {
      name: 'projects',
      type: 'array',
      admin: {
        description:
          'Choose up to five projects for the home page. Drag rows to control display order.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'project',
          type: 'relationship',
          admin: {
            description: 'Project to display in this featured slot.',
          },
          relationTo: 'projects',
          required: true,
        },
      ],
      labels: {
        plural: 'Featured Projects',
        singular: 'Featured Project',
      },
      maxRows: 5,
    },
    {
      name: 'action',
      type: 'group',
      admin: {
        description: 'The link displayed below the featured projects copy.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              admin: {
                description: 'The text to display for this action.',
                width: '50%',
              },
              validate: validateText({
                label: 'Action label',
                max: 40,
              }),
            },
            {
              name: 'href',
              type: 'text',
              admin: {
                description:
                  'The URL or path this action links to. Use a relative path, anchor or full http(s).',
                width: '50%',
              },
              validate: validateHref({
                label: 'Action URL',
              }),
            },
          ],
        },
        {
          name: 'newTab',
          type: 'checkbox',
          admin: {
            description: 'Whether this link should open in a new browser tab.',
          },
          defaultValue: false,
          label: 'Open in a new tab',
        },
      ],
      label: 'Action',
    },
  ],
  label: 'Home Featured Projects Section',
};
