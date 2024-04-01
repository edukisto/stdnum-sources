import type { Constructor } from './constructor.js';
import type { Sequential } from './sequential.js';
import type { Splitted } from './splitted.js';

interface Splittable extends Sequential {
  split(): Splitted;
}

type SplittableConstructor = Constructor<Splittable>;

export type {
  Splittable,
  SplittableConstructor,
};
