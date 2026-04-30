import type { CollectionConfig } from 'payload';

import { validateHref } from '../../payload/validations/href';
import { validateText, validateTextarea } from '../../payload/validations/text';

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['title', 'href', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'The project name displayed on project cards.',
      },
      required: true,
      validate: validateText({
        label: 'Project title',
        max: 120,
        min: 2,
        required: true,
      }),
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      admin: {
        description:
          'Short summary displayed on project cards and featured project listings.',
        rows: 4,
      },
      label: 'Short Description',
      required: true,
      validate: validateTextarea({
        label: 'Short description',
        max: 280,
        min: 20,
        required: true,
      }),
    },
    {
      type: 'row',
      fields: [
        {
          name: 'href',
          type: 'text',
          admin: {
            description:
              'Where this project card links. Use an internal path for now, or an external URL when needed.',
            width: '70%',
          },
          label: 'Project URL',
          required: true,
          validate: validateHref({
            label: 'Project URL',
            required: true,
          }),
        },
        {
          name: 'newTab',
          type: 'checkbox',
          admin: {
            description:
              'Whether this project link opens in a new browser tab.',
            style: { alignSelf: 'center' },
            width: '30%',
          },
          defaultValue: false,
          label: 'Open in a new tab',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          admin: {
            description:
              'Optional image shown on the project card. A neutral placeholder appears when empty.',
            width: '50%',
          },
          label: 'Card Image',
          relationTo: 'media',
        },
        {
          name: 'imageAlt',
          type: 'text',
          admin: {
            description:
              'Optional alt text override. Leave empty to use the media alt text.',
            width: '50%',
          },
          label: 'Card Image Alt Text',
          validate: validateText({
            label: 'Card image alt text',
            max: 160,
            min: 2,
          }),
        },
      ],
    },
  ],
  labels: {
    plural: 'Projects',
    singular: 'Project',
  },
};
