import { describe, expect, it } from 'vitest';

import { validateHref } from '../href';

type TestValidate = (
  value: unknown,
  options: never,
) => Promise<string | true> | string | true;

function runValidate(validate: unknown, value: unknown) {
  return (validate as TestValidate)(value, {} as never);
}

describe('validateHref', () => {
  it('validates relative and approved absolute href values', () => {
    const validate = validateHref({
      label: 'Project URL',
      required: true,
    });

    expect(runValidate(validate, '/projects/example')).toBe(true);
    expect(runValidate(validate, '#section')).toBe(true);
    expect(runValidate(validate, 'https://example.com')).toBe(true);
    expect(runValidate(validate, 'mailto:test@example.com')).toBe(true);
    expect(runValidate(validate, '')).toBe('Enter project url.');
    expect(runValidate(validate, '   ')).toBe(
      'Project URL cannot be only spaces.',
    );
    expect(runValidate(validate, 12)).toBe('Project URL must be text.');
    expect(runValidate(validate, 'ftp://example.com')).toBe(
      'Use a relative path, anchor, or full http(s), mailto, or tel URL.',
    );
    expect(runValidate(validate, '//example.com')).toBe(
      'Use a relative path, anchor, or full http(s), mailto, or tel URL.',
    );
  });
});
