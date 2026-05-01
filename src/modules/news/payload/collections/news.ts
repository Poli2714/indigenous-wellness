import type {
  CollectionBeforeValidateHook,
  CollectionConfig,
  TextFieldValidation,
} from 'payload';

import { slugify } from '@/modules/payload/utils/slugify';
import {
  validateText,
  validateTextarea,
} from '@/modules/payload/validations/text';

const validateNewsSlug: TextFieldValidation = (value, options) => {
  const textResult = validateText({
    label: 'News slug',
    max: 120,
    min: 2,
    required: true,
  })(value, options);

  if (textResult !== true) {
    return textResult;
  }

  if (typeof value !== 'string') {
    return 'News slug must be text.';
  }

  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
    ? true
    : 'News slug must use lowercase letters, numbers, and hyphens.';
};

const populateSlugBeforeValidate: CollectionBeforeValidateHook = ({ data }) => {
  if (!data || typeof data.title !== 'string') {
    return data;
  }

  return {
    ...data,
    slug: slugify(data.title),
  };
};

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['title', 'publishedAt', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'title',
  },
  hooks: {
    beforeValidate: [populateSlugBeforeValidate],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'The headline displayed on news listings and articles.',
      },
      required: true,
      validate: validateText({
        label: 'News title',
        max: 120,
        min: 2,
        required: true,
      }),
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description:
          'Short summary displayed on the home page and news listings.',
        rows: 4,
      },
      required: true,
      validate: validateTextarea({
        label: 'News description',
        max: 280,
        min: 20,
        required: true,
      }),
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Publication date used for sorting and display.',
      },
      defaultValue: () => new Date().toISOString(),
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      admin: {
        description: 'Optional tags displayed beside the publication date.',
      },
      hasMany: true,
      relationTo: 'news-tags',
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Generated from the title and used in news URLs.',
        position: 'sidebar',
        readOnly: true,
      },
      index: true,
      required: true,
      unique: true,
      validate: validateNewsSlug,
    },
  ],
  labels: {
    plural: 'News',
    singular: 'News Item',
  },
};
