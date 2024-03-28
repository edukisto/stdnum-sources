import type { CheckDigit10 } from './check_digit_10.js';

type CheckDigit13 = Exclude<CheckDigit10, 'X'>;

export type {
  CheckDigit13,
};
