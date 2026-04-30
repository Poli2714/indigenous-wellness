import * as z from 'zod';
import { describe, expect, it } from 'vitest';

import {
  formatCharacterCount,
  getFirstErrorMessage,
  isEmptyValue,
} from '../utils';

describe('validation utils', () => {
  it('detects values that Payload should treat as empty', () => {
    expect(isEmptyValue(null)).toBe(true);
    expect(isEmptyValue(undefined)).toBe(true);
    expect(isEmptyValue('')).toBe(true);
    expect(isEmptyValue(' ')).toBe(false);
    expect(isEmptyValue(0)).toBe(false);
  });

  it('formats singular and plural character counts', () => {
    expect(formatCharacterCount(1)).toBe('1 character');
    expect(formatCharacterCount(2)).toBe('2 characters');
  });

  it('returns true for valid Zod results and the first message for invalid results', () => {
    expect(getFirstErrorMessage(z.string().safeParse('valid'))).toBe(true);
    expect(
      getFirstErrorMessage(
        z
          .string()
          .min(2, { error: 'Too short.' })
          .max(4, { error: 'Too long.' })
          .safeParse('a'),
      ),
    ).toBe('Too short.');
  });
});
