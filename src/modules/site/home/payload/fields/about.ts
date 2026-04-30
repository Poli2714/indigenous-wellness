import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import type { Field } from 'payload';

import { validateHref } from '@/modules/payload/validations/href';
import { validateText } from '@/modules/payload/validations/text';

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

export const homeAboutField: Field = {
  name: 'about',
  type: 'group',
  admin: {
    description:
      'Controls the about section that appears below the home page hero.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'The headline for the about section.',
      },
      validate: validateText({
        label: 'About section heading',
        max: 80,
        min: 2,
      }),
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        description:
          'Main about copy. Use rich text for links and simple emphasis; keep headings out because the section already has a headline.',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'action',
      type: 'group',
      admin: {
        description: 'The link displayed below the about copy.',
      },
      fields: actionFields,
      label: 'Action',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          admin: {
            description:
              'Optional image displayed below the about copy. A neutral placeholder appears when empty.',
            width: '50%',
          },
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
          validate: validateText({
            label: 'About image alt text',
            max: 160,
            min: 2,
          }),
        },
      ],
    },
  ],
  label: 'Home About Section',
};
