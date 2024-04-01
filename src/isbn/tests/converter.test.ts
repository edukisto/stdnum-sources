import { describe, expect, test } from '@jest/globals';
import { ISBN } from '../src/isbn.js';

describe('handles 10-digit ISBNs', () => {
  test.each([
    /** From ISO 2108:1992. */
    ['0 571 08989 5', true],

    /** From ISO 2108:1992 (shown as 90-70002-34-5). */
    ['90-70-00234-5', true],
  ])('%s', (value, expected) => {
    expect(new ISBN(value).isConvertibleTo10()).toEqual(expected);
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

    // ['0000000000000', false],
    // ['9781060000001', false],
    // ['9790000000001', false],
  ])('%s', (value, expected) => {
    expect(new ISBN(value).isConvertibleTo10()).toEqual(expected);
  });
});
