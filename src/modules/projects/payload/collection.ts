import type {
  CollectionBeforeValidateHook,
  CollectionConfig,
  TextFieldValidation,
} from 'payload';

import { slugify } from '@/modules/payload/utils/slugify';
import { validateNumber } from '@/modules/payload/validations/number';
import {
  validateText,
  validateTextarea,
} from '@/modules/payload/validations/text';

const validateProjectSlug: TextFieldValidation = (value, options) => {
  const textResult = validateText({
    label: 'Project slug',
    max: 120,
    min: 2,
    required: true,
  })(value, options);

  if (textResult !== true) {
    return textResult;
  }

  if (typeof value !== 'string') {
    return 'Project slug must be text.';
  }

  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
    ? true
    : 'Project slug must use lowercase letters, numbers, and hyphens.';
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

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['title', 'status', 'slug', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Generated from the title and used in project URLs.',
        position: 'sidebar',
        readOnly: true,
      },
      index: true,
      required: true,
      unique: true,
      validate: validateProjectSlug,
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
      name: 'status',
      type: 'select',
      admin: {
        description:
          'Whether this project appears in the current projects list or completed projects carousel.',
        position: 'sidebar',
      },
      defaultValue: 'current',
      options: [
        {
          label: 'Current',
          value: 'current',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      required: true,
    },
    {
      name: 'completionYear',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData?.status === 'completed',
        description:
          'Optional year displayed on completed project cards. Leave empty when the completion year is not public.',
        position: 'sidebar',
      },
      label: 'Completion Year',
      validate: validateNumber({
        integer: true,
        label: 'Completion year',
        max: 2100,
        min: 1900,
      }),
    },
    {
      name: 'logo',
      type: 'upload',
      admin: {
        description:
          'Optional logo shown in current project listings. A default Pewaseskwan logo appears when empty.',
        position: 'sidebar',
        width: '50%',
      },
      label: 'Project Logo',
      relationTo: 'media',
    },
    {
      name: 'logoAlt',
      type: 'text',
      admin: {
        description:
          'Optional logo alt text override. Leave empty to use the media alt text.',
        position: 'sidebar',
        width: '50%',
      },
      label: 'Project Logo Alt Text',
      validate: validateText({
        label: 'Project logo alt text',
        max: 160,
        min: 2,
      }),
    },
    {
      name: 'image',
      type: 'upload',
      admin: {
        description:
          'Optional image shown on the project card. A neutral placeholder appears when empty.',
        position: 'sidebar',
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
        position: 'sidebar',
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
  labels: {
    plural: 'Projects',
    singular: 'Project',
  },
};
