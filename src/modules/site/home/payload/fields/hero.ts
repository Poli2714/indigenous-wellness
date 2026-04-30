import type { Field } from 'payload';

import { validateHref } from '@/modules/payload/validations/href';
import {
  validateText,
  validateTextarea,
} from '@/modules/payload/validations/text';

const actionFields: Field[] = [
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
];

export const homeHeroField: Field = {
  name: 'hero',
  type: 'group',
  admin: {
    description:
      'Controls the introductory headline, actions and image mosaic on the home page.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'The main headline text for the hero section.',
          },
          validate: validateText({
            label: 'Hero title',
            max: 80,
            min: 2,
          }),
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            description:
              'A smaller headline that appears below the main title.',
          },
          validate: validateText({
            label: 'Hero subtitle',
            max: 120,
            min: 2,
          }),
        },
      ],
    },

    {
      name: 'description',
      type: 'textarea',
      admin: {
        description:
          'Additional descriptive text that appears below the title and subtitle.',
        rows: 4,
      },
      validate: validateTextarea({
        label: 'Hero description',
        max: 320,
        min: 20,
      }),
    },
    {
      name: 'primaryAction',
      type: 'group',
      admin: {
        description:
          'The main call-to-action for this hero. This should be the most important action you want users to take.',
      },
      fields: actionFields,
      label: 'Primary Action',
    },
    {
      name: 'secondaryAction',
      type: 'group',
      admin: {
        description:
          'An optional secondary action. This can be used for a less prominent link, such as to a contact page or external resource.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show secondary action',
        },
        ...actionFields,
      ],
      label: 'Secondary Action',
    },
    {
      name: 'images',
      type: 'array',
      admin: {
        description:
          'Add up to five images. The layout uses them from left to right, then falls back to quiet placeholders for empty slots.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          admin: {
            description:
              'Optional alt text override. Leave empty to use the media alt text.',
          },
          validate: validateText({
            label: 'Hero image alt text',
            max: 160,
            min: 2,
          }),
        },
      ],
      labels: {
        plural: 'Hero Images',
        singular: 'Hero Image',
      },
      maxRows: 5,
    },
  ],
  label: 'Home Hero',
};
