import type { NumberFieldValidation } from 'payload';
import * as z from 'zod';

import { getFirstErrorMessage, isEmptyValue } from './utils';

type NumberValidatorOptions = {
  integer?: boolean;
  label: string;
  max?: number;
  min?: number;
  required?: boolean;
};

export function validateNumber({
  integer = false,
  label,
  max,
  min,
  required = false,
}: NumberValidatorOptions): NumberFieldValidation {
  return (value) => {
    if (isEmptyValue(value)) {
      return required ? `Enter ${label.toLowerCase()}.` : true;
    }

    if (typeof value !== 'number' || Number.isNaN(value)) {
      return `${label} must be a number.`;
    }

    let schema = z.number({ error: `${label} must be a number.` });

    if (integer) {
      schema = schema.int({ error: `${label} must be a whole number.` });
    }

    if (min !== undefined) {
      schema = schema.min(min, { error: `${label} must be at least ${min}.` });
    }

    if (max !== undefined) {
      schema = schema.max(max, { error: `${label} must be ${max} or less.` });
    }

    return getFirstErrorMessage(schema.safeParse(value));
  };
}
