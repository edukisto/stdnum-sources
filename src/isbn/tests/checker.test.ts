import { describe, expect, test } from '@jest/globals';
import { ISBN } from '../src/isbn.js';

describe('handles 10-digit ISBNs', () => {
  test.each([
    /** From ISO 2108:1992. */
    ['0 571 08989 5', true],
    ['90-70002-34-5', true],
  ])('%s', (value, expected) => {
    expect(new ISBN(value).check()).toEqual(expected);
  });
});

describe('handles 13-digit ISBNs', () => {
  test.each([
    /** From ISO 2108:2005. */
    ['9780110002224', true],
    ['9780393040029', true],
    ['9780777777770', true],
    ['9786000000004', true],
    ['9789070002343', true],
    ['9789528988885', true],

    ['0000000000000', true],
    ['9781060000001', true],
    ['9790000000001', true],
  ])('%s', (value, expected) => {
    expect(new ISBN(value).check()).toEqual(expected);
  });
});
