import type { Constructor } from './constructor.js';
import type { Separator10 } from './separator_10.js';
import type { Separator13 } from './separator_13.js';
import type { Splittable } from './splittable.js';

interface Validatable extends Splittable {
  validate(separator: Separator10 | Separator13): boolean;
}

type ValidatableConstructor = Constructor<Validatable>;

export type {
  Validatable,
  ValidatableConstructor,
};
