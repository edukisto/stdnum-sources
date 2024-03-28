import type { CheckDigit10 } from './check_digit_10.js';
import type { CheckDigit13 } from './check_digit_13.js';

interface Calculable10 {
  calculate10(): CheckDigit10;
}

interface Calculable13 {
  calculate13(): CheckDigit13;
}

export type {
  Calculable10,
  Calculable13,
};
