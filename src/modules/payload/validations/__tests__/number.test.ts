import { describe, expect, it } from 'vitest';

import { validateNumber } from '../number';

type TestValidate = (
  value: unknown,
  options: never,
) => Promise<string | true> | string | true;

function runValidate(validate: unknown, value: unknown) {
  return (validate as TestValidate)(value, {} as never);
}

describe('validateNumber', () => {
  it('validates number bounds and integer values', () => {
    const validate = validateNumber({
      integer: true,
      label: 'Featured order',
      max: 5,
      min: 0,
    });

    expect(runValidate(validate, undefined)).toBe(true);
    expect(runValidate(validate, 2)).toBe(true);
    expect(runValidate(validate, '2')).toBe('Featured order must be a number.');
    expect(runValidate(validate, 2.5)).toBe(
      'Featured order must be a whole number.',
    );
    expect(runValidate(validate, -1)).toBe(
      'Featured order must be at least 0.',
    );
    expect(runValidate(validate, 6)).toBe('Featured order must be 5 or less.');
  });

  it('requires a number when configured as required', () => {
    const validate = validateNumber({
      label: 'Sort order',
      required: true,
    });

    expect(runValidate(validate, undefined)).toBe('Enter sort order.');
  });
});
