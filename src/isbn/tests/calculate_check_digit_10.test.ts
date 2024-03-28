import { describe, expect, test } from '@jest/globals';
import { calculateCheckDigit10 } from '../src/calculate_check_digit_10.js';

describe('handles 10-digit ISBNs', () => {
  test.each([
    ['0000000000', '0'],
    ['0123456789', '9'],
    ['0306406152', '2'], // From Wikipedia.
    ['039304002X', 'X'], // From ISO 2108:2005.
    ['0571089895', '5'], // From ISO 2108:1992.
    ['123456789X', 'X'],
    ['9070002345', '5'], // From ISO 2108:1992.
    ['9876543210', '0'],
    ['9999999999', '9'],
  ])('%s', (value, expected) => {
    // const isbn = new ;
    expect(calculateCheckDigit10(value)).toEqual(expected);
  });
});
