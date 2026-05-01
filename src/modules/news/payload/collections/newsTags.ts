import type {
  CollectionBeforeValidateHook,
  CollectionConfig,
  TextFieldValidation,
} from 'payload';

import { slugify } from '@/modules/payload/utils/slugify';
import { validateText } from '@/modules/payload/validations/text';

export const newsTagBadgeColorClassNames = {
  amber:
    'bg-amber-200 text-amber-950 hover:bg-amber-200/80 dark:bg-amber-900 dark:text-amber-100 dark:hover:bg-amber-900/80',
  evergreen:
    'bg-emerald-200 text-emerald-950 hover:bg-emerald-200/80 dark:bg-emerald-900 dark:text-emerald-100 dark:hover:bg-emerald-900/80',
  rose: 'bg-rose-200 text-rose-950 hover:bg-rose-200/80 dark:bg-rose-900 dark:text-rose-100 dark:hover:bg-rose-900/80',
  sky: 'bg-sky-200 text-sky-950 hover:bg-sky-200/80 dark:bg-sky-900 dark:text-sky-100 dark:hover:bg-sky-900/80',
  paleSlate: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
} as const;

export type NewsTagBadgeColor = keyof typeof newsTagBadgeColorClassNames;

export function getNewsTagBadgeClassName(
  color: NewsTagBadgeColor | null | undefined,
) {
  return color ? newsTagBadgeColorClassNames[color] : undefined;
}

const validateTagSlug: TextFieldValidation = (value, options) => {
  const textResult = validateText({
    label: 'News tag slug',
    max: 80,
    min: 2,
    required: true,
  })(value, options);

  if (textResult !== true) {
    return textResult;
  }

  if (typeof value !== 'string') {
    return 'News tag slug must be text.';
  }

  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
    ? true
    : 'News tag slug must use lowercase letters, numbers, and hyphens.';
};

const populateSlugBeforeValidate: CollectionBeforeValidateHook = ({ data }) => {
  if (!data || typeof data.name !== 'string') {
    return data;
  }

  return {
    ...data,
    slug: slugify(data.name),
  };
};

export const NewsTags: CollectionConfig = {
  slug: 'news-tags',
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['name', 'slug', 'badgeColor', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'name',
  },
  hooks: {
    beforeValidate: [populateSlugBeforeValidate],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            description: 'The tag label displayed on news cards and articles.',
            width: '50%',
          },
          required: true,
          validate: validateText({
            label: 'News tag name',
            max: 60,
            min: 2,
            required: true,
          }),
        },
        {
          name: 'badgeColor',
          type: 'select',
          admin: {
            description:
              'Optional badge color. Leave blank to use the default badge color.',
            width: '50%',
          },
          label: 'Badge Color',
          options: [
            { label: 'Evergreen', value: 'evergreen' },
            { label: 'Sky', value: 'sky' },
            { label: 'Rose', value: 'rose' },
            { label: 'Amber', value: 'amber' },
            { label: 'Pale Slate', value: 'paleSlate' },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Generated from the tag name and used in news tag URLs.',
        readOnly: true,
        position: 'sidebar',
      },
      index: true,
      required: true,
      unique: true,
      validate: validateTagSlug,
    },
  ],
  labels: {
    plural: 'News Tags',
    singular: 'News Tag',
  },
};
