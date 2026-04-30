import { describe, expect, it } from 'vitest';

import { validateText } from '../text';

type TestValidate = (
  value: unknown,
  options: never,
) => Promise<string | true> | string | true;

function runValidate(validate: unknown, value: unknown) {
  return (validate as TestValidate)(value, {} as never);
}

describe('validateText', () => {
  it('allows optional text to be empty but rejects whitespace-only values', () => {
    const validate = validateText({
      label: 'Optional label',
      max: 20,
      min: 2,
    });

    expect(runValidate(validate, '')).toBe(true);
    expect(runValidate(validate, undefined)).toBe(true);
    expect(runValidate(validate, '   ')).toBe(
      'Optional label cannot be only spaces.',
    );
    expect(runValidate(validate, 12)).toBe('Optional label must be text.');
  });

  it('validates text length after trimming', () => {
    const validate = validateText({
      label: 'Project title',
      max: 10,
      min: 2,
      required: true,
    });

    expect(runValidate(validate, '')).toBe('Enter project title.');
    expect(runValidate(validate, ' A ')).toBe(
      'Project title must be at least 2 characters.',
    );
    expect(runValidate(validate, 'Valid')).toBe(true);
    expect(runValidate(validate, 'A very long title')).toBe(
      'Project title must be 10 characters or fewer.',
    );
  });
});
