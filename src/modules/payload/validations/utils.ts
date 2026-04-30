import * as z from 'zod';

export function isEmptyValue(value: unknown) {
  return value === null || value === undefined || value === '';
}

export function formatCharacterCount(count: number) {
  return `${count} character${count === 1 ? '' : 's'}`;
}

export function getFirstErrorMessage(result: z.ZodSafeParseResult<unknown>) {
  return result.success
    ? true
    : result.error.issues[0]?.message || 'Invalid value.';
}
