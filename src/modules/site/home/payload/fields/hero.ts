import type { Field, TextFieldValidation } from 'payload';

import { defaultHomeHeroData } from '../../data/homeHeroDefaults';

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
        required: true,
      },
      {
        name: 'href',
        type: 'text',
        admin: {
          description:
            'The URL or path this action links to. Use a relative path, anchor or full http(s).',
          width: '50%',
        },
        required: true,
        validate: validateHref,
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
          defaultValue: defaultHomeHeroData.title,
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            description:
              'A smaller headline that appears below the main title.',
          },
          defaultValue: defaultHomeHeroData.subtitle,
          required: true,
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
      defaultValue: defaultHomeHeroData.description,
      required: true,
    },
    {
      name: 'primaryAction',
      type: 'group',
      admin: {
        description:
          'The main call-to-action for this hero. This should be the most important action you want users to take.',
      },
      defaultValue: defaultHomeHeroData.primaryAction,
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
      defaultValue: defaultHomeHeroData.secondaryAction,
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: defaultHomeHeroData.secondaryAction.enabled,
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
