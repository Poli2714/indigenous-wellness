import type { Field } from 'payload';

import {
  validateText,
  validateTextarea,
} from '@/modules/payload/validations/text';

export const pageHeroField: Field = {
  name: 'hero',
  type: 'group',
  admin: {
    description: 'Controls the page hero copy.',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'The main heading displayed at the top of the page.',
      },
      validate: validateText({
        label: 'Page hero heading',
        max: 80,
        min: 2,
      }),
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Introductory copy displayed below the heading.',
        rows: 4,
      },
      validate: validateTextarea({
        label: 'Page hero description',
        max: 360,
        min: 20,
      }),
    },
  ],
  label: 'Page Hero',
};
