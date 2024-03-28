import type { Calculable10 } from './types/calculable.js';
import type { CheckDigit10 } from './types/check_digit_10.js';

class Calculator10 implements Calculable10 {
  calculate10(): CheckDigit10 {
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
}

export {
  Calculator10,
};
