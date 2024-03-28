import type { CheckDigit13 } from './types/check_digit_13.js';

function calculateCheckDigit13(isbn: string): CheckDigit13 {
  const divisor = 10;
  const weight = 3;
  let index = isbn.length - 2;
  let sum = 0;
  do {
    sum += weight * Number(isbn[index]) + Number(isbn[index -= 1]);
    index -= 1;
  } while (index > 0);
  return ((divisor - (sum % divisor)) % divisor).toString() as CheckDigit13;
}

// function CalculateCheckDigit13(isbn: string): CheckDigit13 {
//   return ((10 - isbn
//     .slice(0, -1)
//     .split('')
//     .reduce((sum, value, key) => {
//       return sum + Number(value) * (key % 2 ? 3 : 1);
//     }, 0) % 10) % 10).toString() as CheckDigit13;
// }

export {
  calculateCheckDigit13,
};
