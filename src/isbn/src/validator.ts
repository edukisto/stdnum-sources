import type { ConvertibleConstructor } from './types/convertible.js';
import type { Separator10 } from './types/separator_10.js';
import type { Separator13 } from './types/separator_13.js';
import type { Validatable } from './types/validatable.js';

function makeValidator<TBase extends ConvertibleConstructor>(Base: TBase) {
  return class Validator extends Base implements Validatable {
    validate(separator: Separator10 | Separator13 = ''): boolean {
      try {
        const remake = this.length === 10
          ? this.convertTo10(separator)
          : this.convertTo13(separator);
        return remake === this.original;
      }
      catch (error) {
        return false;
      }
    }
  };
}

export {
  makeValidator,
};
