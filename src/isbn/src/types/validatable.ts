import type { Splittable } from './splittable.js';

interface Validatable extends Splittable {
  validate(): boolean;
}

export type {
  Validatable,
};
