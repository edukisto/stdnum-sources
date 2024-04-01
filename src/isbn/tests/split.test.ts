import { describe, expect, test } from '@jest/globals';
import { ISBN } from '../src/isbn.js';

describe('handles 13-digit ISBNs', () => {
  test.each([
    /** From ISO 2108:2005 (shown as 978-90-70002-34-3). */
    ['9789070002343', ['978', '90', '70', '00234', '3']],

    /** From ISO 2108:2005. */
    ['9780110002224', ['978', '0', '11', '000222', '4']],
    ['9780393040029', ['978', '0', '393', '04002', '9']],
    ['9780777777770', ['978', '0', '7777', '7777', '0']],
    ['9786000000004', ['978', '600', '00', '0000', '4']],
    ['9789528988885', ['978', '952', '89', '8888', '5']],
  ])('%s', (value, expected) => {
    const [prefix, group, registrant, publication, checkDigit] = expected;
    const elements = { checkDigit, group, prefix, publication, registrant };
    expect(new ISBN(value).split()).toEqual(elements);
  });

  test('throws if no matching rule found', () => {
    expect(() => {
      new ISBN('0000000000000').split();
    }).toThrow();
  });

  test('throws if the registrant is not defined for use', () => {
    expect(() => {
      new ISBN('9781060000001').split();
    }).toThrow();
  });

  test('throws if the registration group is not defined for use', () => {
    expect(() => {
      new ISBN('9790000000001').split();
    }).toThrow();
  });

  // xtest('throws if no matching range found', () => {
  //   expect(() => {
  //     //
  //   }).toThrow();
  // });
});

describe('caches elements', () => {
  test.each([
    /** From ISO 2108:2005 (shown as 978-90-70002-34-3). */
    '9789070002343',
  ])('%s', (value) => {
    const isbn = new ISBN(value);
    const value1 = isbn.split();
    const value2 = isbn.split();
    expect(value1).toEqual(value2);
  });
});
