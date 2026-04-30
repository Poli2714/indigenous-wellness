import type { TextFieldValidation } from 'payload';
import * as z from 'zod';

import { getFirstErrorMessage, isEmptyValue } from './utils';

type HrefValidatorOptions = {
  label?: string;
  required?: boolean;
};

export function validateHref({
  label = 'Link URL',
  required = false,
}: HrefValidatorOptions = {}): TextFieldValidation {
  return (value) => {
    if (isEmptyValue(value)) {
      return required ? `Enter ${label.toLowerCase()}.` : true;
    }

    if (typeof value !== 'string') {
      return `${label} must be text.`;
    }

    if (value.trim().length === 0) {
      return `${label} cannot be only spaces.`;
    }

    const schema = z
      .string({ error: `${label} must be text.` })
      .trim()
      .max(2048, {
        error: `${label} must be 2048 characters or fewer.`,
      })
      .refine(
        (href) => {
          if (
            href.startsWith('#') ||
            (href.startsWith('/') && !href.startsWith('//'))
          ) {
            return true;
          }

          try {
            const url = new URL(href);

            return ['http:', 'https:', 'mailto:', 'tel:'].includes(
              url.protocol,
            );
          } catch {
            return false;
          }
        },
        {
          error:
            'Use a relative path, anchor, or full http(s), mailto, or tel URL.',
        },
      );

    return getFirstErrorMessage(schema.safeParse(value));
  };
}
