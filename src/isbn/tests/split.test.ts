import { describe, expect, test, xtest } from '@jest/globals';
import { split } from '../src/split.js';

describe('handles 13-digit ISBNs', () => {
  test.each([
    /** From ISO 2108:2005 (shown as 978-90-70002-34-3). */
    // ['9789070002343', ['978', '90', '70002', '34', '3']],

    ['9789070002343', ['978', '90', '70', '00234', '3']],

    /** From ISO 2108:2005. */
    ['9780110002224', ['978', '0', '11', '000222', '4']],
    ['9780777777770', ['978', '0', '7777', '7777', '0']],
    ['9789528988885', ['978', '952', '89', '8888', '5']],
    ['9780393040029', ['978', '0', '393', '04002', '9']],

    // Это уже не даёт ошибку. Диапазон стал допустимым.
    // ['9786000000004', ['978', '0', '393', '04002', '9']],
  ])('%s', (value, expected) => {
    expect(split(value)).toEqual(expected);
  });

  test('throws if the registration group element is not defined for use', () => {
    expect(() => {
      split('9790000000001');
    }).toThrow();
  });

  test('throws if the registrant element is not defined for use', () => {
    expect(() => {
      split('9781060000001');
    }).toThrow();
  });

  test('throws if no matching rule found', () => {
    expect(() => {
      split('0000000000000');
    }).toThrow();
  });

  xtest('throws if no matching range found', () => {
    expect(() => {
      // ???????????????????????????????????????????????????????????????????????
    }).toThrow();
  });
});
