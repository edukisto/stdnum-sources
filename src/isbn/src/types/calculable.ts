import type { CheckDigit10 } from './check_digit_10.js';
import type { CheckDigit13 } from './check_digit_13.js';
import type { Constructor } from './constructor.js';
import type { Sequential } from './sequential.js';

interface Calculable extends Sequential {
  calculate10(): CheckDigit10;
  calculate13(): CheckDigit13;
}

type CalculableConstructor = Constructor<Calculable>;

export type {
  Calculable,
  CalculableConstructor,
};
