import type { CollectionConfig } from 'payload';

import { validateText } from '../../modules/payload/validations/text';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      validate: validateText({
        label: 'Alt text',
        max: 160,
        min: 2,
        required: true,
      }),
    },
  ],
  upload: true,
};
