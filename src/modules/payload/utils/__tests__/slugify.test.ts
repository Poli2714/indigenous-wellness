import { describe, expect, it } from 'vitest';

import { slugify } from '../slugify';

describe('slugify', () => {
  it('converts readable labels into URL-safe slugs', () => {
    expect(slugify('Community Health')).toBe('community-health');
    expect(slugify('  Research & Evaluation  ')).toBe(
      'research-and-evaluation',
    );
    expect(slugify('Wellness: Culture, Language, Land')).toBe(
      'wellness-culture-language-land',
    );
  });

  it('removes diacritics and collapses repeated separators', () => {
    expect(slugify('Métis-led / Inuit-led')).toBe('metis-led-inuit-led');
    expect(slugify('Food---Sovereignty')).toBe('food-sovereignty');
  });

  it('returns an empty string when no slug-safe characters remain', () => {
    expect(slugify('   ')).toBe('');
    expect(slugify('***')).toBe('');
  });
});
