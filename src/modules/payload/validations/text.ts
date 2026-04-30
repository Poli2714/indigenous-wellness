import type { TextareaFieldValidation, TextFieldValidation } from 'payload';
import * as z from 'zod';

import {
  formatCharacterCount,
  getFirstErrorMessage,
  isEmptyValue,
} from './utils';

type TextValidatorOptions = {
  label: string;
  max: number;
  min?: number;
  required?: boolean;
};

export function validateText({
  label,
  max,
  min = 1,
  required = false,
}: TextValidatorOptions): TextFieldValidation {
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
      .min(min, {
        error: `${label} must be at least ${formatCharacterCount(min)}.`,
      })
      .max(max, {
        error: `${label} must be ${formatCharacterCount(max)} or fewer.`,
      });

    return getFirstErrorMessage(schema.safeParse(value));
  };
}

export function validateTextarea(
  options: TextValidatorOptions,
): TextareaFieldValidation {
  return validateText(options) as unknown as TextareaFieldValidation;
}
