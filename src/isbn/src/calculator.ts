import type { Calculable } from './types/calculable.js';
import type { CheckDigit10 } from './types/check_digit_10.js';
import type { CheckDigit13 } from './types/check_digit_13.js';
import type { SequentialConstructor } from './types/sequential.js';

function makeCalculator<TBase extends SequentialConstructor>(Base: TBase) {
  return class Calculator extends Base implements Calculable {
    calculate10(): CheckDigit10 {
      const divisor = 11;
      /** Remove prefix. */
      const isbn = this.integral.substring(3);
      const length = isbn.length;
      let index = length - 2;
      let sum = 0;
      do {
        sum += Number(isbn[index]) * (length - index);
        index -= 1;
      } while (index >= 0);
      const value = (divisor - (sum % divisor)) % divisor;
      return (value === 10 ? 'X' : value.toString()) as CheckDigit10;
    }

    calculate13(): CheckDigit13 {
      const divisor = 10;
      const isbn = this.integral;
      const weight = 3;
      let index = isbn.length - 2;
      let sum = 0;
      do {
        sum += weight * Number(isbn[index]) + Number(isbn[index -= 1]);
        index -= 1;
      } while (index > 0);
      return ((divisor - (sum % divisor)) % divisor).toString() as CheckDigit13;
    }

    // calculate13(): CheckDigit13 {
    //   return ((10 - this.integral
    //     .slice(0, -1)
    //     .split('')
    //     .reduce((sum, value, key) => {
    //       return sum + Number(value) * (key % 2 ? 3 : 1);
    //     }, 0) % 10) % 10).toString() as CheckDigit13;
    // }
  };
}

export {
  makeCalculator,
};
