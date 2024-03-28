import type { CheckDigit10 } from './types/check_digit_10.js';

function calculateCheckDigit10(isbn: string): CheckDigit10 {
  const divisor = 11;
  const length = isbn.length;
  let index = length - 2;
  let sum = 0;
  do {
    sum += Number(isbn[index]) * (length - index);
    index -= 1;
  } while (index >= 0);
  const value = (divisor - (sum % divisor)) % divisor;
  return ((value === 10) ? 'X' : value.toString()) as CheckDigit10;
}

export {
  calculateCheckDigit10,
};
