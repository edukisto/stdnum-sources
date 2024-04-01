import type { CheckableConstructor } from './types/checkable.js';
import type { Convertible } from './types/convertible.js';
import type { Separator10 } from './types/separator_10.js';
import type { Separator13 } from './types/separator_13.js';
import type { SplittableConstructor } from './types/splittable.js';

type T = CheckableConstructor & SplittableConstructor;

function makeConverter<TBase extends T>(Base: TBase) {
  return class Converter extends Base implements Convertible {
    convertTo10(separator: Separator10): string {
      const elements = this.split();
      return [
        elements.group,
        elements.registrant,
        elements.publication,
        this.calculate10(),
      ].join(separator);
    }

    convertTo13(separator: Separator13): string {
      const elements = this.split();
      return [
        elements.prefix,
        elements.group,
        elements.registrant,
        elements.publication,
        this.calculate13(),
      ].join(separator);
    }

    isConvertibleTo10(): boolean {
      const elements = this.split();
      return elements.prefix !== '979';
    }
  };
}

export {
  makeConverter,
};
