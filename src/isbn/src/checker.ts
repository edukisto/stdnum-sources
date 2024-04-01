import type { CalculableConstructor } from './types/calculable.js';
import type { Checkable } from './types/checkable.js';

function makeChecker<TBase extends CalculableConstructor>(Base: TBase) {
  return class Checker extends Base implements Checkable {
    check(): boolean {
      const checkSum = this.length === 10
        ? this.calculate10()
        : this.calculate13();
      return this.integral.slice(-1) === checkSum;
    }
  };
}

export {
  makeChecker,
};
